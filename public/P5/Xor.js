class Xor extends Element {
    constructor() {
        super(4, 2, 2, 2);
        this.inputs = [
            new Joint(null, jointType.INPUT),
            new Joint(null, jointType.INPUT),
        ];
        this.outputs = [new Joint(null, jointType.OUTPUT)];
    }

    show = (pos, cellSize) => {
        this.setColor();

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
            this.state
        );

        this.inputs[1].show(
            createVector(pos.x, pos.y + (3 * cellSize) / 2),
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
        noFill();
        beginShape();
        vertex(pos.x + 0.8 * cellSize, pos.y);

        quadraticVertex(
            pos.x + cellSize * 1.2,
            pos.y + cellSize,
            pos.x + 0.8 * cellSize,
            pos.y + 2 * cellSize
        );
        endShape();

        this.setColor();
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
    };

    calculateOutput = () => {
        if (
            this.inputs[0].getState() == null ||
            this.inputs[1].getState() == null
        ) {
            this.outputs[0].setState(null);
        } else {
            this.outputs[0].setState(
                this.inputs[0].getState() != this.inputs[1].getState()
            );
        }
    };
}
