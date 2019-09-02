class TouchHandler {
    constructor() {
        this.init = {}
        this.end = {}
    }

    touchStarted() {
        this.init.x = mouseX
        this.init.y = mouseY
    }

    touchEnded() {
        this.end.x = mouseX
        this.end.y = mouseY
        
        // if vertical difference is bigger than horizontal difference, then move vertical
        if (Math.abs(this.init.y - this.end.y) >= 
            Math.abs(this.init.x - this.end.x)) {
            if (this.init.y < this.end.y) return {x: 0, y: 1}
            if (this.init.y > this.end.y) return {x: 0, y: -1}
        } else {
            if (this.init.x < this.end.x) return {x: 1, y: 0}
            if (this.init.x > this.end.x) return {x: -1, y: 0}
        }

        return {x: 0, y: 0}
    }
}