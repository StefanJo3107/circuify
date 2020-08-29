class Connection {
    constructor(input, output) {
        this.input = input;
        this.output = output;
    }

    show() {
        if (this.output.state == null) {
            stroke(
                lerpColor(
                    color(240, 72, 72),
                    color(214, 15, 15),
                    map(sin(sineFactor), -1, 1, 0, 1)
                )
            );
        } else if (this.output.state == false) {
            stroke(0);
        } else {
            stroke(
                lerpColor(
                    color(60, 191, 214),
                    color(47, 126, 204),
                    map(sin(sineFactor), -1, 1, 0, 1)
                )
            );
        }
        strokeWeight(4);
        noFill();
        bezier(
            this.output.position.x,
            this.output.position.y,
            this.output.position.x + 3 * cellSize,
            this.output.position.y,
            this.input.position.x - 3 * cellSize,
            this.input.position.y,
            this.input.position.x,
            this.input.position.y
        );
    }

    updateValues = () => {
        this.input.setState(this.output.state);
    };
}
