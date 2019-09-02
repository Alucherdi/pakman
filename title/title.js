class Title {
    constructor () {
        this.w = 288
        this.h = 288
    }
    
    draw() {
        image(
            titleSprite,
            windowWidth / 2 - (this.w / 2),
            10,
            this.w,
            this.h,
            0, 0,
            this.w,
            this.h
        )

        fill(255)
        textAlign(CENTER)
        textFont(rfont)
        textSize(22)
        text("Tap para iniciar", windowWidth / 2, windowHeight / 1.5)
        textAlign(LEFT)
    }
}