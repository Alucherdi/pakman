class Map {
    constructor(tileSize) {
        var rb = new RecursiveBacktracking()

        this.tileSize = tileSize
        this.rawMap = rb.genMaze(21, 51)
        this.tiles = []
        this.dots = []

        this.gen()
    }

    gen() {
        for (var y = 0; y < this.rawMap.length; y++) {
            for (var x = 0; x < this.rawMap[y].length; x++) {
                if (this.rawMap[y][x] == 1) {
                    this.tiles.push({
                        x: x * this.tileSize,
                        y: y * this.tileSize,
                        size: this.tileSize
                    })
                } else {
                    this.dots.push({
                        x: x * this.tileSize,
                        y: y * this.tileSize,
                        size: this.tileSize / 4
                    })
                }
            }
        }
    }

    draw() {
        for (var dot of this.dots) {
            rect(
                dot.x + (this.tileSize / 2) - (dot.size / 2),
                dot.y + (this.tileSize / 2) - (dot.size / 2),
                dot.size, dot.size)
        }
        
        for (var tile of this.tiles) {
            rect(tile.x, tile.y, tile.size, tile.size)
        }
    }
}