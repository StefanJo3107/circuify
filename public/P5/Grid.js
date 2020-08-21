class Grid {
    constructor(strokeColor) {
        this.strokeColor = strokeColor;
    }

    show() {
        stroke(this.strokeColor);
        for (let i = 0; i < width; i += cellSize) {
            line(i, 0, i, height);
        }

        for (let i = 0; i < height; i += cellSize) {
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
