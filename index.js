var map, pakman, wallSprites, pakmanSprites, peanuts
function setup() {
    createCanvas(windowWidth, windowHeight)    

    map = new Map(32)
    pakman = new Pakman(32, 32, 32)
    peanuts = new PeanutGenerator()
}

function preload() {
    wallSprites = loadImage("assets/tiles.png")
    pakmanSprites = loadImage("assets/newsprite.png")
}

function draw() {
    background(20)
    noStroke()
    
    rect(windowWidth / 2, windowHeight / 2 - 10, 1, 100)
    
    translate(
        (windowWidth / 2) - ((9 * map.tileSize) / 2),
        (windowHeight / 2) - pakman.y + (pakman.size)
    )

    fill(0)
    map.draw(wallSprites)
    pakman.draw(pakmanSprites)
    peanuts.draw(pakmanSprites)

    pakman.update(map)
    peanuts.update(map)

    
}

function keyPressed() {
    pakman.handleInputs(keyCode)
}

function touchStarted() {
    TouchHandler.touchStarted()
}

function touchEnded() {
    pakman.nextDirection = TouchHandler.touchEnded()
}