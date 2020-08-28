class Not extends Element {
    constructor() {
        super(4, 2, 2, 2);
        this.inputs = [new Joint(false, jointType.INPUT)];
        this.outputs = [new Joint(false, jointType.OUTPUT)];
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
            this.state == elementState.Placed
        );

        this.outputs[0].show(
            createVector(pos.x + 4 * cellSize, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            this.state == elementState.Placed
        );

        this.setColor();

        beginShape();
        vertex(pos.x + cellSize, pos.y);
        vertex(pos.x + 3 * cellSize, pos.y + cellSize);
        vertex(pos.x + cellSize, pos.y + 2 * cellSize);
        endShape(CLOSE);

        ellipse(
            pos.x + 3 * cellSize + cellSize / 6,
            pos.y + cellSize,
            cellSize / 3,
            cellSize / 3
        );
    };

    calculateOutput = () => {
        this.outputs[0].setState(!this.inputs[0].state);
    };
}
