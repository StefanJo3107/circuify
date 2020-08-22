class Or extends Element {
    constructor() {
        super(4, 2, 2, 2);
        this.inputs = [
            new Joint(false, jointType.INPUT),
            new Joint(false, jointType.INPUT),
        ];
        this.output = new Joint(false, jointType.OUTPUT);
    }

    show(pos, cellSize, placed) {
        super.setColor(placed);

        line(
            pos.x,
            pos.y + cellSize / 2,
            pos.x + 1.2 * cellSize,
            pos.y + cellSize / 2
        );
        line(
            pos.x,
            pos.y + (3 * cellSize) / 2,
            pos.x + 1.2 * cellSize,
            pos.y + (3 * cellSize) / 2
        );

        line(
            pos.x + 3 * cellSize,
            pos.y + cellSize,
            pos.x + 4 * cellSize,
            pos.y + cellSize
        );

        this.inputs[0].show(
            createVector(pos.x, pos.y + cellSize / 2),
            cellSize / 2,
            cellSize,
            placed
        );

        this.inputs[1].show(
            createVector(pos.x, pos.y + (3 * cellSize) / 2),
            cellSize / 2,
            cellSize,
            placed
        );

        this.output.show(
            createVector(pos.x + 4 * cellSize, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            placed
        );

        beginShape();
        vertex(pos.x + cellSize, pos.y);

        quadraticVertex(
            pos.x + cellSize * 1.5,
            pos.y + cellSize,
            pos.x + cellSize,
            pos.y + 2 * cellSize
        );
        quadraticVertex(
            pos.x + 2.5 * cellSize,
            pos.y + 2 * cellSize,
            pos.x + 3 * cellSize,
            pos.y + cellSize
        );
        quadraticVertex(pos.x + 2.5 * cellSize, pos.y, pos.x + cellSize, pos.y);
        endShape();
    }

    calculateOutput() {
        this.output.state = this.inputs[0].state || this.inputs[1].state;
    }
}
