let cellSize = 22;
let grid;

let jointID = 0;

let sineFactor = 0;

let selectedOption;

let placingElement = null;
let placingName = "";
let placingType = "";

let circuits = [];
let currentCircuitIndex = 0;

let selectedInput = null;
let selectedOutput = null;

let dragStartPos = null;
let dragEndPos = null;
let initialDragPos = null;
let drag = null;

let selectionRectStart = null;
let selectionRectEnd = null;
let selectionInProgress = false;

let letterFont;

selected = {
    name: sessionStorage.getItem("selectedOption"),
    type: sessionStorage.getItem("selectedType"),
};

let holder;
let tabs;

function setup() {
    holder = document.getElementById("canvasHolder");
    tabs = document.getElementsByClassName("nav-tabs")[0];

    let canvas = createCanvas(
        holder.offsetWidth,
        windowHeight - 50 - tabs.offsetHeight,
        P2D
    );
    canvas.parent("canvasHolder");

    sessionStorage.setItem("selectedOption", "SELECT");
    sessionStorage.setItem("selectedType", "TOOL");

    grid = new Grid(220);
    letterFont = loadFont("../BAHNSCHRIFT.TTF");
}

function draw() {
    RefreshCanvas();
}

function RefreshCanvas() {
    if (height != windowHeight - 50 - tabs.offsetHeight) {
        resizeCanvas(holder.offsetWidth, windowHeight - 50 - tabs.offsetHeight);
    }

    getCircuits();

    background(235);
    grid.show();

    getPlacingElement();
    placeElement();

    circuits[currentCircuitIndex].showCircuit();

    //drawing selection rect
    if (selectionInProgress && selectionRectEnd != null) {
        fill(60, 191, 214, 100);
        stroke(60, 191, 214);
        if (
            selectionRectStart.y < selectionRectEnd.y &&
            selectionRectStart.x < selectionRectEnd.x
        ) {
            rect(
                selectionRectStart.x,
                selectionRectStart.y,
                abs(selectionRectEnd.x - selectionRectStart.x),
                abs(selectionRectEnd.y - selectionRectStart.y)
            );
        } else if (
            selectionRectStart.y > selectionRectEnd.y &&
            selectionRectStart.x > selectionRectEnd.x
        ) {
            rect(
                selectionRectEnd.x,
                selectionRectEnd.y,
                abs(selectionRectEnd.x - selectionRectStart.x),
                abs(selectionRectEnd.y - selectionRectStart.y)
            );
        } else if (
            selectionRectStart.y > selectionRectEnd.y &&
            selectionRectStart.x < selectionRectEnd.x
        ) {
            rect(
                selectionRectStart.x,
                selectionRectEnd.y,
                abs(selectionRectEnd.x - selectionRectStart.x),
                abs(selectionRectEnd.y - selectionRectStart.y)
            );
        } else {
            rect(
                selectionRectEnd.x,
                selectionRectStart.y,
                abs(selectionRectEnd.x - selectionRectStart.x),
                abs(selectionRectEnd.y - selectionRectStart.y)
            );
        }
    }

    //selection cursor
    if (drag == null && !selectionInProgress) {
        let mouseOverElement = false;
        for (
            let i = 0;
            i < circuits[currentCircuitIndex].elements.length;
            i++
        ) {
            if (
                circuits[currentCircuitIndex].elements[i].mouseInsideElement(
                    grid.snapToGrid(createVector(mouseX, mouseY))
                )
            ) {
                mouseOverElement = true;
            }
        }

        if (mouseOverElement) {
            cursor(HAND);
        } else {
            cursor(ARROW);
        }
    }

    sineFactor += 0.1;
}

function getCircuits() {
    let circuitsStr = sessionStorage.getItem("circuits");
    let circuitNames = circuitsStr.split(",");

    let circuitsToRemove = [];
    let includedNames = [];

    for (let i = 0; i < circuits.length; i++) {
        if (!circuitNames.includes(circuits[i].name)) {
            circuitsToRemove.push(circuits[i]);
        } else {
            includedNames.push(circuits[i].name);
        }
    }

    _.remove(circuits, (c) => {
        return _.includes(circuitsToRemove, c);
    });

    _.remove(circuitNames, (c) => {
        return _.includes(includedNames, c);
    });

    for (let i = 0; i < circuitNames.length; i++) {
        circuits.push(new Circuit(circuitNames[i]));
    }

    let currentCircuit = sessionStorage.getItem("currentCircuit");

    for (let i = 0; i < circuits.length; i++) {
        if (circuits[i].name === currentCircuit) {
            currentCircuitIndex = i;
            break;
        }
    }
}

