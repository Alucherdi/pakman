class Pakman {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size

        this.nextDirection = {x: 0, y: 0}
        this.direction = {x: 0, y: 0}
    }

    handleInputs(keyCode) {
        if (keyCode === RIGHT_ARROW) {
            this.nextDirection = {x: 1, y: 0}
        }
    
        if (keyCode === LEFT_ARROW) {
            this.nextDirection = {x: -1, y: 0}
        }
    
        if (keyCode === UP_ARROW) {
            this.nextDirection = {x: 0, y: -1}
        }
    
        if (keyCode === DOWN_ARROW) {
            this.nextDirection = {x: 0, y: 1}
        }
    }

    move(map) {
        if (this.checkNextPosition(map)) {
            this.x += this.direction.x
            this.y += this.direction.y
        }

        if (
            this.x % map.tileSize == 0 &&
            this.y % map.tileSize == 0
        ) {
            this.direction = this.nextDirection
            this.eatDots(map)
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

    eatDots(map) {
        for (var i = 0; i < map.dots.length; i++) {
            var dot = map.dots[i]

            if (
                this.x == dot.x &&
                this.y == dot.y
            ) {
                map.dots.splice(i, 1)
            }
        }
    }

    draw() {
        ellipse(this.x + map.tileSize / 2, this.y + map.tileSize / 2, this.size)
    }
}