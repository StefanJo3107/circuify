class Grid {
    constructor(cellSize, strokeColor) {
        this.cellSize = cellSize;
        this.strokeColor = strokeColor;
    }

    show() {
        stroke(this.strokeColor);
        for (let i = 0; i < width; i += this.cellSize) {
            line(i, 0, i, height);
        }

        for (let i = 0; i < height; i += this.cellSize) {
            line(0, i, width, i);
        }
    }

    snapToGrid(pos) {
        return createVector(
            floor(pos.x / cellSize) * cellSize,
            floor(pos.y / cellSize) * cellSize
        );
    }
}
