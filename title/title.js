class Title {
    static w = 288
    static h = 288
    
    static draw() {
        image(
            titleSprite,
            windowWidth / 2 - (Title.w / 2),
            10,
            Title.w,
            Title.h,
            0, 0,
            Title.w,
            Title.h
        )

        fill(255)
        textAlign(CENTER)
        textFont(rfont)
        textSize(22)
        text("Tap para iniciar", windowWidth / 2, windowHeight / 1.5)
        textAlign(LEFT)
    }
}