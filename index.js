var map, pakman
function setup() {
    createCanvas(windowWidth, windowHeight)    

    map = new Map(16)
    pakman = new Pakman(16, 16, 10)
}

function draw() {
    background(255)
    noStroke()

    translate(
        (windowWidth / 2) - pakman.x + (pakman.size),
        (windowHeight / 2) - pakman.y + (pakman.size)
    )

    fill(0)
    map.draw()
    pakman.draw()


    pakman.move(map)
}

function keyPressed() {
    pakman.handleInputs(keyCode)
}