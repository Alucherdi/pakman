class GameMap {
    constructor(tileSize) {
        this.rb = new RecursiveBacktracking()
        this.actualLevel = 1

        this.tileSize = tileSize

        this.tiles   = []
        this.dots    = []
        this.floor   = []
        this.bridges = []

        this.lastExit = 0

        this.genReference = {x: 0, y: 0}

        this.gen()
    }
    
    gen() {
        this.floor = []
        this.tiles = []
        this.dots = []
        this.bridges = []
        this.rawpakmap = this.rb.genMaze(9, 23)

        for (var y = 0; y < this.rawpakmap.length; y++) {
            for (var x = 0; x < this.rawpakmap[y].length; x++) {
                if (this.actualLevel > 1 && y == 0 && x == 1) {
                    this.bridges.push({
                        x: this.genReference.x + (x * this.tileSize),
                        y: this.genReference.y + (y * this.tileSize),
                        type: "in"
                    })

                    continue
                }
                
                if (this.rawpakmap[y][x] == 1) {
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
            if (y == this.rawpakmap.length - 1) {
                while (true) {
                    this.lastExit = Math.floor(Math.random() * this.rawpakmap[y].length)
                    if (this.rawpakmap[y - 1][this.lastExit] == 0) {
                        this.rawpakmap[y][this.lastExit] = 0
                        
                        var exitIndex = this.tiles.findIndex((el) => {
                            return el.y == this.genReference.y + (y * this.tileSize) &&
                                   el.x == this.genReference.x + this.lastExit * this.tileSize
                        })

                        this.bridges.push({
                            y: this.genReference.y + (y * this.tileSize),
                            x: this.genReference.x + this.lastExit * this.tileSize,
                            blocked: true,
                            anim: 0,
                            type: "out"
                        })
                        this.tiles.splice(exitIndex, 1)
                        break
                    }
                }
            }
        }

        this.floor = [...this.dots]
        
        this.genReference.y += 20 * this.tileSize

        this.actualLevel++
    }

    draw(spriteSheet) {
        for (var flor of this.floor) {
            image(
                pakmanSprites,
                flor.x, flor.y,
                gameMap.tileSize, gameMap.tileSize,
                0, 0,
                gameMap.tileSize, gameMap.tileSize
            )
        }
        
        for (var dot of this.dots) {            
            image(
                pakmanSprites,
                dot.x, dot.y,
                gameMap.tileSize, gameMap.tileSize,
                0, 32,
                gameMap.tileSize, gameMap.tileSize
            )
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
            if (!bridge.blocked) {
                if (Math.floor(bridge.anim) != 4)
                    bridge.anim += 0.1
            }
            
            image(
                pakmanSprites,
                bridge.x, bridge.y,
                gameMap.tileSize, gameMap.tileSize,
                Math.floor(bridge.anim) * 32, 288,
                gameMap.tileSize, gameMap.tileSize
            )
        }
    }
}