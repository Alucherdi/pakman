class TouchHandler {
    static init = {}
    static end = {}

    static touchStarted() {
        TouchHandler.init.x = mouseX
        TouchHandler.init.y = mouseY
    }

    static touchEnded() {
        TouchHandler.end.x = mouseX
        TouchHandler.end.y = mouseY

        // if vertical difference is bigger than horizontal difference, then move vertical
        if (Math.abs(TouchHandler.init.y - TouchHandler.end.y) >= 
            Math.abs(TouchHandler.init.x - TouchHandler.end.x)) {
            if (TouchHandler.init.y < TouchHandler.end.y) return {x: 0, y: 1}
            if (TouchHandler.init.y > TouchHandler.end.y) return {x: 0, y: -1}
        } else {
            if (TouchHandler.init.x < TouchHandler.end.x) return {x: 1, y: 0}
            if (TouchHandler.init.x > TouchHandler.end.x) return {x: -1, y: 0}
        }

        return {x: 0, y: 0}
    }
}