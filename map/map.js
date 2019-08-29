class Map {
    constructor(tileSize) {
        this.rb = new RecursiveBacktracking()
        this.actualLevel = 1

        this.tileSize = tileSize

        this.tiles   = []
        this.dots    = []
        this.bridges = []

        this.lastExit = 0

        this.genReference = {x: 0, y: 0}

        this.gen()
    }

    gen() {
        this.tiles = []
        this.dots = []
        this.bridges = []
        this.rawMap = this.rb.genMaze(7, 23)

        for (var y = 0; y < this.rawMap.length; y++) {
            for (var x = 0; x < this.rawMap[y].length; x++) {
                if (this.actualLevel > 1 && y == 0 && x == 1) {
                    this.bridges.push({
                        x: this.genReference.x + (x * this.tileSize),
                        y: this.genReference.y + (y * this.tileSize),
                        type: "in"
                    })

                    continue
                }
                
                if (this.rawMap[y][x] == 1) {
                    this.tiles.push({
                        x: this.genReference.x + (x * this.tileSize),
                        y: this.genReference.y + (y * this.tileSize),
                        size: this.tileSize
                    })
                } else {
                    this.dots.push({
                        x: this.genReference.x + (x * this.tileSize),
                        y: this.genReference.y + (y * this.tileSize),
                        size: this.tileSize / 8
                    })
                }
            }

            // bridge
            if (y == this.rawMap.length - 1) {
                while (true) {
                    this.lastExit = Math.floor(Math.random() * this.rawMap[y].length)
                    if (this.rawMap[y - 1][this.lastExit] == 0) {
                        this.rawMap[y][this.lastExit] = 0
                        
                        var exitIndex = this.tiles.findIndex((el) => {
                            return el.y == this.genReference.y + (y * this.tileSize) &&
                                   el.x == this.genReference.x + this.lastExit * this.tileSize
                        })

                        this.bridges.push({
                            y: this.genReference.y + (y * this.tileSize),
                            x: this.genReference.x + this.lastExit * this.tileSize,
                            blocked: true,
                            type: "out"
                        })
                        this.tiles.splice(exitIndex, 1)
                        break
                    }
                }
            }
        }

        this.genReference.x = (this.lastExit - 1) * this.tileSize
        this.genReference.y += 20 * this.tileSize

        this.actualLevel++
    }

    draw(spriteSheet) {
        for (var dot of this.dots) {
            rect(
                dot.x + (this.tileSize / 2) - (dot.size / 2),
                dot.y + (this.tileSize / 2) - (dot.size / 2),
                dot.size, dot.size)
        }
        
        for (var tile of this.tiles) {
            rect(tile.x, tile.y, tile.size, tile.size)
            image(
                spriteSheet,
                tile.x, tile.y,
                tile.size, tile.size,
                0, 32,
                tile.size, tile.size
            )
        }

        for (var bridge of this.bridges) {
            if (bridge.blocked) {
                fill(255, 0, 0)
            } else {
                fill(100, 100, 200)
            }
            rect(bridge.x, bridge.y, tile.size, tile.size)
            fill(0)
        }
    }
}