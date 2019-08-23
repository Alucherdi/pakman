class Map {
    constructor() {
        var rb = new RecursiveBacktracking()

        this.map = rb.genMaze(21, 51)
    }
    draw() {
        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] == 1) {
                    rect(x * 10, y * 10, 10, 10)
                }
            }
        }
    }
}