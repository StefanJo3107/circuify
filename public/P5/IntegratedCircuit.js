class IntegratedCircuit extends Element {
    constructor(circuit) {
        super(5, 1, 3, 1);
        this.inputs = [];
        this.outputs = [];
        this.circuit = null;
        this.workingCircuit = null;
    }

    addCircuit(circuit) {
        this.circuit = circuit;
    }
    show = (pos, cellSize) => {
        this.setColor();

        this.position = pos;

        if (
            this.workingCircuit != null &&
            this.workingCircuit.version != this.circuit.version
        ) {
            this.workingCircuit = null;
        }

        if (this.outputs.length != this.circuit.bulbInputs.length) {
            for (let i = 0; i < this.outputs.length; i++) {
                this.outputs[i].enabled = false;
            }

            this.outputs = [];
            this.workingCircuit = null;

            for (let bulb in this.circuit.bulbInputs) {
                this.outputs.push(new Joint(null, jointType.OUTPUT));
            }
        }

        if (this.inputs.length != this.circuit.switchOutputs.length) {
            for (let i = 0; i < this.inputs.length; i++) {
                this.inputs[i].enabled = false;
            }

            this.inputs = [];
            this.workingCircuit = null;

            for (let sw in this.circuit.switchOutputs) {
                this.inputs.push(new Joint(null, jointType.INPUT));
            }
        }

        this.entireHeight =
            max([
                this.circuit.bulbInputs.length,
                this.circuit.switchOutputs.length,
                1,
            ]) + 1;

        this.entireWidth = max(ceil(this.circuit.name.length / 2), 1) + 4;
        this.elementWidth = max(ceil(this.circuit.name.length / 2), 1) + 2;

        for (let i = 0; i < this.inputs.length; i++) {
            this.setColor();

            line(
                pos.x,
                pos.y + (i + 1) * cellSize,
                pos.x + cellSize,
                pos.y + (i + 1) * cellSize
            );

            this.inputs[i].show(
                createVector(pos.x, pos.y + (i + 1) * cellSize),
                cellSize / 2,
                cellSize,
                this.state
            );
        }

        for (let i = 0; i < this.outputs.length; i++) {
            this.setColor();

            line(
                pos.x + (this.entireWidth - 1) * cellSize,
                pos.y + (i + 1) * cellSize,
                pos.x + this.entireWidth * cellSize,
                pos.y + (i + 1) * cellSize
            );

            this.outputs[i].show(
                createVector(
                    pos.x + this.entireWidth * cellSize,
                    pos.y + (i + 1) * cellSize
                ),
                cellSize / 2,
                cellSize,
                this.state
            );
        }

        this.setColor();

        rect(
            pos.x + cellSize,
            pos.y,
            this.elementWidth * cellSize,
            this.entireHeight * cellSize
        );
        textSize(cellSize);
        textAlign(CENTER);
        strokeWeight(0.5);
        fill(0);
        //textFont("Helvetica");
        textFont(letterFont);
        text(
            this.circuit.name,
            pos.x + (cellSize * (this.elementWidth + 2)) / 2,
            pos.y + (this.entireHeight / 2) * cellSize + 0.2 * cellSize
        );
        this.setColor();

        textAlign(LEFT);
    };

    removeConnection = () => {};

    calculateOutput = () => {
        if (this.workingCircuit == null) {
            this.workingCircuit = new Circuit("");
            this.workingCircuit.copyCircuit(this.circuit);
        }

        let outputs = this.workingCircuit.getOutput(this.inputs);
        for (let i = 0; i < outputs.length; i++) {
            this.outputs[i].setState(outputs[i]);
        }
    };
}
