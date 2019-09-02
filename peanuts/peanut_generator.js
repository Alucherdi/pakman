class PeanutGenerator {
    constructor() {
        this.peanuts  = []
        this.powerUps = []

        this.powerUpAppearRate = {
            min: 50, 
            max: 200
        }

        this.powerUpAppearTimer = Math.random() * this.powerUpAppearRate.max + this.powerUpAppearRate.min
 
        this.generate()
    }
    
    generate() {
        this.peanuts = []
        this.powerUps = []
        
        var generationAlternatives = gameMap.dots.filter(_ => {
            var a = _.x - pakman.x
            var b = _.y - pakman.y
            var r = Math.sqrt(
                a * a + b * b
            )

            return r > 100
        })

        for (var i = 0; i < 4; i++) {
            var pos = generationAlternatives[Math.floor(Math.random() * generationAlternatives.length)]

            this.peanuts.push(new Peanut(
                pos.x, pos.y, 1, 0, i
            ))
        }
    }

    update(gameMap) {
        if (this.peanuts.length == 0) gameMap.bridges[gameMap.bridges.length - 1].blocked = false
        else this.addPowerUp(gameMap)
        
        for (var peanut of this.peanuts) {
            peanut.update(gameMap, this.peanuts, this.powerUps)
        }
    }

    addPowerUp(gameMap) {
        if (this.powerUpAppearTimer <= 0) {
            this.powerUpAppearTimer = Math.random() * this.powerUpAppearRate.max + this.powerUpAppearRate.min

            var pos = gameMap.dots[Math.floor(Math.random() * gameMap.dots.length)]
            this.powerUps.push(new PowerUp(
                pos.x,
                pos.y,
                Math.floor(Math.random() * 2 + 1)
            ))
        } else {
            this.powerUpAppearTimer--
        }
    }

    draw(pakmanSprites) {
        for (var powerUp of this.powerUps) {
            powerUp.draw(pakmanSprites)
        }
        
        for (var peanut of this.peanuts) {
            peanut.draw(pakmanSprites)
        }
    }
}