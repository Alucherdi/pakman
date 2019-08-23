class RecursiveBacktracking {
    
    constructor() {
        this.maze
        this.mazeW
        this.mazeH
    }
    
    genMaze(w, h) {
        this.maze = []
        
        for (var y = 0; y < h; y++) {
            this.maze[y] = []
            for (var x = 0; x < w; x++) {
                this.maze[y][x] = 1
            }
        }

        var r = Math.floor(Math.random() * h)
        while (r % 2 == 0) {
            r = Math.floor(Math.random() * h)
        }

        var c = Math.floor(Math.random() * w)
        while (c % 2 == 0) {
            c = Math.floor(Math.random() * w)
        }

        this.maze[r][c] = 0

        this.mazeH = h
        this.mazeW = w

        this.recursion(r, c)

        return this.maze
    }

    recursion(r, c) {
        var directions = [1, 2, 3, 4]
        directions = shuffle(directions)

        for (var i = 0; i < directions.length; i++) {
            switch(directions[i]) {
                case 1: // up
                    if (r - 2 <= 0) continue
                    if (this.maze[r - 2][c] != 0) {
                        this.maze[r - 2][c] = 0
                        this.maze[r - 1][c] = 0

                        this.recursion(r - 2, c)
                    }
                    break;
                    
                case 2: // right
                    if (c + 2 >= this.mazeW - 1) continue
                    if (this.maze[r][c + 2] != 0) {
                        this.maze[r][c + 2] = 0
                        this.maze[r][c + 1] = 0

                        this.recursion(r, c + 2)
                    }
                    break;

                case 3: // down
                    if (r + 2 >= this.mazeH - 1) continue
                    if (this.maze[r + 2][c] != 0) {
                        this.maze[r + 2][c] = 0
                        this.maze[r + 1][c] = 0

                        this.recursion(r + 2, c)
                    }
                    break;

                case 4: // left
                    if (c - 2 <= 0) continue
                    if (this.maze[r][c - 2] != 0) {
                        this.maze[r][c - 2] = 0
                        this.maze[r][c - 1] = 0

                        this.recursion(r, c - 2)
                    }
                    break;
            }
        }
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
}