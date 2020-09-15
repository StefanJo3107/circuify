class Switch extends Element {
    constructor() {
        super(3, 2, 2, 2);
        this.inputs = [];
        this.outputs = [new Joint(false, jointType.OUTPUT)];
        this.name = "";
    }

    setName = (name) => {
        this.name = name;
    };

    getName = () => {
        return this.name;
    };

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
            fill(60, 191, 214);
        }
        rect(
            pos.x + 0.45 * cellSize,
            pos.y + 0.15 * cellSize,
            1.1 * cellSize,
            1.7 * cellSize
        );
        fill(255);
        rect(
            pos.x + 0.65 * cellSize,
            pos.y + 0.35 * cellSize,
            0.7 * cellSize,
            1.3 * cellSize
        );
        if (this.outputs[0].getState() == false) {
            fill(0);
            rect(
                pos.x + 0.65 * cellSize,
                pos.y + 1.4 * cellSize,
                0.7 * cellSize,
                0.25 * cellSize
            );
            noFill();
            ellipse(
                pos.x + cellSize,
                pos.y + 0.65 * cellSize,
                0.25 * cellSize,
                0.25 * cellSize
            );
            line(
                pos.x + cellSize,
                pos.y + cellSize,
                pos.x + cellSize,
                pos.y + 1.25 * cellSize
            );
        } else {
            fill(0);
            rect(
                pos.x + 0.65 * cellSize,
                pos.y + 0.35 * cellSize,
                0.7 * cellSize,
                0.25 * cellSize
            );
            noFill();
            ellipse(
                pos.x + cellSize,
                pos.y + 0.85 * cellSize,
                0.25 * cellSize,
                0.25 * cellSize
            );
            line(
                pos.x + cellSize,
                pos.y + 1.25 * cellSize,
                pos.x + cellSize,
                pos.y + 1.5 * cellSize
            );
        }
        this.setColor();
    };

    invertOutput = () => {
        this.outputs[0].setState(!this.outputs[0].getState());
    };

    calculateOutput = () => {
        this.outputs[0].setState(this.outputs[0].getState());
    };
}