function inputIsUsed(input) {
    for (let i = 0; i < circuits[currentCircuitIndex].usedInputs.length; i++) {
        if (_.isEqual(input, circuits[currentCircuitIndex].usedInputs[i]))
            return true;
    }
    return false;
}

function getPlacingElement() {
    selectedOption = {
        name: sessionStorage.getItem("selectedOption"),
        type: sessionStorage.getItem("selectedType"),
    };
    if (selectedOption.name != null && selectedOption.type != null) {
        selectedOption.name = selectedOption.name.replace(/\s+/g, "");
        selectedOption.name = selectedOption.name.replace(/\W+/g, "");

        if (
            selectedOption.type != "TOOL" &&
            selectedOption.type != "CIRCUIT" &&
            placingName != selectedOption.name.toTitleCase()
        ) {
            placingElement = eval(
                "new " + selectedOption.name.toTitleCase() + "()"
            );
            placingName = selectedOption.name.toTitleCase();
            placingType = selectedOption.type;

            selectedInput = null;
            selectedOutput = null;
        } else if (selectedOption.type == "TOOL" && placingName != "") {
            placingElement = null;
            placingName = "";
            placingType = "";

            selectedInput = null;
            selectedOutput = null;
        } else if (
            selectedOption.type == "CIRCUIT" &&
            placingName != selectedOption.name.toTitleCase()
        ) {
            let circuit = null;
            for (let i = 0; i < circuits.length; i++) {
                if (
                    circuits[i].name ===
                    sessionStorage.getItem("selectedOption")
                ) {
                    circuit = circuits[i];
                    break;
                }
            }
            if (circuit != null) {
                placingElement = new IntegratedCircuit();
                placingElement.addCircuit(circuit);
                placingName = selectedOption.name.toTitleCase();
                placingType = selectedOption.type;

                selectedInput = null;
                selectedOutput = null;
            }
        }
    }
}
function clone(instance) {
    return Object.assign(
        Object.create(
            // Set the prototype of the new object to the prototype of the instance.
            // Used to allow new object behave like class instance.
            Object.getPrototypeOf(instance)
        ),
        // Prevent shallow copies of nested structures like arrays, etc
        JSON.parse(JSON.stringify(instance))
    );
}
function placeElement() {
    if (placingElement != null && mouseInsideCanvas()) {
        placingElement.show(
            grid.snapToGrid(createVector(mouseX, mouseY)),
            cellSize
        );
    }

    if (mouseIsPressed && mouseButton === LEFT) {
        if (placingElement != null && mouseInsideCanvas()) {
            let pos = grid.snapToGrid(createVector(mouseX, mouseY));
            placingElement.setPosition(pos, grid.posToCell(pos));
            let clone = Object.assign(
                Object.create(Object.getPrototypeOf(placingElement)),
                placingElement
            );
            clone.setElementState(elementState.Placed);
            circuits[currentCircuitIndex].addElement(clone);
            placingElement = null;
            sessionStorage.setItem("selectedOption", "SELECT");
            sessionStorage.setItem("selectedType", "TOOL");
        }
    }
}

