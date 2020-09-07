class Circuit {
    constructor(name) {
        this.name = name;
        this.elements = [];
        this.connections = [];
        this.usedInputs = [];
        this.selectedInput = null;
        this.selectedOutput = null;
    }

    showCircuit = () => {
        //showing connections
        if (this.connections != null) {
            for (let connection of this.connections) {
                connection.show();
                connection.updateValues();
            }
        }

        //showing elements
        if (this.elements != null) {
            for (let element of this.elements) {
                element.refreshPosition();
                element.show(elements[i].getPosition(), cellSize);
                element.calculateOutput();
            }
        }
    };
}
