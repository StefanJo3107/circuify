let jointType = {
    INPUT: "input",
    OUTPUT: "output",
};

class Joint {
    constructor(initialState, type) {
        this.state = initialState;
        this.initialState = initialState;
        this.type = type;
        this.jointID = jointID;
        this.enabled = true;
        jointID++;
    }

    copyJoint = (joint) => {
        this.state = joint.state;
        this.initialState = joint.initialState;
        this.type = joint.type;
        this.jointID = jointID;
        jointID++;
    };

    show = (pos, radius, radiusMouseOver, state) => {
        this.position = pos;
        this.radius = radius;
        this.radiusMouseOver = radiusMouseOver;

        if (state == elementState.Placed || state == elementState.Selected) {
            stroke(0);
            //strokeWeight(2);
            fill(255);
        }

        if (
            ((state == elementState.Placed || state == elementState.Selected) &&
                selectedOutput != null &&
                this.type == jointType.INPUT &&
                !inputIsUsed(this)) ||
            (selectedInput != null && this.type == jointType.OUTPUT)
        ) {
            fill(60, 191, 214);
            stroke(24, 77, 87);
        }

        if (
            (state == elementState.Placed || state == elementState.Selected) &&
            selectedOutput != null &&
            this.type == jointType.INPUT &&
            inputIsUsed(this)
        ) {
            fill(240, 72, 72);
            stroke(214, 15, 15);
        }

        if (selectedOption.name.toLowerCase() === "removewire") {
            stroke(0);
            fill(255);
        }

        if (
            (state == elementState.Placed || state == elementState.Selected) &&
            this.mouseInsideCircle(pos, radius)
        )
            ellipse(pos.x, pos.y, radiusMouseOver, radiusMouseOver);
        else ellipse(pos.x, pos.y, radius, radius);
    };

    setState = (value) => {
        this.state = value;
    };

    getState = () => {
        return this.state;
    };

    resetState = () => {
        this.setState(this.initialState);
    };

    selectJoint = () => {
        if (this.type == jointType.INPUT) {
            selectedInput = this;
        } else if (this.type == jointType.OUTPUT) {
            selectedOutput = this;
        }
    };

    mouseInsideCircle = () => {
        return (
            mouseX >= this.position.x - this.radius &&
            mouseX <= this.position.x + this.radius &&
            mouseY >= this.position.y - this.radius &&
            mouseY <= this.position.y + this.radius
        );
    };
}
