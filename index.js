var gameMap, pakman, wallSprites, pakmanSprites, peanuts, rfont, menu, cam, buttonIcons, titleSprite,
title, touchHandler, gameManager

function setup() {
    createCanvas(windowWidth, windowHeight)    

    gameMap = new GameMap(32)
    pakman = new Pakman(32, 32, 32)
    peanuts = new PeanutGenerator()
    menu = new Menu()

    title = new Title()
    touchHandler = new TouchHandler()
    gameManager = new GameManager()
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

    if (gameManager.state == 1) {
        background(14, 4, 33)
        if (pakman.state != 1) {
            cam.x = (windowWidth / 2) - ((9 * gameMap.tileSize) / 2),
            cam.y = (windowHeight / 2) - pakman.y + (pakman.size / 2)
        }

        applyMatrix(cam.w, 0, 0, cam.h, cam.x, cam.y);

        fill(0)
        pakman.update(gameMap)

        if (pakman.state != 1)
            peanuts.update(gameMap)
        
        gameMap.draw(wallSprites)
        peanuts.draw(pakmanSprites)
        gameManager.drawDeadBackground()

        pakman.draw(pakmanSprites)

        menu.draw(cam, pakman)
        gameManager.deadCam()
    } else {
        background(5, 9, 20)
        title.draw()
    }
}

function keyPressed() {
    pakman.handleInputs(keyCode)
}

function touchStarted() {
    touchHandler.touchStarted()

    if (gameManager.state == 0) {
        gameManager.state = 1
    }

    if (pakman.state == 1) {
        if (
            mouseX - cam.x > menu.contexts.deadButtons.x2 &&
            mouseX - cam.x < menu.contexts.deadButtons.x2 + menu.contexts.deadButtons.w &&
            mouseY - cam.y > menu.contexts.deadButtons.y &&
            mouseY - cam.y < menu.contexts.deadButtons.y + menu.contexts.deadButtons.h
        ) {
            gameManager.restart()
        }

        /* if (
            mouseX - cam.x > menu.contexts.deadButtons.x &&
            mouseX - cam.x < menu.contexts.deadButtons.x + menu.contexts.deadButtons.w &&
            mouseY - cam.y > menu.contexts.deadButtons.y &&
            mouseY - cam.y < menu.contexts.deadButtons.y + menu.contexts.deadButtons.h
        ) {
            
        } */
    }
}

function touchEnded() {
    pakman.nextDirection = touchHandler.touchEnded()
}