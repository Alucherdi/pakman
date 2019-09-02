class GameManager {
    constructor() {
        this.op = 0
        this.state = 0
    }

    restart() {
        gameMap = new GameMap(32)
        pakman = new Pakman(32, 32, 32)
        peanuts = new PeanutGenerator()
        menu = new Menu()
        
        this.op = 0

        cam = {
            w: 1, h: 1
        }
    }

    deadCam() {
        if (pakman.state == 1) {
            pakman.size = lerp(pakman.size, gameMap.tileSize * 2, 0.1)
            
            cam.x = lerp(
                cam.x,
                (-pakman.x) + (windowWidth / 2) - (pakman.size / 2),
                0.1
            )

            cam.y = lerp(
                cam.y,
                (-pakman.y) + (windowHeight / 6) - (pakman.size / 2),
                0.1
            )

            if (Math.round(pakman.size) > gameMap.tileSize * 2 - 0.1) {
                pakman.canAnimateDead = true
            }
        }
    }

    drawDeadBackground() {
        if (pakman.state == 1) {
            this.op = lerp(this.op, 1, 0.1)
            fill(`rgba(14, 4, 33, ${this.op})`)
            rect(pakman.x - windowWidth / 2, pakman.y - windowHeight / 2, windowWidth * 2, windowHeight * 2)
        }
    }
}