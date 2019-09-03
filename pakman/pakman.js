class Pakman {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size

        this.nextDirection = {x: 0, y: 0}
        this.direction = {x: 0, y: 0}
        this.animDirection = 0

        this.speed = 2
        this.levelTransitionSpeed = 8

        this.anim = 0

        this.canAnimateDead = false

        this.points = 0
        this._timer = 60
        this._timeToAdd = 45
        this.timer = this._timer

        this.state = 0
    }

    handleInputs(keyCode) {
        if (this.state != 1) {
            if (keyCode === RIGHT_ARROW) {
                this.nextDirection = {x: 1, y: 0}
                this.animDirection = 0
            }
        
            if (keyCode === LEFT_ARROW) {
                this.nextDirection = {x: -1, y: 0}
                this.animDirection = 3
            }
        
            if (keyCode === UP_ARROW) {
                this.nextDirection = {x: 0, y: -1}
                this.animDirection = 2
            }
        
            if (keyCode === DOWN_ARROW) {
                this.nextDirection = {x: 0, y: 1}
                this.animDirection = 1
            }
        }
    }

    update(gameMap) {
        if (Math.floor(this.anim) != 4) {
            if (this.state != 1 || (this.state == 1 && this.canAnimateDead)) {
                this.anim += 0.1
            }
        } else if (this.state != 1) {
            this.anim = 0
        }
        
        if (this.state != 1) {
            this.handleTime()
            this.handleStates(gameMap)
            this.eatPeanuts()
            this.eatPowerUps()
        }
    }

    handleTime() {
        if (this.timer <= 0) {
            this.die()
        } else {
            this.timer -= (deltaTime / 600)
        }
    }

    handleStates(gameMap) {
        switch (this.state) {
            case 0: { // movement free
                this.move(gameMap)

                if (this.x % gameMap.tileSize == 0 &&
                    this.y % gameMap.tileSize == 0) {
                    this.handleBridge(gameMap)
                    this.direction = this.nextDirection
                    this.eatDots(gameMap)
                }
                break
            }
            
            case 1: { // dead
                break
            }

            case 2: { // bridge collision
                this.state = 3
                gameMap.gen()

                this.timer += this._timeToAdd
                peanuts.peanuts = []
                peanuts.generate()
                break
            }

            case 3: {
                this.moveToNextLevel(gameMap)

                if (this.x % gameMap.tileSize == 0 &&
                    this.y % gameMap.tileSize == 0) {
                    this.handleBridge(gameMap)
                }

                break
            }
        }
    }

    moveToNextLevel(gameMap) {
        this.y = lerp(this.y, gameMap.bridges[gameMap.bridges.length - 2].y, 0.5)
        this.x = lerp(this.x, gameMap.bridges[gameMap.bridges.length - 2].x, 0.5)
    }

    move(gameMap) {
        if (this.checkNextPosition(gameMap)) {
            this.x += this.direction.x * this.speed
            this.y += this.direction.y * this.speed
        }
    }

    checkNextPosition(gameMap) {
        var xCheck = this.x + (this.direction.x * gameMap.tileSize)
        var yCheck = this.y + (this.direction.y * gameMap.tileSize)

        for (var tile of gameMap.tiles) {
            if (
                xCheck == tile.x &&
                yCheck == tile.y
            ) {
                return false
            }
        }

        return true
    }

    eatDots(gameMap) {
        for (var i = 0; i < gameMap.dots.length; i++) {
            var dot = gameMap.dots[i]

            if (
                this.x == dot.x &&
                this.y == dot.y
            ) {
                this.points += 0.1
                gameMap.dots.splice(i, 1)
            }
        }
    }

    handleBridge(gameMap) {
        for (var i = 0; i < gameMap.bridges.length; i++) {
            var bridge = gameMap.bridges[i]

            if (
                this.x == bridge.x &&
                this.y == bridge.y
            ) {
                if (bridge.type == "out") {
                    if (bridge.blocked) {
                        this.nextDirection = {x: 0, y: -1}
                    } else {
                        this.state = 2
                    }
                }
                if (bridge.type == "in") {
                    this.state = 0
                    this.nextDirection = {x: 0, y: 1}
                }
            }
        }
    }

    eatPowerUps() {
        for (var i = 0; i < peanuts.powerUps.length; i++) {
            var powerUp = peanuts.powerUps[i]
            if (
                this.x < powerUp.x + powerUp.size &&
                this.x + this.size > powerUp.x &&
                this.y < powerUp.y + powerUp.size &&
                this.y + this.size > powerUp.y
            ) {
                this.points += 2
                peanuts.powerUps.splice(i, 1)
            }
        }
    }

    eatPeanuts() {
        for (var i = 0; i < peanuts.peanuts.length; i++) {
            var peanut = peanuts.peanuts[i]
            if (
                this.x < peanut.x + peanut.size &&
                this.x + this.size > peanut.x &&
                this.y < peanut.y + peanut.size &&
                this.y + this.size > peanut.y
            ) {
                if (peanut.type == 0) {
                    this.points += peanut.value
                    peanuts.peanuts.splice(i, 1)
                }
                else {
                    this.die()
                }
            }
        }
    }

    die() {
        this.anim = 0
        this.animDirection = 4
        this.state = 1
    }

    draw(pakmanSprites) {
        image(
            pakmanSprites,
            this.x, this.y,
            this.size, this.size,
            Math.floor(this.anim) * 32, 128 + (this.animDirection * 32),
            32, 32
        )
    }
}