let cellSize = 18;
let grid;

let placingElement = null;

let elements;

function setup() {
    let holder = document.getElementById("canvasHolder");
    let canvas = createCanvas(holder.offsetWidth, windowHeight - 50, P2D);
    canvas.parent("canvasHolder");

    grid = new Grid(220);
    elements = [];
    placingElement = new And();
}

function draw() {
    RefreshCanvas();
}

function RefreshCanvas() {
    background(248);
    grid.show();

    if (placingElement != null) {
        placingElement.show(
            grid.snapToGrid(createVector(mouseX, mouseY)),
            cellSize,
            false
        );
    }

    if (elements != null) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].showPlaced(cellSize);
        }
    }
}

function mousePressed() {
    if (placingElement != null) {
        placingElement.setPosition(
            grid.snapToGrid(createVector(mouseX, mouseY))
        );
        elements.push(placingElement);
        placingElement = null;
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
