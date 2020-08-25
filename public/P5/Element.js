class Element {
    constructor(cellWidth, cellHeight, elementWidth, elementHeight) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.elementWidth = elementWidth;
        this.elementHeight = elementHeight;
    }

    setColor(placed) {
        if (placed) {
            strokeWeight(2);
            stroke(0);
            fill(255);
        } else {
            strokeWeight(2);
            stroke(65, 194, 56);
            fill(126, 204, 120);
        }
    }

    show(pos, cellSize, placed) {}

    calculateOutput() {}

    showPlaced(cellSize) {
        this.show(this.position, cellSize, true);
    }

    setPosition(pos, cell) {
        this.position = pos;
        this.cell = cell;
    }

    updateJoints = () => {
        if (selectedInput == null) {
            for (let i = 0; i < this.inputs.length; i++) {
                if (
                    this.inputs[i].mouseInsideCircle() &&
                    !inputIsUsed(this.inputs[i])
                ) {
                    this.inputs[i].selectJoint();
                    console.log("input");
                }
            }
        }

        if (selectedOutput == null) {
            for (let i = 0; i < this.outputs.length; i++) {
                if (this.outputs[i].mouseInsideCircle()) {
                    this.outputs[i].selectJoint();
                    console.log("output");
                }
            }
        }
    };

    refreshPosition() {
        this.position = grid.cellToPos(this.cell);
    }
}
