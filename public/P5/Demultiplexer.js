class Demux extends Element {
    constructor() {
        super(4, 5, 2, 5);
        this.inputs = [
            new Joint(null, jointType.INPUT),
            new Joint(null, jointType.INPUT),
        ];
        this.outputs = [
            new Joint(null, jointType.OUTPUT),
            new Joint(null, jointType.OUTPUT),
        ];
    }

    show = (pos, cellSize) => {
        this.setColor();

        this.position = pos;

        line(
            pos.x,
            pos.y + 2 * cellSize,
            pos.x + cellSize,
            pos.y + 2 * cellSize
        );
        line(
            pos.x + 3 * cellSize,
            pos.y + cellSize,
            pos.x + 4 * cellSize,
            pos.y + cellSize
        );
        line(
            pos.x + 3 * cellSize,
            pos.y + 3 * cellSize,
            pos.x + 4 * cellSize,
            pos.y + 3 * cellSize
        );
        line(
            pos.x + 2 * cellSize,
            pos.y + cellSize / 2,
            pos.x + 2 * cellSize,
            pos.y - cellSize / 2
        );

        this.inputs[0].show(
            createVector(pos.x, pos.y + 2 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );
        this.inputs[1].show(
            createVector(pos.x + 2 * cellSize, pos.y - cellSize / 2),
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
        this.outputs[1].show(
            createVector(pos.x + 4 * cellSize, pos.y + 3 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.setColor();

        beginShape();
        vertex(pos.x + cellSize, pos.y + cellSize);
        vertex(pos.x + 3 * cellSize, pos.y);
        vertex(pos.x + 3 * cellSize, pos.y + 4 * cellSize);
        vertex(pos.x + cellSize, pos.y + 3 * cellSize);
        endShape(CLOSE);

        textSize(cellSize * 0.7);
        strokeWeight(0.75);
        fill(0);
        //textFont("letterFont");
        textFont("Helvetica");
        text("0", pos.x + 2.4 * cellSize, pos.y + 1.2 * cellSize);
        text("1", pos.x + 2.4 * cellSize, pos.y + 3.2 * cellSize);
    };

    calculateOutput = () => {
        if (
            this.inputs[0].getState() === null ||
            this.inputs[1].getState() === null
        ) {
            this.outputs[0].setState(null);
            this.outputs[1].setState(null);
        } else {
            if (this.inputs[1].getState() === false) {
                this.outputs[0].setState(this.inputs[0].getState());
                this.outputs[1].setState(false);
            } else if (this.inputs[1].getState() === true) {
                this.outputs[1].setState(this.inputs[0].getState());
                this.outputs[0].setState(false);
            }
        }
    };
}
