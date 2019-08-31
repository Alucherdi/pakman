var map, pakman, wallSprites, pakmanSprites, peanuts, rfont, menu, cam, buttonIcons, titleSprite

function setup() {
    createCanvas(windowWidth, windowHeight)    

    map = new Map(32)
    pakman = new Pakman(32, 32, 32)
    peanuts = new PeanutGenerator()
    menu = new Menu()
}

function preload() {
    rfont = loadFont("assets/04B.ttf")
    
    wallSprites = loadImage("assets/tiles.png")
    pakmanSprites = loadImage("assets/base_spritesheet.png")
    buttonIcons = loadImage("assets/icons.png")
    titleSprite = loadImage("assets/title.png")
    cam = {
        w: 1,
        h: 1 
    }
}

function draw() {
    noSmooth()
    noStroke()

    if (GameManager.state == 1) {
        background(14, 4, 33)
        if (pakman.state != 1) {
            cam.x = (windowWidth / 2) - ((9 * map.tileSize) / 2),
            cam.y = (windowHeight / 2) - pakman.y + (pakman.size / 2)
        }

        applyMatrix(cam.w, 0, 0, cam.h, cam.x, cam.y);

        fill(0)
        pakman.update(map)

        if (pakman.state != 1)
            peanuts.update(map)
        
        map.draw(wallSprites)
        peanuts.draw(pakmanSprites)
        GameManager.drawDeadBackground()

        pakman.draw(pakmanSprites)

        menu.draw(cam, pakman)
        GameManager.deadCam()
    } else {
        background(5, 9, 20)
        Title.draw()
    }

    //text(`${Math.floor(mouseX - cam.x)} , ${Math.floor(mouseY - cam.y)}`, mouseX - cam.x, mouseY - cam.y)
}

function keyPressed() {
    pakman.handleInputs(keyCode)
}

function touchStarted() {
    TouchHandler.touchStarted()

    if (GameManager.state == 0) {
        GameManager.state = 1
    }

    if (pakman.state == 1) {
        if (
            mouseX - cam.x > menu.contexts.deadButtons.x2 &&
            mouseX - cam.x < menu.contexts.deadButtons.x2 + menu.contexts.deadButtons.w &&
            mouseY - cam.y > menu.contexts.deadButtons.y &&
            mouseY - cam.y < menu.contexts.deadButtons.y + menu.contexts.deadButtons.h
        ) {
            GameManager.restart()
        }

        if (
            mouseX - cam.x > menu.contexts.deadButtons.x &&
            mouseX - cam.x < menu.contexts.deadButtons.x + menu.contexts.deadButtons.w &&
            mouseY - cam.y > menu.contexts.deadButtons.y &&
            mouseY - cam.y < menu.contexts.deadButtons.y + menu.contexts.deadButtons.h
        ) {
            console.log("salir")
        }
    }
}

function touchEnded() {
    pakman.nextDirection = TouchHandler.touchEnded()
}