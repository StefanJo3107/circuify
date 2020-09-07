class Jkflipflop extends Element {
    constructor() {
        super(5, 6, 3, 4);
        this.inputs = [
            new Joint(null, jointType.INPUT),
            new Joint(null, jointType.INPUT),
            new Joint(null, jointType.INPUT),
            new Joint(null, jointType.INPUT),
            new Joint(null, jointType.INPUT),
        ];
        this.outputs = [
            new Joint(null, jointType.OUTPUT),
            new Joint(null, jointType.OUTPUT),
        ];

        this.inversed = false;
    }

    show = (pos, cellSize) => {
        this.setColor();

        this.position = pos;

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
            pos.x + cellSize,
            pos.y + 4 * cellSize,
            pos.x,
            pos.y + 4 * cellSize
        );
        line(
            pos.x + 2.5 * cellSize,
            pos.y,
            pos.x + 2.5 * cellSize,
            pos.y + cellSize
        );
        line(
            pos.x + 2.5 * cellSize,
            pos.y + 5 * cellSize,
            pos.x + 2.5 * cellSize,
            pos.y + 6 * cellSize
        );

        line(
            pos.x + 4 * cellSize,
            pos.y + 2 * cellSize,
            pos.x + 5 * cellSize,
            pos.y + 2 * cellSize
        );
        line(
            pos.x + 4 * cellSize,
            pos.y + 4 * cellSize,
            pos.x + 5 * cellSize,
            pos.y + 4 * cellSize
        );

        this.inputs[0].show(
            createVector(pos.x, pos.y + 2 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );
        this.inputs[1].show(
            createVector(pos.x, pos.y + 3 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );
        this.inputs[2].show(
            createVector(pos.x, pos.y + 4 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );
        this.inputs[3].show(
            createVector(pos.x + 2.5 * cellSize, pos.y),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.inputs[4].show(
            createVector(pos.x + 2.5 * cellSize, pos.y + 6 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.outputs[0].show(
            createVector(pos.x + 5 * cellSize, pos.y + 2 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.outputs[1].show(
            createVector(pos.x + 5 * cellSize, pos.y + 4 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.setColor();

        rect(pos.x + cellSize, pos.y + cellSize, 3 * cellSize, 4 * cellSize);

        textSize(cellSize * 0.7);
        strokeWeight(0.5);
        fill(0);
        textFont(letterFont);
        text("J", pos.x + 1.1 * cellSize, pos.y + 2.2 * cellSize);
        textSize(cellSize * 1.2);
        text(">", pos.x + 0.98 * cellSize, pos.y + 3.4 * cellSize);
        textSize(cellSize * 0.7);
        text("K", pos.x + 1.1 * cellSize, pos.y + 4.2 * cellSize);
        text("Q", pos.x + 3.3 * cellSize, pos.y + 2.2 * cellSize);
        text("Q'", pos.x + 3.3 * cellSize, pos.y + 4.2 * cellSize);
        textSize(cellSize * 0.5);
        text("PRE'", pos.x + 1.95 * cellSize, pos.y + 1.6 * cellSize);
        text("CLR'", pos.x + 1.95 * cellSize, pos.y + 4.8 * cellSize);

        this.setColor();
    };

    calculateOutput = () => {
        if (!this.checkPresetAndClear()) {
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
                    if (
                        this.outputs[0].getState() == null ||
                        this.outputs[1].getState() == null
                    ) {
                        this.outputs[0].setState(null);
                        this.outputs[1].setState(null);
                    } else if (
                        this.outputs[0].getState() == false &&
                        this.outputs[1].getState() == false
                    ) {
                        this.outputs[0].setState(true);
                        this.outputs[1].setState(false);
                    } else if (this.inversed == false) {
                        this.outputs[0].setState(!this.outputs[0].getState());
                        this.outputs[1].setState(!this.outputs[0].getState());
                        this.inversed = true;
                    }
                }
            } else if (this.inputs[1].getState() == null) {
                this.outputs[0].setState(null);
                this.outputs[1].setState(null);
            } else {
                this.inversed = false;
            }
        }
    };

    checkPresetAndClear = () => {
        if (
            (this.inputs[3].getState() == null &&
                this.inputs[4].getState() == null) ||
            (this.inputs[3].getState() == true &&
                this.inputs[4].getState() == null) ||
            (this.inputs[3].getState() == null &&
                this.inputs[4].getState() == true)
        ) {
            this.outputs[0].setState(null);
            this.outputs[1].setState(null);
            this.inversed = true;
            return true;
        } else if (
            this.inputs[3].getState() == false &&
            this.inputs[4].getState() == null
        ) {
            this.outputs[0].setState(true);
            this.outputs[1].setState(null);
            this.inversed = true;
            return true;
        } else if (
            this.inputs[3].getState() == null &&
            this.inputs[4].getState() == false
        ) {
            this.outputs[0].setState(null);
            this.outputs[1].setState(true);
            this.inversed = true;
            return true;
        } else if (
            this.inputs[3].getState() == false &&
            this.inputs[4].getState() == false
        ) {
            this.outputs[0].setState(true);
            this.outputs[1].setState(true);
            this.inversed = true;
            return true;
        } else if (
            this.inputs[3].getState() == true &&
            this.inputs[4].getState() == false
        ) {
            this.outputs[0].setState(false);
            this.outputs[1].setState(true);
            this.inversed = true;
            return true;
        } else if (
            this.inputs[3].getState() == false &&
            this.inputs[4].getState() == true
        ) {
            this.outputs[0].setState(true);
            this.outputs[1].setState(false);
            this.inversed = true;
            return true;
        }

        return false;
    };
}
