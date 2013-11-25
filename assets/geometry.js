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
            points.push({x: startX, y: endY});
            if (startX == endX && startY == endY) {
                break;
            }
            e2 = 2 * err;
            if (e2 > -dy) {
                err = err - dy;
                startX = startX + sx;
            }
            if (startX == endX && startY == endY) {
                points.push({x: startX, y: endY});
                break;
            }
            if (e2 < dx) {
                err = err + dx;
                startY = startY + sy;
            }
        }

        return points;
    }
};
