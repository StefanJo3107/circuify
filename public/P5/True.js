class True extends Element {
    constructor() {
        super(3, 2, 2, 2);
        this.inputs = [];
        this.outputs = [new Joint(true, jointType.OUTPUT)];
    }

    show(pos, cellSize, placed) {
        super.setColor(placed);
        line(
            pos.x + 2 * cellSize,
            pos.y + cellSize,
            pos.x + 3 * cellSize,
            pos.y + cellSize
        );

        this.outputs[0].show(
            createVector(pos.x + 3 * cellSize, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            placed
        );

        super.setColor(placed);

        rect(pos.x, pos.y, 2 * cellSize, 2 * cellSize);
        textSize(cellSize * 1.8);
        fill(0);
        text("1", pos.x + 0.5 * cellSize, pos.y + 1.65 * cellSize);
        super.setColor(placed);
    }

    calculateOutput() {
        this.outputs[0].setState(true);
    }
}