let cellSize = 18;
let grid;

let sineFactor = 0;

let placingElement = null;
let placingName = "";
let placingType = "";
let slider;
let elements;

let selectedInput = null;
let selectedOutput = null;

let connections = [];
let usedInputs = [];

selected = {
    name: sessionStorage.getItem("selectedOption"),
    type: sessionStorage.getItem("selectedType"),
};

function setup() {
    let holder = document.getElementById("canvasHolder");
    let canvas = createCanvas(holder.offsetWidth, windowHeight - 50, P2D);
    canvas.parent("canvasHolder");

    sessionStorage.setItem("selectedOption", "SELECT");
    sessionStorage.setItem("selectedType", "TOOL");

    grid = new Grid(220);
    elements = [];
}

function draw() {
    RefreshCanvas();
}

function RefreshCanvas() {
    background(235);
    grid.show();

    getPlacingElement();
    placeElement();

    if (placingElement != null && mouseInsideCanvas()) {
        placingElement.show(
            grid.snapToGrid(createVector(mouseX, mouseY)),
            cellSize,
            false
        );
    }

    showConnectionInProgress();

    if (connections != null) {
        for (let connection of connections) {
            connection.show();
            connection.updateValues();
        }
    }

    if (elements != null) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].refreshPosition();
            elements[i].showPlaced(cellSize);
            elements[i].calculateOutput();
        }
    }

    sineFactor += 0.1;
}

function mousePressed() {
    if (mouseButton === LEFT) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].updateJoints();
        }
    }
}

function showConnectionInProgress() {
    if (selectedInput != null && selectedOutput == null) {
        stroke(0);
        strokeWeight(4);
        noFill();
        bezier(
            selectedInput.position.x,
            selectedInput.position.y,
            selectedInput.position.x - 3 * cellSize,
            selectedInput.position.y,
            mouseX + 3 * cellSize,
            mouseY,
            mouseX,
            mouseY
        );
    } else if (selectedInput == null && selectedOutput != null) {
        stroke(0);
        strokeWeight(4);
        noFill();
        bezier(
            selectedOutput.position.x,
            selectedOutput.position.y,
            selectedOutput.position.x + 3 * cellSize,
            selectedOutput.position.y,
            mouseX - 3 * cellSize,
            mouseY,
            mouseX,
            mouseY
        );
    } else if (selectedInput != null && selectedOutput != null) {
        connections.push(new Connection(selectedInput, selectedOutput));
        usedInputs.push(selectedInput);
        selectedInput = null;
        selectedOutput = null;
    }
}

function inputIsUsed(input) {
    for (let i = 0; i < usedInputs.length; i++) {
        if (_.isEqual(input, usedInputs[i])) return true;
    }
    return false;
}

function getPlacingElement() {
    selected = {
        name: sessionStorage.getItem("selectedOption"),
        type: sessionStorage.getItem("selectedType"),
    };
    if (selected.name != null && selected.type != null) {
        if (selected.type != "TOOL" && placingName != selected.name) {
            placingElement = eval("new " + selected.name.toTitleCase() + "()");
            placingName = selected.name;
            placingType = selected.type;

            selectedInput = null;
            selectedOutput = null;
        } else if (selected.type == "TOOL" && placingName != "") {
            placingElement = null;
            placingName = "";
            placingType = "";

            selectedInput = null;
            selectedOutput = null;
        }
    }
}

function placeElement() {
    if (mouseIsPressed && mouseButton === LEFT) {
        if (placingElement != null && mouseInsideCanvas()) {
            let pos = grid.snapToGrid(createVector(mouseX, mouseY));
            placingElement.setPosition(pos, grid.posToCell(pos));
            let clone = Object.assign(
                Object.create(Object.getPrototypeOf(placingElement)),
                placingElement
            );
            elements.push(clone);
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
    let holder = document.getElementById("canvasHolder");
    resizeCanvas(holder.offsetWidth, windowHeight - 50);

    background(248);
    grid.show();
}

function DrawGrid() {
    stroke(220);
    for (let i = 0; i < width; i += cellSize) {
        line(i, 0, i, height);
    }

    for (let i = 0; i < height; i += cellSize) {
        line(0, i, width, i);
    }
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
        cellSize = constrain(cellSize, 10, 30);
    }
}

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

function keyPressed() {
    if (keyCode == ESCAPE) {
        selectedInput = null;
        selectedOutput = null;
    }
}
