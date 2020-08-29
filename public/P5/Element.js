let elementState = {
    Placing: "Placing",
    Placed: "Placed",
    Selected: "Selected",
};

class Element {
    constructor(entireWidth, entireHeight, elementWidth, elementHeight) {
        this.entireWidth = entireWidth;
        this.entireHeight = entireHeight;
        this.elementWidth = elementWidth;
        this.elementHeight = elementHeight;
        this.state = elementState.Placing;
    }

    setColor = () => {
        if (this.state == elementState.Placed) {
            strokeWeight(2);
            stroke(0);
            fill(255);
        } else if (this.state == elementState.Placing) {
            strokeWeight(2);
            stroke("#75b79e");
            fill("#a7e9af");
        } else if (this.state == elementState.Selected) {
            strokeWeight(2);
            stroke(60, 191, 214);
            fill(255);
        }
    };

    getState = () => {
        return this.state;
    };

    getPosition = () => {
        return this.position;
    };

    checkSelection = (mousePos) => {
        if (
            mousePos.x >= this.position.x &&
            mousePos.x <= this.position.x + cellSize * this.entireWidth &&
            mousePos.y >= this.position.y &&
            mousePos.y <= this.position.y + cellSize * this.entireHeight
        ) {
            this.state = elementState.Selected;
            return true;
        } else {
            this.state = elementState.Placed;
        }

        return false;
    };

    setElementState = (state) => {
        this.state = state;
    };

    showPlaced = (cellSize) => {
        this.show(this.position, cellSize);
    };

    setPosition = (pos, cell) => {
        this.position = pos;
        this.cell = cell;
    };

    updateJoints = () => {
        if (selectedInput == null) {
            for (let i = 0; i < this.inputs.length; i++) {
                if (
                    this.inputs[i].mouseInsideCircle() &&
                    !inputIsUsed(this.inputs[i])
                ) {
                    this.inputs[i].selectJoint();
                }
            }
        }

        if (selectedOutput == null) {
            for (let i = 0; i < this.outputs.length; i++) {
                if (this.outputs[i].mouseInsideCircle()) {
                    this.outputs[i].selectJoint();
                }
            }
        }
    };

    refreshPosition = () => {
        this.position = grid.cellToPos(this.cell);
    };
}
