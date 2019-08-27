class Peanut {
    constructor(x, y, speed) {
        this.x = x
        this.y = y
        this.state = 0 // 1: lemon, 2: chili

        this.speed = speed

        this.nextDirection = {x: 0, y: 0}
        this.direction = {x: 0, y: 0}
    }
    
    update(map) {
        this.move(map)

        if (this.x % map.tileSize == 0 &&
            this.y % map.tileSize == 0) {
            this.direction = this.nextDirection
        }
    }
    
    move(map) {
        if (this.checkNextPosition(map)) {
            this.x += this.direction.x * this.speed
            this.y += this.direction.y * this.speed
        }
    }

    checkNextPosition(map) {
        var xCheck = this.x + (this.direction.x * map.tileSize)
        var yCheck = this.y + (this.direction.y * map.tileSize)

        for (var tile of map.tiles) {
            if (
                xCheck == tile.x &&
                yCheck == tile.y
            ) {
                return false
            }
        }

        return true
    }
    
    draw() {
        
    }
}