class Clock extends Element {
    constructor() {
        super(3, 2, 2, 2);
        this.inputs = [];
        this.outputs = [new Joint(true, jointType.OUTPUT)];
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
        if (this.state == elementState.Placing) {
            fill(255);
        } else if (this.outputs[0].getState() === true) {
            fill(60, 191, 214);
        } else {
            fill(255);
        }
        ellipse(
            pos.x + cellSize,
            pos.y + 1.1 * cellSize,
            1.2 * cellSize,
            1.2 * cellSize
        );
        if (this.state == elementState.Placing) fill("#a7e9af");
        else if (this.state != elementState.Selected) fill(0);
        else fill(60, 191, 214);
        rect(
            pos.x + cellSize - cellSize * 0.075,
            pos.y + 1.1 * cellSize - (1.2 / 2) * cellSize - 0.2 * cellSize,
            cellSize * 0.15,
            cellSize * 0.2
        );
        ellipse(
            pos.x + cellSize,
            pos.y + 1.1 * cellSize,
            0.15 * cellSize,
            0.15 * cellSize
        );
        strokeWeight(1);
        line(
            pos.x + cellSize,
            pos.y + 1.3 * cellSize,
            pos.x + cellSize,
            pos.y + 0.6 * cellSize
        );
        translate(
            pos.x + cellSize + (1.2 / 2) * cellSize * cos(-PI / 3),
            pos.y + 1.1 * cellSize + (1.2 / 2) * cellSize * sin(-PI / 3)
        );
        rotate(-PI / 4);
        rect(0, 0, cellSize / 8, cellSize / 8);
        rect(cellSize / 7, -cellSize / 15, cellSize / 8, cellSize / 4);
        resetMatrix();
        this.setColor();
    };

    invertOutput = () => {};

    calculateOutput = () => {
        if (this.interval === undefined) {
            this.interval = setInterval(
                () => this.outputs[0].setState(!this.outputs[0].getState()),
                500
            );
        }
    };
}
