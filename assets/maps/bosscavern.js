Game.Map.BossCavern = function() {
    // Call the Map constructor
    Game.Map.call(this, this._generateTiles(80, 24));
    // Create the giant zombie
    this.addEntityAtRandomPosition(Game.EntityRepository.create('giant zombie'), 0);
};
Game.Map.BossCavern.extend(Game.Map);

Game.Map.BossCavern.prototype._fillCircle = function(tiles, centerX, centerY, radius, tile) {
    // Copied from the DrawFilledCircle algorithm
    // http://stackoverflow.com/questions/1201200/fast-algorithm-for-drawing-filled-circles
    var x = radius;
    var y = 0;
    var xChange = 1 - (radius << 1);
    var yChange = 0;
    var radiusError = 0;

    while (x >= y) {    
        for (var i = centerX - x; i <= centerX + x; i++) {
            tiles[i][centerY + y] = tile;
            tiles[i][centerY - y] = tile;
        }
        for (var i = centerX - y; i <= centerX + y; i++) {
            tiles[i][centerY + x] = tile;
            tiles[i][centerY - x] = tile;   
        }

        y++;
        radiusError += yChange;
        yChange += 2;
        if (((radiusError << 1) + xChange) > 0) {
            x--;
            radiusError += xChange;
            xChange += 2;
        }
    }
};

Game.Map.BossCavern.prototype._generateTiles = function(width, height) {
    // First we create an array, filling it with empty tiles.
    var tiles = new Array(width);
    for (var x = 0; x < width; x++) {
        tiles[x] = new Array(height);
        for (var y = 0; y < height; y++) {
            tiles[x][y] = Game.Tile.wallTile;
        }
    }
    // Now we determine the radius of the cave to carve out.
    var radius = (Math.min(width, height) - 2) / 2;
    this._fillCircle(tiles, width / 2, height / 2, radius, Game.Tile.floorTile);

    // Now we randomly position lakes (3 - 6 lakes)
    var lakes = Math.round(Math.random() * 3) + 3;
    var maxRadius = 2;
    for (var i = 0; i < lakes; i++) {
        // Random position, taking into consideration the radius to make sure
        // we are within the bounds.
        var centerX = Math.floor(Math.random() * (width - (maxRadius * 2)));
        var centerY = Math.floor(Math.random() * (height - (maxRadius * 2)));
        centerX += maxRadius;
        centerY += maxRadius;
        // Random radius
        var radius = Math.floor(Math.random() * maxRadius) + 1;
        // Position the lake!
        this._fillCircle(tiles, centerX, centerY, radius, Game.Tile.waterTile);
    }

    // Return the tiles in an array as we only have 1 depth level.
    return [tiles];
};

Game.Map.BossCavern.prototype.addEntity = function(entity) {
    // Call super method.
    Game.Map.prototype.addEntity.call(this, entity);
    // If it's a player, place at random position
    if (this.getPlayer() === entity) {
        var position = this.getRandomFloorPosition(0);
        entity.setPosition(position.x, position.y, 0);
        // Start the engine!
        this.getEngine().start();
    }
};