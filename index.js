var map, pakman
function setup() {
    createCanvas(windowWidth, windowHeight)    

    map = new Map()
    pakman = new Pakman(10, 10)
}

function draw() {
    background(255)
    noStroke()

    fill(0)
    map.draw()
    pakman.draw()


    pakman.move()
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        pakman.direction = {x: 1, y: 0}
    }
}