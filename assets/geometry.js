Game.Geometry = {
    getLine: function(startX, startY, endX, endY) {
        var points = [];
        var dx = Math.abs(endX - startX);
        var dy = Math.abs(endY - startY);
        var sx = (startX < endX) ? 1 : -1;
        var sy = (startY < endY) ? 1 : -1;
        var err = dx - dy;
        var e2;

        while (true) {
            points.push({x: startX, y: startY});
            if (startX == endX && startY == endY) {
                break;
            }
            e2 = err * 2;
            if (e2 > -dx) {
                err -= dy;
                startX += sx;
            }
            if (e2 < dx){
                err += dx;
                startY += sy;
            }
        }

        return points;
    }
};
