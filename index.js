var map, pakman, wallSprites, pakmanSprites, peanuts
function setup() {
    createCanvas(windowWidth, windowHeight)    

    map = new Map(32)
    pakman = new Pakman(32, 32, 32)
    peanuts = new PeanutGenerator()
}

function preload() {
    wallSprites = loadImage("assets/tiles.png")
    pakmanSprites = loadImage("assets/kk.png")
}

function draw() {
    background(255)
    noStroke()
    
    translate(
        (windowWidth / 2) - pakman.x + (pakman.size),
        (windowHeight / 2) - pakman.y + (pakman.size)
    )

    fill(0)
    map.draw(wallSprites)
    pakman.draw(pakmanSprites)
    peanuts.draw()

    pakman.update(map)
    peanuts.update(map)
}


function touchStarted() {
    TouchHandler.touchStarted()
}

function touchEnded() {
    pakman.nextDirection = TouchHandler.touchEnded()
}