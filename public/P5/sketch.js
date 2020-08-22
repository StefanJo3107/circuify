let cellSize = 18;
let grid;

let placingElement = null;
let placingName = "";
let placingType = "";
let slider;
let elements;

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

    if (placingElement != null && mouseInsideBounds()) {
        placingElement.show(
            grid.snapToGrid(createVector(mouseX, mouseY)),
            cellSize,
            false
        );
    }

    if (elements != null) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].refreshPosition();
            elements[i].showPlaced(cellSize);
        }
    }
}

function getPlacingElement() {
    selected = {
        name: sessionStorage.getItem("selectedOption"),
        type: sessionStorage.getItem("selectedType"),
    };
    if (selected.name != null && selected.type != null) {
        if (selected.type != "TOOL") {
            placingElement = eval("new " + selected.name.toTitleCase() + "()");
            placingName = selected.name;
            placingType = selected.type;
        } else if (selected.type == "TOOL") {
            placingElement = null;
            placingName = "";
            placingType = "";
        }
    }
}

function placeElement() {
    if (mouseIsPressed && mouseButton === LEFT) {
        if (placingElement != null && mouseInsideBounds()) {
            let pos = grid.snapToGrid(createVector(mouseX, mouseY));
            placingElement.setPosition(pos, grid.posToCell(pos));
            let clone = Object.assign(
                Object.create(Object.getPrototypeOf(placingElement)),
                placingElement
            );
            elements.push(clone);
            placingElement = null;
        }
    }
}

function mouseInsideBounds() {
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
    let delta = event.delta;
    if (delta > 0) {
        delta = -1;
    } else if (delta < 0) {
        delta = 1;
    }

    cellSize += delta;
    cellSize = constrain(cellSize, 10, 30);
}

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
