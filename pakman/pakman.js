class Pakman {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size

        this.nextDirection = {x: 0, y: 0}
        this.direction = {x: 0, y: 0}

        this.speed = 2
        this.levelTransitionSpeed = 8

        this.state = 0
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

    update(map) {
        this.handleStates(map)
    }

    handleStates(map) {
        switch (this.state) {
            case 0: { // movement free
                this.move(map)

                if (this.x % map.tileSize == 0 &&
                    this.y % map.tileSize == 0) {
                    this.handleBridge(map)
                    this.direction = this.nextDirection
                    this.eatDots(map)
                }
                break
            }
            
            case 1: { // dead
                break
            }

            case 2: { // bridge collision
                this.state = 3
                map.gen()
                console.log(map.rawMap)
                break
            }

            case 3: {                
                this.moveToNextLevel(map)

                if (this.x % map.tileSize == 0 &&
                    this.y % map.tileSize == 0) {
                    this.handleBridge(map)
                }

                break
            }
        }
    }

    moveToNextLevel(map) {
        this.y = lerp(this.y, map.bridges[map.bridges.length - 2].y, 0.5)
        this.x = lerp(this.x, map.bridges[map.bridges.length - 2].x, 0.5)
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

    handleBridge(map) {
        for (var i = 0; i < map.bridges.length; i++) {
            var bridge = map.bridges[i]

            if (
                this.x == bridge.x &&
                this.y == bridge.y
            ) {
                console.log(bridge.type)
                if (bridge.type == "out") this.state = 2
                if (bridge.type == "in") this.state = 0
            }
        }
    }

    draw(pakmanSprites) {
        //ellipse(this.x + map.tileSize / 2, this.y + map.tileSize / 2, this.size)
        image(
            pakmanSprites,
            this.x, this.y,
            this.size, this.size,
            0, 128,
            this.size, this.size
        )
    }
}