let cellSize = 22;
let grid;

let minZoom = 10;
let maxZoom = 40;

let jointID = 0;

let sineFactor = 0;

let paused = false;

let selectedOption;

let placingElement = null;
let placingName = "";
let placingType = "";

let circuits = [];
let currentCircuitIndex = 0;

let canSelect = true;
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

let modal;
let modalName;
let modalInput;
let modalCloseButton;
let modalIsShown = false;

function setup() {
    holder = document.getElementById("canvasHolder");
    tabs = document.getElementsByClassName("nav-tabs")[0];

    let canvas = createCanvas(
        holder.offsetWidth,
        windowHeight - 50 - tabs.offsetHeight,
        P2D
    );
    canvas.parent("canvasHolder");
    getModal();

    sessionStorage.setItem("selectedOption", "SELECT");
    sessionStorage.setItem("selectedType", "TOOL");
    sessionStorage.setItem("NavCommand", "");

    grid = new Grid(220);
    letterFont = loadFont("./BAHNSCHRIFT.TTF");
}

function getModal() {
    modal = document.getElementsByClassName("modal-dialog")[0];
    modalName = document.getElementsByClassName("modal-title")[0];
    modalInput = modal.getElementsByClassName("form-control")[0];
    modalCloseButton = modal.getElementsByClassName("close")[0];
    modalCloseButton.onclick = () => {
        hideModal();
    };

    modal.onmouseover = () => {
        dragStartPos = null;
        dragEndPos = null;
        initialDragPos = null;
        drag = null;
        selectionInProgress = false;
        selectionRectStart = null;
        selectionRectEnd = null;
        canSelect = false;
    };
    modal.onmouseout = () => {
        dragStartPos = null;
        dragEndPos = null;
        initialDragPos = null;
        drag = null;
        selectionInProgress = false;
        selectionRectStart = null;
        selectionRectEnd = null;
        canSelect = true;
    };
}

function hideModal() {
    modal.style.display = "none";
    modalIsShown = false;
}

function showModal() {
    modal.style.display = "block";
    modalIsShown = true;
}

function draw() {
    RefreshCanvas();
}

function RefreshCanvas() {
    if (height != windowHeight - 50 - tabs.offsetHeight) {
        resizeCanvas(holder.offsetWidth, windowHeight - 50 - tabs.offsetHeight);
    }

    handleNavCommands();

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

function handleNavCommands() {
    switch (sessionStorage.getItem("NavCommand")) {
        case "New":
            circuits = [];
            circuits.push(new Circuit("Main"));

            cellSize = 22;
            jointID = 0;
            sineFactor = 0;
            paused = false;
            canSelect = true;
            selectedInput = null;
            selectedOutput = null;
            drag = null;
            dragStartPos = null;
            dragEndPos = null;
            initialDragPos = null;
            selectionRectStart = null;
            selectionRectEnd = null;
            selectionInProgress = false;

            sessionStorage.setItem("NavCommand", "");
            break;
        case "Zoom In":
            cellSize += 1;
            cellSize = constrain(cellSize, minZoom, maxZoom);
            sessionStorage.setItem("NavCommand", "");
            break;
        case "Zoom Out":
            cellSize -= 1;
            cellSize = constrain(cellSize, minZoom, maxZoom);
            sessionStorage.setItem("NavCommand", "");
            break;
        case "Delete Selection":
            circuits[currentCircuitIndex].deleteSelectedElements();
            sessionStorage.setItem("NavCommand", "");
            break;
        case "Select All":
            for (
                let i = 0;
                i < circuits[currentCircuitIndex].elements.length;
                i++
            ) {
                circuits[currentCircuitIndex].elements[i].setElementState(
                    elementState.Selected
                );
            }
            sessionStorage.setItem("NavCommand", "");
            break;
        case "Select None":
            unselectAllElements();
            sessionStorage.setItem("NavCommand", "");
            break;
        case "Run Simulation":
            paused = false;
            break;
        case "Pause Simulation":
            paused = true;
            break;
    }
}

function unselectAllElements() {
    for (let i = 0; i < circuits[currentCircuitIndex].elements.length; i++) {
        if (
            circuits[currentCircuitIndex].elements[i].getState() ===
            elementState.Selected
        )
            circuits[currentCircuitIndex].elements[i].setElementState(
                elementState.Placed
            );
    }
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

    let index = currentCircuitIndex;
    for (let i = 0; i < circuits.length; i++) {
        if (circuits[i].name === currentCircuit) {
            index = i;
            break;
        }
    }

    if (index != currentCircuitIndex) {
        currentCircuitIndex = index;
        unselectAllElements();
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
    if (!canSelect) {
        return;
    }

    if (
        mouseButton === LEFT &&
        selectedOption.name.toLowerCase() == "select" &&
        mouseInsideCanvas()
    ) {
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
    } else if (
        mouseButton === LEFT &&
        selectedOption.name.toLowerCase() == "removewire"
    ) {
        for (
            let i = circuits[currentCircuitIndex].elements.length - 1;
            i >= 0;
            i--
        ) {
            circuits[currentCircuitIndex].elements[i].updateJointsRemoval();
        }
    }
}

function mouseDragged() {
    if (!canSelect) {
        return;
    }

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
    if (!canSelect) {
        return;
    }

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
        cellSize = constrain(cellSize, minZoom, maxZoom);
    }
}

//__________________________________________

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
