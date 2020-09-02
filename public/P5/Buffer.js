class Buffer extends Element {
    constructor() {
        super(4, 2, 2, 2);
        this.inputs = [new Joint(null, jointType.INPUT)];
        this.outputs = [new Joint(null, jointType.OUTPUT)];
    }

    show = (pos, cellSize) => {
        this.setColor();

        this.position = pos;

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
            this.state
        );

        this.outputs[0].show(
            createVector(pos.x + 4 * cellSize, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.setColor();

        beginShape();
        vertex(pos.x + cellSize, pos.y);
        vertex(pos.x + 3 * cellSize, pos.y + cellSize);
        vertex(pos.x + cellSize, pos.y + 2 * cellSize);
        endShape(CLOSE);
    };

    calculateOutput = () => {
        if (this.inputs[0].getState() == null) {
            this.outputs[0].setState(null);
        } else {
            this.outputs[0].setState(this.inputs[0].getState());
        }
    };
}