function mouseInsideCanvas() {
    return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function windowResized() {
    resizeCanvas(holder.offsetWidth, windowHeight - 50 - tabs.offsetHeight);
}

//_____________Input_________________

function keyPressed() {
    if (keyCode == ESCAPE) {
        selectedInput = null;
        selectedOutput = null;
    }

    if (keyCode == DELETE) {
        circuits[currentCircuitIndex].deleteSelectedElements();
    }
}

function mousePressed() {
    if (mouseButton === LEFT && selectedOption.name == "SELECT") {
        let unselectOthers = true;
        let selectedIndex = -1;
        //starting in reverse because of drawing order of elements
        for (
            let i = circuits[currentCircuitIndex].elements.length - 1;
            i >= 0;
            i--
        ) {
            circuits[currentCircuitIndex].elements[i].updateJoints();
            let previousState = circuits[currentCircuitIndex].elements[
                i
            ].getState();
            let selected = circuits[currentCircuitIndex].elements[
                i
            ].checkSelection(grid.snapToGrid(createVector(mouseX, mouseY)));

            //selected inside rect selection
            if (selected && previousState == elementState.Selected) {
                unselectOthers = false;
            }

            //selected element is button so it is pressed
            if (
                selected &&
                circuits[currentCircuitIndex].elements[i].constructor.name ===
                    "Button"
            ) {
                circuits[currentCircuitIndex].elements[i].press();
            }

            if (
                selected &&
                circuits[currentCircuitIndex].elements[i].constructor.name ===
                    "Switch"
            ) {
                circuits[currentCircuitIndex].elements[i].invertOutput();
            }

            //element is selected and breaking from loop
            if (selected) {
                dragStartPos = grid.snapToGrid(createVector(mouseX, mouseY));
                selectedIndex = i;
                break;
            }
        }

        //unselecting elements that previously selected
        if (unselectOthers) {
            for (
                let i = 0;
                i < circuits[currentCircuitIndex].elements.length;
                i++
            ) {
                if (i != selectedIndex) {
                    circuits[currentCircuitIndex].elements[i].unselect();
                }
            }
        }

        //starting the drag
        if (dragStartPos == null) {
            selectionRectStart = createVector(mouseX, mouseY);
            selectionRectEnd = null;
            selectionInProgress = true;
        }
    }
}

function mouseDragged() {
    if (mouseButton === LEFT && selectedOption.name == "SELECT") {
        if (dragStartPos != null) {
            cursor("grab");

            dragEndPos = grid.snapToGrid(createVector(mouseX, mouseY));

            if (initialDragPos == null) initialDragPos = dragEndPos;

            let currentDrag = createVector(
                dragEndPos.x >= dragStartPos.x
                    ? dragEndPos.x - dragStartPos.x
                    : -dragEndPos.x + dragStartPos.x,
                dragEndPos.y >= dragStartPos.y
                    ? dragEndPos.y - dragStartPos.y
                    : -dragEndPos.y + dragStartPos.y
            );

            let totalDrag = createVector(0, 0);

            if (drag != null) {
                if (dragEndPos.x > initialDragPos.x)
                    totalDrag.x = abs(drag.x - currentDrag.x);
                else totalDrag.x = -abs(drag.x - currentDrag.x);

                if (dragEndPos.y > initialDragPos.y)
                    totalDrag.y = abs(drag.y - currentDrag.y);
                else totalDrag.y = -abs(drag.y - currentDrag.y);
            }

            for (
                let i = 0;
                i < circuits[currentCircuitIndex].elements.length;
                i++
            ) {
                if (
                    circuits[currentCircuitIndex].elements[i].getState() ==
                    elementState.Selected
                ) {
                    circuits[currentCircuitIndex].elements[i].setPosition(
                        createVector(
                            circuits[currentCircuitIndex].elements[
                                i
                            ].getPosition().x + totalDrag.x,
                            circuits[currentCircuitIndex].elements[
                                i
                            ].getPosition().y + totalDrag.y
                        ),
                        grid.posToCell(
                            createVector(
                                circuits[currentCircuitIndex].elements[
                                    i
                                ].getPosition().x + totalDrag.x,
                                circuits[currentCircuitIndex].elements[
                                    i
                                ].getPosition().y + totalDrag.y
                            )
                        )
                    );
                }
            }

            initialDragPos.x += totalDrag.x;
            initialDragPos.y += totalDrag.y;
            drag = currentDrag;
        } else {
            drag = null;
            dragEndPos = null;
        }

        if (selectionInProgress) {
            selectionRectEnd = createVector(mouseX, mouseY);
        }
    }
}

function mouseReleased() {
    if (selectionRectEnd != null && selectionRectStart != null) {
        for (
            let i = 0;
            i < circuits[currentCircuitIndex].elements.length;
            i++
        ) {
            circuits[currentCircuitIndex].elements[i].updateJoints();
            circuits[currentCircuitIndex].elements[i].checkSelectionInsideRect(
                selectionRectStart,
                selectionRectEnd
            );
        }

        selectionRectStart = null;
        selectionRectEnd = null;
    }

    for (let i = 0; i < circuits[currentCircuitIndex].elements.length; i++) {
        if (
            circuits[currentCircuitIndex].elements[i].constructor.name ==
            "Button"
        ) {
            circuits[currentCircuitIndex].elements[i].release();
        }
    }

    dragStartPos = null;
    dragEndPos = null;
    drag = null;
    selectionInProgress = false;
    initialDragPos = null;

    cursor(ARROW);
}

function mouseWheel(event) {
    if (mouseInsideCanvas()) {
        let delta = event.delta;
        if (delta > 0) {
            delta = -1;
        } else if (delta < 0) {
            delta = 1;
        }

        cellSize += delta;
        cellSize = constrain(cellSize, 10, 40);
    }
}

//__________________________________________

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
