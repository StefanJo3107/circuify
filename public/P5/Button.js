class Button extends Element {
    constructor() {
        super(3, 2, 2, 2);
        this.inputs = [];
        this.outputs = [new Joint(false, jointType.OUTPUT)];
    }

    show = (pos, cellSize) => {
        this.setColor();

        this.position = pos;

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
            this.state
        );

        this.setColor();

        rect(pos.x, pos.y, 2 * cellSize, 2 * cellSize);
        stroke(0);
        if (this.outputs[0].getState() == false) {
            fill(255);
        } else {
            fill(47, 126, 204);
        }
        ellipse(
            pos.x + cellSize,
            pos.y + cellSize,
            cellSize * 1.6,
            cellSize * 1.6
        );
        if (this.outputs[0].getState() == false) {
            fill(255);
        } else {
            fill(60, 191, 214);
        }
        ellipse(
            pos.x + cellSize,
            pos.y + cellSize,
            cellSize * 1.2,
            cellSize * 1.2
        );
        this.setColor();
    };

    press = () => {
        this.outputs[0].setState(true);
    };

    release = () => {
        this.outputs[0].setState(false);
    };

    calculateOutput = () => {
        this.outputs[0].setState(this.outputs[0].getState());
    };
}
