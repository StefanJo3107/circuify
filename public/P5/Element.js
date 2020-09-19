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

    copyElement(element) {
        this.entireWidth = element.entireWidth;
        this.entireHeight = element.entireHeight;
        this.elementWidth = element.elementWidth;
        this.elementHeight = element.elementHeight;
        this.state = element.state;

        this.inputs = [];
        for (let i = 0; i < element.inputs.length; i++) {
            this.inputs.push(new Joint(null, null));
            this.inputs[i].copyJoint(element.inputs[i]);
        }

        this.outputs = [];
        for (let i = 0; i < element.outputs.length; i++) {
            this.outputs.push(new Joint(null, null));
            this.outputs[i].copyJoint(element.outputs[i]);
        }

        this.inversed = element.inversed;
        if (element.constructor.name === "IntegratedCircuit") {
            this.circuit = element.circuit;
            this.workingCircuit = new Circuit("");
            this.workingCircuit.copyCircuit(this.circuit);
        }
    }

    setColor = () => {
        //strokeWeight(4);
        strokeWeight(map(cellSize, minZoom, maxZoom, 1, 4));

        if (this.state == elementState.Placed) {
            stroke(0);
            fill(255);
        } else if (this.state == elementState.Placing) {
            stroke("#75b79e");
            fill("#a7e9af");
        } else if (this.state == elementState.Selected) {
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
        // if (
        //     this.position.x >= min(rectStart.x, rectEnd.x) &&
        //     this.position.x <= max(rectStart.x, rectEnd.x) &&
        //     this.position.y >= min(rectStart.y, rectEnd.y) &&
        //     this.position.y <= max(rectStart.y, rectEnd.y)
        // )
        // alert(
        //     (this.position.x < max(rectStart.x, rectEnd.x) &&
        //         this.position.x + this.entireWidth * cellSize >
        //             min(rectStart.x, rectEnd.x)) +
        //         " " +
        //         (this.position.y < max(rectStart.y, rectEnd.y) &&
        //             this.position.y + this.elementHeight >
        //                 min(rectStart.y, rectEnd.y))
        // );
        if (
            this.position.x < max(rectStart.x, rectEnd.x) &&
            this.position.x + this.entireWidth * cellSize >
                min(rectStart.x, rectEnd.x) &&
            this.position.y < max(rectStart.y, rectEnd.y) &&
            this.position.y + this.entireHeight * cellSize >
                min(rectStart.y, rectEnd.y)
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

    updateJointsRemoval = () => {
        if (selectedInput == null) {
            for (let i = 0; i < this.inputs.length; i++) {
                if (this.inputs[i].mouseInsideCircle()) {
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
