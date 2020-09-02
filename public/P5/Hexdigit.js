class Hexdigit extends Element {
    constructor() {
        super(3, 3, 2, 3);
        this.inputs = [
            new Joint(false, jointType.INPUT),
            new Joint(false, jointType.INPUT),
            new Joint(false, jointType.INPUT),
            new Joint(false, jointType.INPUT),
        ];
        this.outputs = [];
    }

    show = (pos, cellSize) => {
        this.setColor();

        this.position = pos;

        line(pos.x + cellSize, pos.y, pos.x, pos.y);
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

        this.inputs[0].show(
            createVector(pos.x, pos.y + 3 * cellSize),
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
            createVector(pos.x, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );
        this.inputs[3].show(
            createVector(pos.x, pos.y),
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

        rect(pos.x + cellSize, pos.y, 2 * cellSize, 3 * cellSize);
        textSize(cellSize * 2.4);
        fill(0);
        if (_.includes(["A", "B", "C", "D", "E", "F"], hex))
            text(hex, pos.x + 1.18 * cellSize, pos.y + 2.35 * cellSize);
        else text(hex, pos.x + 1.35 * cellSize, pos.y + 2.35 * cellSize);
        this.setColor();
    };

    calculateOutput = () => {
        return;
    };
}
