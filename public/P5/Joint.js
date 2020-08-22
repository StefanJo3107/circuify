let jointType = {
    INPUT: "input",
    OUTPUT: "output",
};

class Joint {
    constructor(initialState, type) {
        this.state = initialState;
        this.type = type;
    }

    show(pos, radius, radiusMouseOver, clickable) {
        if (clickable) {
            stroke(0);
            strokeWeight(2);
            fill(255);
        }
        if (clickable && this.mouseInsideCircle(pos, radius))
            ellipse(pos.x, pos.y, radiusMouseOver, radiusMouseOver);
        else ellipse(pos.x, pos.y, radius, radius);

        this.position = pos;
    }

    setState(value) {
        this.state = value;
    }

    mouseInsideCircle(pos, radius) {
        return (
            mouseX >= pos.x - radius &&
            mouseX <= pos.x + radius &&
            mouseY >= pos.y - radius &&
            mouseY <= pos.y + radius
        );
    }
}
