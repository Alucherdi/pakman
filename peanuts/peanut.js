class Peanut {
    constructor(x, y, speed, type) {
        this.x = x
        this.y = y
        this.size = 32

        //0: peanut, 1: lemon, 2: chili, 3: peanutLemon, 4: peanutChili
        this.type = type

        this.speed = speed

        this.nextDirection = {x: 0, y: 0}
        this.direction = {x: 0, y: 0}

        this.timeBeforeTypeChange = 300
        this.timeReference = this.timeBeforeTypeChange

        this.changeDirection(map)
    }
    
    update(map, peanuts) {
        this.eatOthers(peanuts)
        this.changeType()

        if (this.type != 1 && this.type != 2) {
            this.move(map)
            if (this.x % map.tileSize == 0 &&
                this.y % map.tileSize == 0) {
                this.direction = this.nextDirection
            }
        }
    }

    changeDirection(map) {
        var directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]

        while (true) {
            var dirToChange = Math.floor(Math.random() * 4)

            if (map.tiles.findIndex(_ => 
                _.x == (directions[dirToChange].x * map.tileSize) + this.x &&
                _.y == (directions[dirToChange].y * map.tileSize) + this.y) == -1
            ) {
                this.nextDirection = directions[dirToChange]
                break
            }
        }

    }

    doMovePosibilityExists(map) {
        var posibilities = [
            map.tiles.find(_ => _.x == this.x && _.y == this.y - map.tileSize) == undefined, // up
            map.tiles.find(_ => _.x == this.x + map.tileSize && _.y == this.y) == undefined, // right
            map.tiles.find(_ => _.x == this.x && _.y == this.y + map.tileSize) == undefined, // down
            map.tiles.find(_ => _.x == this.x - map.tileSize && _.y == this.y) == undefined // left
        ]

        var p = posibilities.filter(Boolean).length
        return p == 1 || p == 3 || 
            ( // vertical or horizontal paths avoided in true result
                p == 2 &&
                (posibilities[0] != posibilities[2]) &&
                (posibilities[1] != posibilities[3])
            )
    }
    
    move(map) {
        if (this.checkNextPosition(map)) {
            this.x += this.direction.x * this.speed
            this.y += this.direction.y * this.speed
        } 
        
        if (this.doMovePosibilityExists(map)) {
            this.changeDirection(map)
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

        for (var bridge of map.bridges) {
            if (
                xCheck == bridge.x &&
                yCheck == bridge.y
            ) {
                return false
            }
        }

        return true
    }

    changeType() {
        if (this.type == 3 || this.type == 4) {
            this.timeReference--

            console.log(this.timeReference)

            if (this.timeReference <= 0) {
                this.type = 0
                this.timeReference = this.timeBeforeTypeChange
            }
        }
    }

    eatOthers(peanuts) {
        for (var i = 0; i < peanuts.length; i++) {
            var peanut = peanuts[i]
            
            if (
                this.x + this.size > peanut.x &&
                this.x < peanut.x + peanut.size &&
                this.y + this.size > peanut.y &&
                this.y < peanut.y + peanut.size &&
                this.type != peanut.type
            ) {
                if (this.type == 0 && peanut.type == 1) {
                    this.type = 3
                    peanuts.splice(i, 1)
                }

                if (this.type == 0 && peanut.type == 2) {
                    this.type = 4
                    peanuts.splice(i, 1)
                }
            }
        }
    }
    
    draw() {
        rect(this.x, this.y, this.size, this.size)
        fill(255)
        text(this.type, this.x + 10, this.y + 10)
        fill(0)
    }
}