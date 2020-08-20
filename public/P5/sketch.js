let cellSize = 15;

let grid;

function setup() {
    let holder = document.getElementById("canvasHolder");
    let canvas = createCanvas(holder.offsetWidth, windowHeight - 50, P2D);
    canvas.parent("canvasHolder");

    grid = new Grid(cellSize, 220);

    background(248);
    grid.show();
}

function draw() {
    background(248);
    grid.show();

    if (mouseInsideBounds()) {
        let v = grid.snapToGrid(createVector(mouseX, mouseY));
        fill(0, 255, 0);
        rect(v.x, v.y, cellSize * 2, cellSize * 3);
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
