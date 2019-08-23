class Pakman {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.direction = {x: 0, y: 0}
    }

    move() {
        this.x += this.direction.x
        this.y += this.direction.y
    }

    draw() {
        ellipse(this.x + 5, this.y + 5, 10)
    }
}