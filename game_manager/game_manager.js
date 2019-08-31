class GameManager {
    static op = 0

    static state = 0

    static restart() {
        map = new Map(32)
        pakman = new Pakman(32, 32, 32)
        peanuts = new PeanutGenerator()
        menu = new Menu()
        
        GameManager.op = 0

        cam = {
            w: 1, h: 1
        }
    }

    static deadCam() {
        if (pakman.state == 1) {
            pakman.size = lerp(pakman.size, map.tileSize * 2, 0.1)
            
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

            if (Math.round(pakman.size) > map.tileSize * 2 - 0.1) {
                pakman.canAnimateDead = true
            }
        }
    }

    static drawDeadBackground() {
        if (pakman.state == 1) {
            GameManager.op = lerp(GameManager.op, 1, 0.1)
            fill(`rgba(14, 4, 33, ${GameManager.op})`)
            rect(pakman.x - windowWidth / 2, pakman.y - windowHeight / 2, windowWidth * 2, windowHeight * 2)
        }
    }
}