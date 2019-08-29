class PowerUp {
    constructor(x, y, type) {
        this.x = x
        this.y = y
        this.size = 32
        this.type = type
    }
    
    draw(pakmanSprites) {
        image(
            pakmanSprites,
            this.x, this.y,
            this.size, this.size,
            0, 32 * (this.type == 1 ? 3 : 2),
            this.size, this.size
        )
    }
}