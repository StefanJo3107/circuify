class False extends Element {
    constructor() {
        super(3, 2, 2, 2);
        this.inputs = [];
        this.outputs = [new Joint(false, jointType.OUTPUT)];
    }

    show = (pos, cellSize) => {
        this.setColor();
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
        textSize(cellSize * 1.8);
        fill(0);
        textFont("Helvetica");
        text("0", pos.x + 0.5 * cellSize, pos.y + 1.65 * cellSize);
        this.setColor();
    };

    calculateOutput = () => {
        this.outputs[0].setState(false);
    };
}
