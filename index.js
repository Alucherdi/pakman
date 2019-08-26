var map, pakman, wallSprites, pakmanSprites
function setup() {
    createCanvas(windowWidth, windowHeight)    

    map = new Map(32)
    pakman = new Pakman(32, 32, 32)
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

    pakman.update(map)
}


function touchStarted() {
    TouchHandler.touchStarted()
}

function touchEnded() {
    pakman.nextDirection = TouchHandler.touchEnded()
    console.log(pakman.nextDirection)
}