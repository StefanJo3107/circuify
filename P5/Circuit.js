class Circuit {
    constructor(name) {
        this.name = name;
        this.elements = [];
        this.connections = [];
        this.usedInputs = [];
        this.switchOutputs = [];
        this.bulbInputs = [];
        this.version = 0;
        this.namingVersion = 0;
        this.selectedIndex = -1;
    }

    copyCircuit(circuit) {
        this.name = circuit.name;
        this.elements = [];
        for (let i = 0; i < circuit.elements.length; i++) {
            this.elements.push(
                eval("new " + circuit.elements[i].constructor.name + "()")
            );
            this.elements[i].copyElement(circuit.elements[i]);
        }

        this.connections = [];
        for (let k = 0; k < circuit.connections.length; k++) {
            let input = [0, 0, false];
            let output = [0, 0, false];
            for (let i = 0; i < circuit.elements.length; i++) {
                for (let j = 0; j < circuit.elements[i].inputs.length; j++) {
                    if (
                        circuit.elements[i].inputs[j].jointID ==
                        circuit.connections[k].getInput().jointID
                    ) {
                        input = [i, j, true];
                        break;
                    }
                }

                for (let j = 0; j < circuit.elements[i].outputs.length; j++) {
                    if (
                        circuit.elements[i].outputs[j].jointID ==
                        circuit.connections[k].getOutput().jointID
                    ) {
                        output = [i, j, true];
                        break;
                    }
                }

                if (input[2] && output[2]) break;
            }
            this.connections.push(
                new Connection(
                    this.elements[input[0]].inputs[input[1]],
                    this.elements[output[0]].outputs[output[1]]
                )
            );
        }

        this.switchOutputs = [];
        this.bulbInputs = [];
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].constructor.name === "Switch") {
                this.switchOutputs.push(this.elements[i].outputs[0]);
            } else if (this.elements[i].constructor.name === "Lightbulb") {
                this.bulbInputs.push(this.elements[i].inputs[0]);
            }
        }

        this.version = circuit.version;
    }

    getSwitchesAndBulbs = () => {
        this.switchOutputs = [];
        this.bulbInputs = [];
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].constructor.name === "Switch") {
                this.switchOutputs.push(this.elements[i].outputs[0]);
            } else if (this.elements[i].constructor.name === "Lightbulb") {
                this.bulbInputs.push(this.elements[i].inputs[0]);
            }
        }
    };

    showCircuit = () => {
        this.showConnectionInProgress();

        let connectionsToDelete = [];
        //showing connections
        if (this.connections != null) {
            for (let connection of this.connections) {
                if (connection.input.enabled && connection.output.enabled) {
                    connection.show();
                    if (!paused) connection.updateValues();
                } else {
                    connectionsToDelete.push(connection);
                }
            }
        }

        this.removeConnections(connectionsToDelete);

        this.showConnectionRemovalInProgress();

        let selectedElements = [];

        //showing elements
        if (this.elements != null) {
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].refreshPosition();
                this.elements[i].show(this.elements[i].getPosition(), cellSize);
                if (!paused) this.elements[i].calculateOutput();

                if (this.elements[i].getState() === elementState.Selected) {
                    selectedElements.push(i);
                }
            }
        }

        if (
            selectedElements.length == 1 &&
            (this.elements[selectedElements[0]].constructor.name === "Switch" ||
                this.elements[selectedElements[0]].constructor.name ===
                    "Lightbulb")
        ) {
            if (this.selectedIndex != selectedElements[0]) {
                showModal();
                modalName.innerHTML =
                    this.elements[selectedElements[0]].constructor.name ===
                    "Switch"
                        ? "Switch"
                        : "Light Bulb";

                modalInput.value = this.elements[selectedElements[0]].getName();
                modal.oninput = () => {
                    this.updateElementName(this.elements[selectedElements[0]]);
                };
                this.selectedIndex = selectedElements[0];
            }
        } else {
            if (modalIsShown) {
                hideModal();
            }

            this.selectedIndex = -1;
        }
    };

    updateElementName = (element) => {
        element.setName(modalInput.value);
        this.namingVersion++;
    };

    addElement = (element) => {
        this.elements.push(element);
        unselectAllElements();
        element.setElementState(elementState.Selected);

        if (element.constructor.name === "Switch") {
            this.switchOutputs.push(element.outputs[0]);
        } else if (element.constructor.name === "Lightbulb") {
            this.bulbInputs.push(element.inputs[0]);
        }

        this.version++;
    };

    getElements = () => {
        return this.elements;
    };

    getOutput = (inputs) => {
        const outputs = [];

        for (let i = 0; i < this.switchOutputs.length; i++) {
            this.switchOutputs[i].setState(inputs[i].getState());
        }

        for (let i = 0; i < this.connections.length; i++) {
            this.connections[i].updateValues();
        }

        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].calculateOutput();
        }

        for (let i = 0; i < this.connections.length; i++) {
            this.connections[i].updateValues();
        }

        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].calculateOutput();
        }

        for (let i = 0; i < this.bulbInputs.length; i++) {
            outputs.push(this.bulbInputs[i].getState());
        }
        return outputs;
    };

    showConnectionInProgress = () => {
        if (selectedOption.name.toLowerCase() !== "select") return;

        if (selectedInput != null && selectedOutput == null) {
            stroke(0);
            strokeWeight(map(cellSize, minZoom, maxZoom, 2, 6));
            noFill();
            bezier(
                selectedInput.position.x,
                selectedInput.position.y,
                selectedInput.position.x - 3 * cellSize,
                selectedInput.position.y,
                mouseX + 3 * cellSize,
                mouseY,
                mouseX,
                mouseY
            );
        } else if (selectedInput == null && selectedOutput != null) {
            stroke(0);
            strokeWeight(map(cellSize, minZoom, maxZoom, 2, 6));
            noFill();
            bezier(
                selectedOutput.position.x,
                selectedOutput.position.y,
                selectedOutput.position.x + 3 * cellSize,
                selectedOutput.position.y,
                mouseX - 3 * cellSize,
                mouseY,
                mouseX,
                mouseY
            );
        } else if (selectedInput != null && selectedOutput != null) {
            this.connections.push(
                new Connection(selectedInput, selectedOutput)
            );
            this.usedInputs.push(selectedInput);
            selectedInput = null;
            selectedOutput = null;

            this.version++;
        }
    };

    showConnectionRemovalInProgress = () => {
        if (selectedOption.name.toLowerCase() !== "removewire") return;

        if (selectedInput != null && selectedOutput == null) {
            stroke(240, 72, 72);
            strokeWeight(map(cellSize, minZoom, maxZoom, 2, 6));
            noFill();
            bezier(
                selectedInput.position.x,
                selectedInput.position.y,
                selectedInput.position.x - 3 * cellSize,
                selectedInput.position.y,
                mouseX + 3 * cellSize,
                mouseY,
                mouseX,
                mouseY
            );
        } else if (selectedInput == null && selectedOutput != null) {
            stroke(240, 72, 72);
            strokeWeight(map(cellSize, minZoom, maxZoom, 2, 6));
            noFill();
            bezier(
                selectedOutput.position.x,
                selectedOutput.position.y,
                selectedOutput.position.x + 3 * cellSize,
                selectedOutput.position.y,
                mouseX - 3 * cellSize,
                mouseY,
                mouseX,
                mouseY
            );
        } else if (selectedInput != null && selectedOutput != null) {
            let connToRemove = [];
            for (let i = 0; i < this.connections.length; i++) {
                if (
                    this.connections[i].input.jointID ==
                        selectedInput.jointID &&
                    this.connections[i].output.jointID == selectedOutput.jointID
                )
                    connToRemove.push(this.connections[i]);
            }
            _.remove(this.connections, (conn) => {
                return _.includes(connToRemove, conn);
            });
            _.remove(this.usedInputs, (inp) => {
                return inp.jointID === selectedInput.jointID;
            });
            selectedInput.resetState();
            selectedInput = null;
            selectedOutput = null;

            if (connToRemove.length != 0) {
                this.version++;
            }
        }
    };

    deleteSelectedElements = () => {
        let elementsToRemove = [];

        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].getState() == elementState.Selected) {
                this.removeElementConnections(i);
                elementsToRemove.push(this.elements[i]);
            }
        }

        if (elementsToRemove.length > 0) {
            //removing connections in progress
            selectedInput = null;
            selectedOutput = null;
        }

        _.remove(this.elements, (el) => {
            return _.includes(elementsToRemove, el);
        });

        this.getSwitchesAndBulbs();
        this.version++;
    };

    removeElementConnections(index) {
        let inputs = [];
        let outputs = [];
        for (let i = 0; i < this.elements[index].inputs.length; i++) {
            inputs.push(this.elements[index].inputs[i]);
        }

        for (let i = 0; i < this.elements[index].outputs.length; i++) {
            outputs.push(this.elements[index].outputs[i]);
        }

        let deletedInputs = [];

        _.remove(this.connections, (conn) => {
            if (
                _.includes(inputs, conn.input) ||
                _.includes(outputs, conn.output)
            ) {
                conn.input.resetState();
                deletedInputs.push(conn.input);
                return true;
            }

            return false;
        });

        _.remove(this.usedInputs, (inp) => {
            return _.includes(deletedInputs, inp);
        });
    }

    removeConnections(connToRemove) {
        let deletedInputs = [];

        _.remove(this.connections, (conn) => {
            if (_.includes(connToRemove, conn)) {
                conn.input.resetState();
                deletedInputs.push(conn.input);
                return true;
            }
            return false;
        });

        _.remove(this.usedInputs, (inp) => {
            return _.includes(deletedInputs, inp);
        });
    }
}
