class Menu {
    constructor() {
        this.fontSize = 14
        this.contexts = {
            score: {
                x: 5,
                y: this.fontSize + 2,
                txt: ""
            },
            dead: {
                x: windowWidth / 2,
                y: windowHeight / 2,
                txt: ""
            },
            deadButtons: {
                x: 0,
                x2: 0,
                y: 0,
                w: 120,
                h: 44
            }
        }
    }

    draw(cam, pakman) {
        if (pakman.state != 1) {
            this.showScore(cam)
        } else if (pakman.canAnimateDead) {
            this.showDeadMessage(cam)
            this.showDeadMenuButtons(cam)
        }
    }

    showDeadMessage(cam) {
        this.contexts.dead.txt = `¡Has perdido!\nScore: ${Math.floor(pakman.points)}`
        
        fill(255)
        textFont(rfont)
        textSize(32)
        textAlign(CENTER)
        text(
            this.contexts.dead.txt,
            pakman.x + pakman.size / 2,
            pakman.y + pakman.size / 2 + (windowHeight / 5),
        )
        textAlign(LEFT)
    }

    showDeadMenuButtons() {
        
        //fill(218, 41, 28)
        this.contexts.deadButtons.x = pakman.x - this.contexts.deadButtons.w
        this.contexts.deadButtons.x2 = pakman.x + pakman.size
        this.contexts.deadButtons.y = pakman.y + windowHeight / 1.4

        stroke(0, 0, 0)

        fill(57, 41, 70)
        rect(
            this.contexts.deadButtons.x,
            this.contexts.deadButtons.y,
            this.contexts.deadButtons.w,
            this.contexts.deadButtons.h,
            10
        )


        fill(57, 41, 70)
        rect(
            this.contexts.deadButtons.x2,
            this.contexts.deadButtons.y,
            this.contexts.deadButtons.w,
            this.contexts.deadButtons.h,
            10
        )

        noStroke(0, 0, 0)

        image(
            buttonIcons,
            (this.contexts.deadButtons.x + this.contexts.deadButtons.w / 2) - 16,
            (this.contexts.deadButtons.y + this.contexts.deadButtons.h / 2) - 16,
            32, 32,
            0, 0,
            32, 32   
        )

        image(
            buttonIcons,
            (this.contexts.deadButtons.x2 + this.contexts.deadButtons.w / 2) - 16,
            (this.contexts.deadButtons.y + this.contexts.deadButtons.h / 2) - 16,
            32, 32,
            32, 0,
            32, 32   
        )
    }

    showScore(cam) {
        this.contexts.score.txt = `Puntos: ${Math.floor(pakman.points)}`

        fill(0)
        rect(0 - cam.x, 0 - cam.y, windowWidth, this.fontSize + 8)
        
        fill(255)
        textFont(rfont)
        textSize(this.fontSize)
        text(
            this.contexts.score.txt,
            this.contexts.score.x - cam.x,
            this.contexts.score.y - cam.y
        )
    }
}