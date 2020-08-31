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
        if (this.mouseInsideElement(mousePos)) {
            this.state = elementState.Selected;
            return true;
        } else {
            return false;
        }
    };

    mouseInsideElement = (mousePos) => {
        return (
            mousePos.x >= this.position.x &&
            mousePos.x <= this.position.x + cellSize * this.entireWidth &&
            mousePos.y >= this.position.y &&
            mousePos.y <= this.position.y + cellSize * this.entireHeight
        );
    };

    checkSelectionInsideRect = (rectStart, rectEnd) => {
        if (
            this.position.x >= min(rectStart.x, rectEnd.x) &&
            this.position.x <= max(rectStart.x, rectEnd.x) &&
            this.position.y >= min(rectStart.y, rectEnd.y) &&
            this.position.y <= max(rectStart.y, rectEnd.y)
        ) {
            this.state = elementState.Selected;
            return true;
        } else {
            this.state = elementState.Placed;
            return false;
        }
    };

    unselect = () => {
        this.state = elementState.Placed;
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
