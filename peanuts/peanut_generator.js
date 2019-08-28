class PeanutGenerator {
    constructor() {
        this.peanuts = []

        this.generate()
    }
    
    generate() {
        this.peanuts = []
        
        var generationAlternatives = map.dots.filter(_ => {
            var a = _.x - pakman.x
            var b = _.y - pakman.y
            var r = Math.sqrt(
                a * a + b * b
            )

            return r > 300
        })

        var j = 0
        for (var i = 0; i < 6; i++) {
            var pos = generationAlternatives[Math.floor(Math.random() * generationAlternatives.length)]

            this.peanuts.push(new Peanut(
                pos.x, pos.y, 2, j
            ))

            if (this.peanuts.length > 3) j++
        }
    }

    update(map) {
        for (var peanut of this.peanuts) {
            peanut.update(map, this.peanuts)
        }
    }

    draw() {
        for (var peanut of this.peanuts) {
            peanut.draw()
        }
    }
}