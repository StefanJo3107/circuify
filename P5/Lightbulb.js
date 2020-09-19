class Lightbulb extends Element {
    constructor() {
        super(2, 4, 2, 3);
        this.inputs = [new Joint(false, jointType.INPUT)];
        this.outputs = [];
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
            pos.x + cellSize,
            pos.y + 3 * cellSize,
            pos.x + cellSize,
            pos.y + 4 * cellSize
        );

        this.inputs[0].show(
            createVector(pos.x + cellSize, pos.y + 4 * cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.setColor();

        if (this.inputs[0].getState() == true) fill(252, 241, 71);
        else fill(255, 255, 255, 100);
        beginShape();
        vertex(pos.x + 0.6 * cellSize, pos.y + 2.35 * cellSize);
        vertex(pos.x + 0.6 * cellSize, pos.y + 2.2 * cellSize);
        quadraticVertex(
            pos.x + 0.5 * cellSize,
            pos.y + 2 * cellSize,
            pos.x + 0.2 * cellSize,
            pos.y + 1.5 * cellSize
        );
        //quadraticVertex(pos.x, pos.y+1.4*cellSize,pos.x, pos.y+0.8*cellSize);
        quadraticVertex(
            pos.x - 0.2 * cellSize,
            pos.y + 0.2 * cellSize,
            pos.x + cellSize,
            pos.y + 0.15 * cellSize
        );
        quadraticVertex(
            pos.x + 2.2 * cellSize,
            pos.y + 0.2 * cellSize,
            pos.x + 1.8 * cellSize,
            pos.y + 1.5 * cellSize
        );
        quadraticVertex(
            pos.x + 1.5 * cellSize,
            pos.y + 2 * cellSize,
            pos.x + 1.4 * cellSize,
            pos.y + 2.2 * cellSize
        );
        vertex(pos.x + 1.4 * cellSize, pos.y + 2.35 * cellSize);
        //quadraticVertex(pos.x+2*cellSize, pos.y+2*cellSize,pos.x+1.4*cellSize, pos.y+2*cellSize);
        //vertex(pos.x+1.4*cellSize, pos.y+2.5*cellSize);
        endShape(CLOSE);
        line(
            pos.x + 0.85 * cellSize,
            pos.y + 2.35 * cellSize,
            pos.x + 0.6 * cellSize,
            pos.y + 1.2 * cellSize
        );
        line(
            pos.x + 1.15 * cellSize,
            pos.y + 2.35 * cellSize,
            pos.x + 1.4 * cellSize,
            pos.y + 1.2 * cellSize
        );
        strokeWeight(1);
        line(
            pos.x + 0.65 * cellSize,
            pos.y + 1.4 * cellSize,
            pos.x + 0.8 * cellSize,
            pos.y + 1.25 * cellSize
        );
        line(
            pos.x + 0.8 * cellSize,
            pos.y + 1.25 * cellSize,
            pos.x + 0.9 * cellSize,
            pos.y + 1.5 * cellSize
        );
        line(
            pos.x + 0.9 * cellSize,
            pos.y + 1.5 * cellSize,
            pos.x + 1.1 * cellSize,
            pos.y + 1.2 * cellSize
        );
        line(
            pos.x + 1.1 * cellSize,
            pos.y + 1.2 * cellSize,
            pos.x + 1.2 * cellSize,
            pos.y + 1.5 * cellSize
        );
        line(
            pos.x + 1.2 * cellSize,
            pos.y + 1.5 * cellSize,
            pos.x + 1.37 * cellSize,
            pos.y + 1.3 * cellSize
        );

        this.setColor();
        fill(139, 139, 139);
        beginShape();
        vertex(pos.x + 0.6 * cellSize, pos.y + 2.35 * cellSize);
        vertex(pos.x + 0.6 * cellSize, pos.y + 2.7 * cellSize);
        vertex(pos.x + 0.85 * cellSize, pos.y + 3 * cellSize);
        vertex(pos.x + 1.15 * cellSize, pos.y + 3 * cellSize);
        vertex(pos.x + 1.4 * cellSize, pos.y + 2.7 * cellSize);
        vertex(pos.x + 1.4 * cellSize, pos.y + 2.35 * cellSize);
        endShape(CLOSE);
        line(
            pos.x + 0.6 * cellSize,
            pos.y + 2.5 * cellSize,
            pos.x + 1.4 * cellSize,
            pos.y + 2.5 * cellSize
        );
        line(
            pos.x + 0.6 * cellSize,
            pos.y + 2.65 * cellSize,
            pos.x + 1.4 * cellSize,
            pos.y + 2.65 * cellSize
        );
        this.setColor();
    };

    calculateOutput = () => {
        return;
    };
}
