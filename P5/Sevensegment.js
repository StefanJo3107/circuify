class Sevensegment extends Element {
    constructor() {
        super(4, 3, 2, 3);
        this.inputs = [
            new Joint(false, jointType.INPUT),
            new Joint(false, jointType.INPUT),
            new Joint(false, jointType.INPUT),
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
        line(pos.x + 3 * cellSize, pos.y, pos.x + 4 * cellSize, pos.y);
        line(
            pos.x + 3 * cellSize,
            pos.y + 1.5 * cellSize,
            pos.x + 4 * cellSize,
            pos.y + 1.5 * cellSize
        );
        line(
            pos.x + 3 * cellSize,
            pos.y + 3 * cellSize,
            pos.x + 4 * cellSize,
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
        this.inputs[4].show(
            createVector(pos.x + 4 * cellSize, pos.y + 3 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );
        this.inputs[5].show(
            createVector(pos.x + 4 * cellSize, pos.y + 1.5 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );
        this.inputs[6].show(
            createVector(pos.x + 4 * cellSize, pos.y),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.setColor();

        let bin = "";

        for (let i = 0; i < this.inputs.length; i++) {
            bin += this.inputs[i].getState() ? "1" : "0";
        }

        fill(187, 200, 183);
        rect(pos.x + cellSize, pos.y, 2 * cellSize, 3 * cellSize);

        let num = parseInt(bin, 2);
        this.hexShow(pos, cellSize, sevenSegment[num]);

        this.setColor();
    };

    hexShow(pos, cellSize, binaryNum) {
        strokeWeight(0);

        //a
        fill(this.inputs[3].getState() ? (68, 69, 64) : (165, 178, 161));

        beginShape();
        vertex(pos.x + 1.4 * cellSize, pos.y + 0.25 * cellSize);
        vertex(pos.x + 1.5 * cellSize, pos.y + 0.15 * cellSize);
        vertex(pos.x + 2.5 * cellSize, pos.y + 0.15 * cellSize);
        vertex(pos.x + 2.6 * cellSize, pos.y + 0.25 * cellSize);
        vertex(pos.x + 2.5 * cellSize, pos.y + 0.35 * cellSize);
        vertex(pos.x + 1.5 * cellSize, pos.y + 0.35 * cellSize);
        endShape(CLOSE);

        //b
        fill(this.inputs[5].getState() ? (68, 69, 64) : (165, 178, 161));

        beginShape();
        vertex(pos.x + 2.65 * cellSize, pos.y + 0.3 * cellSize);
        vertex(pos.x + 2.75 * cellSize, pos.y + 0.4 * cellSize);
        vertex(pos.x + 2.75 * cellSize, pos.y + 1.4 * cellSize);
        vertex(pos.x + 2.65 * cellSize, pos.y + 1.5 * cellSize);
        vertex(pos.x + 2.55 * cellSize, pos.y + 1.4 * cellSize);
        vertex(pos.x + 2.55 * cellSize, pos.y + 0.4 * cellSize);
        endShape(CLOSE);

        //c
        fill(this.inputs[4].getState() ? (68, 69, 64) : (165, 178, 161));

        beginShape();
        vertex(pos.x + 2.65 * cellSize, pos.y + 1.55 * cellSize);
        vertex(pos.x + 2.75 * cellSize, pos.y + 1.65 * cellSize);
        vertex(pos.x + 2.75 * cellSize, pos.y + 2.6 * cellSize);
        vertex(pos.x + 2.65 * cellSize, pos.y + 2.7 * cellSize);
        vertex(pos.x + 2.55 * cellSize, pos.y + 2.6 * cellSize);
        vertex(pos.x + 2.55 * cellSize, pos.y + 1.65 * cellSize);
        endShape(CLOSE);

        //d
        fill(this.inputs[0].getState() ? (68, 69, 64) : (165, 178, 161));

        beginShape();
        vertex(pos.x + 2.6 * cellSize, pos.y + 2.75 * cellSize);
        vertex(pos.x + 2.5 * cellSize, pos.y + 2.65 * cellSize);
        vertex(pos.x + 1.5 * cellSize, pos.y + 2.65 * cellSize);
        vertex(pos.x + 1.4 * cellSize, pos.y + 2.75 * cellSize);
        vertex(pos.x + 1.5 * cellSize, pos.y + 2.85 * cellSize);
        vertex(pos.x + 2.5 * cellSize, pos.y + 2.85 * cellSize);
        endShape(CLOSE);

        //e
        fill(this.inputs[1].getState() ? (68, 69, 64) : (165, 178, 161));

        beginShape();
        vertex(pos.x + 1.35 * cellSize, pos.y + 2.7 * cellSize);
        vertex(pos.x + 1.45 * cellSize, pos.y + 2.6 * cellSize);
        vertex(pos.x + 1.45 * cellSize, pos.y + 1.65 * cellSize);
        vertex(pos.x + 1.35 * cellSize, pos.y + 1.55 * cellSize);
        vertex(pos.x + 1.25 * cellSize, pos.y + 1.65 * cellSize);
        vertex(pos.x + 1.25 * cellSize, pos.y + 2.6 * cellSize);
        endShape(CLOSE);

        //f
        fill(this.inputs[2].getState() ? (68, 69, 64) : (165, 178, 161));

        beginShape();
        vertex(pos.x + 1.35 * cellSize, pos.y + 0.3 * cellSize);
        vertex(pos.x + 1.45 * cellSize, pos.y + 0.4 * cellSize);
        vertex(pos.x + 1.45 * cellSize, pos.y + 1.4 * cellSize);
        vertex(pos.x + 1.35 * cellSize, pos.y + 1.5 * cellSize);
        vertex(pos.x + 1.25 * cellSize, pos.y + 1.4 * cellSize);
        vertex(pos.x + 1.25 * cellSize, pos.y + 0.4 * cellSize);
        endShape(CLOSE);

        //g
        fill(this.inputs[6].getState() ? (68, 69, 64) : (165, 178, 161));

        beginShape();
        vertex(pos.x + 1.4 * cellSize, pos.y + 1.525 * cellSize);
        vertex(pos.x + 1.5 * cellSize, pos.y + 1.425 * cellSize);
        vertex(pos.x + 2.5 * cellSize, pos.y + 1.425 * cellSize);
        vertex(pos.x + 2.6 * cellSize, pos.y + 1.525 * cellSize);
        vertex(pos.x + 2.5 * cellSize, pos.y + 1.625 * cellSize);
        vertex(pos.x + 1.5 * cellSize, pos.y + 1.625 * cellSize);
        endShape(CLOSE);
    }

    calculateOutput = () => {
        return;
    };
}
