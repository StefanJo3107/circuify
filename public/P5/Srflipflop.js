class Srflipflop extends Element {
    constructor() {
        super(5, 4, 3, 4);
        this.inputs = [
            new Joint(null, jointType.INPUT),
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

        line(pos.x + cellSize, pos.y + cellSize, pos.x, pos.y + cellSize);
        line(
            pos.x + cellSize,
            pos.y + 2 * cellSize,
            pos.x,
            pos.y + 2 * cellSize
        );
        line(
            pos.x + cellSize,
            pos.y + 3 * cellSize,
            pos.x,
            pos.y + 3 * cellSize
        );

        line(
            pos.x + 4 * cellSize,
            pos.y + cellSize,
            pos.x + 5 * cellSize,
            pos.y + cellSize
        );
        line(
            pos.x + 4 * cellSize,
            pos.y + 3 * cellSize,
            pos.x + 5 * cellSize,
            pos.y + 3 * cellSize
        );

        this.inputs[0].show(
            createVector(pos.x, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );
        this.inputs[1].show(
            createVector(pos.x, pos.y + 2 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );
        this.inputs[2].show(
            createVector(pos.x, pos.y + 3 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.outputs[0].show(
            createVector(pos.x + 5 * cellSize, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.outputs[1].show(
            createVector(pos.x + 5 * cellSize, pos.y + 3 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.setColor();

        let hex = "";

        for (let i = 0; i < this.inputs.length; i++) {
            hex += this.inputs[i].getState() ? "1" : "0";
        }
        hex = parseInt(hex, 2).toString(16).toUpperCase();

        rect(pos.x + cellSize, pos.y, 3 * cellSize, 4 * cellSize);

        textSize(cellSize * 0.7);
        strokeWeight(0.5);
        fill(0);
        text("S", pos.x + 1.2 * cellSize, pos.y + 1.2 * cellSize);
        textSize(cellSize);
        text(">", pos.x + 0.95 * cellSize, pos.y + 2.4 * cellSize);
        textSize(cellSize * 0.7);
        text("R", pos.x + 1.2 * cellSize, pos.y + 3.2 * cellSize);
        text("Q", pos.x + 3.2 * cellSize, pos.y + 1.2 * cellSize);
        text("Q'", pos.x + 3.2 * cellSize, pos.y + 3.2 * cellSize);

        /*fill(0);
        if (_.includes(["A", "B", "C", "D", "E", "F"], hex))
            text(hex, pos.x + 1.18 * cellSize, pos.y + 2.35 * cellSize);
        else text(hex, pos.x + 1.35 * cellSize, pos.y + 2.35 * cellSize);*/
        this.setColor();
    };

    calculateOutput = () => {
        if (this.inputs[1].getState() == true) {
            if (
                this.inputs[0].getState() == null ||
                this.inputs[2].getState() == null
            ) {
                this.outputs[0].setState(null);
                this.outputs[1].setState(null);
            } else if (
                this.inputs[0].getState() == true &&
                this.inputs[2].getState() == false
            ) {
                this.outputs[0].setState(true);
                this.outputs[1].setState(false);
            } else if (
                this.inputs[0].getState() == false &&
                this.inputs[2].getState() == true
            ) {
                this.outputs[0].setState(false);
                this.outputs[1].setState(true);
            } else if (
                this.inputs[0].getState() == true &&
                this.inputs[2].getState() == true
            ) {
                this.outputs[0].setState(null);
                this.outputs[1].setState(null);
            }
        } else if (this.inputs[1].getState() == null) {
            this.outputs[0].setState(null);
            this.outputs[1].setState(null);
        }
    };
}
