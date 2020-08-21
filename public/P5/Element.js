class Element {
    constructor(cellWidth, cellHeight, elementWidth, elementHeight) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.elementWidth = elementWidth;
        this.elementHeight = elementHeight;
    }

    setColor(placed) {
        if (placed) {
            strokeWeight(2);
            stroke(0);
            fill(255);
        } else {
            strokeWeight(2);
            stroke(40, 200, 40);
            fill(0, 255, 0);
        }
    }

    show(pos, cellSize, placed) {}

    calculateOutput() {}

    showPlaced(cellSize) {
        this.show(this.position, cellSize, true);
    }

    setPosition(pos) {
        this.position = pos;
    }
}
