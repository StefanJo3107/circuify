class Oscope extends Element {
    constructor() {
        super(6, 4, 6, 3);
        this.inputs = [new Joint(false, jointType.INPUT)];
        this.outputs = [];
        this.stateHistory = [];
    }

    show = (pos, cellSize) => {
        this.setColor();

        this.position = pos;

        line(
            pos.x + 3 * cellSize,
            pos.y + 3 * cellSize,
            pos.x + 3 * cellSize,
            pos.y + 4 * cellSize
        );

        this.inputs[0].show(
            createVector(pos.x + 3 * cellSize, pos.y + 4 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.setColor();
        if (this.state !== elementState.Placing) {
            fill(0);
            rect(pos.x, pos.y, cellSize * 6, cellSize * 3);
            fill(70);
            rect(
                pos.x + 0.2 * cellSize,
                pos.y + 0.2 * cellSize,
                cellSize * 5.6,
                cellSize * 2.6
            );
        } else {
            rect(pos.x, pos.y, cellSize * 6, cellSize * 3);
        }

        stroke(0, 255, 0);
        noFill();
        beginShape();
        for (let i = 0; i < this.stateHistory.length; i++) {
            let mirrorIndex = this.stateHistory.length - 1 - i;
            let y = map(
                this.stateHistory[i],
                0,
                1,
                pos.y + 2.5 * cellSize,
                pos.y + 0.5 * cellSize
            );
            let x = map(
                mirrorIndex,
                0,
                100,
                pos.x + 5.71 * cellSize,
                pos.x + 0.25 * cellSize
            );
            vertex(x, y);
        }
        endShape();
    };

    calculateOutput = () => {
        if (this.inputs[0].getState() === true) {
            this.stateHistory.push(1);
        } else {
            this.stateHistory.push(0);
        }

        while (this.stateHistory.length > 100) {
            this.stateHistory.shift();
        }
    };
}
