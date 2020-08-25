class Buffer extends Element {
    constructor() {
        super(4, 2, 2, 2);
        this.inputs = [new Joint(false, jointType.INPUT)];
        this.outputs = [new Joint(false, jointType.OUTPUT)];
    }

    show(pos, cellSize, placed) {
        super.setColor(placed);

        line(pos.x, pos.y + cellSize, pos.x + 1.2 * cellSize, pos.y + cellSize);

        line(
            pos.x + 3 * cellSize,
            pos.y + cellSize,
            pos.x + 4 * cellSize,
            pos.y + cellSize
        );

        this.inputs[0].show(
            createVector(pos.x, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            placed
        );

        this.outputs[0].show(
            createVector(pos.x + 4 * cellSize, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            placed
        );

        super.setColor(placed);

        beginShape();
        vertex(pos.x + cellSize, pos.y);
        vertex(pos.x + 3 * cellSize, pos.y + cellSize);
        vertex(pos.x + cellSize, pos.y + 2 * cellSize);
        endShape(CLOSE);
    }

    calculateOutput() {
        this.outputs[0].setState(this.inputs[0].state);
    }
}
