let cellSize = 15;

function setup() {
    let holder = document.getElementById("canvasHolder");
    let canvas = createCanvas(holder.offsetWidth, windowHeight - 50, P2D);
    canvas.parent("canvasHolder");

    background(248);
    DrawGrid();
}

function draw() {}

function windowResized() {
    let holder = document.getElementById("canvasHolder");
    resizeCanvas(holder.offsetWidth, windowHeight - 50);

    background(248);
    DrawGrid();
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
