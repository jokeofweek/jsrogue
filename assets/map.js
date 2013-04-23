Game.Map = function(tiles, player) {
    this._tiles = tiles;
    // cache the width and height based
    // on the length of the dimensions of
    // the tiles array
    this._width = tiles.length;
    this._height = tiles[0].length;
    // create a list which will hold the entities
    this._entities = [];
    // create the engine and scheduler
    this._scheduler = new ROT.Scheduler.Simple();
    this._engine = new ROT.Engine(this._scheduler);
    // add the player
    this.addEntityAtRandomPosition(player);
    // add random fungi
    for (var i = 0; i < 1000; i++) {
        this.addEntityAtRandomPosition(new Game.Entity(Game.FungusTemplate));
    }
};

// Standard getters
Game.Map.prototype.getWidth = function() {
    return this._width;
};
Game.Map.prototype.getHeight = function() {
    return this._height;
};

// Gets the tile for a given coordinate set
Game.Map.prototype.getTile = function(x, y) {
    // Make sure we are inside the bounds. If we aren't, return
    // null tile.
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
        return Game.Tile.nullTile;
    } else {
        return this._tiles[x][y] || Game.Tile.nullTile;
    }
};

Game.Map.prototype.dig = function(x, y) {
    // If the tile is diggable, update it to a floor
    if (this.getTile(x, y).isDiggable()) {
        this._tiles[x][y] = Game.Tile.floorTile;
    }
}

Game.Map.prototype.getRandomFloorPosition = function() {
    // Randomly generate a tile which is a floor
    var x, y;
    do {
        x = Math.floor(Math.random() * this._width);
        y = Math.floor(Math.random() * this._width);
    } while(this.getTile(x, y) != Game.Tile.floorTile ||
            this.getEntityAt(x, y));
    return {x: x, y: y};
}

Game.Map.prototype.getEngine = function() {
    return this._engine;
}
Game.Map.prototype.getEntities = function() {
    return this._entities;
}
Game.Map.prototype.getEntityAt = function(x, y){
    // Iterate through all entities searching for one with
    // matching position
    for (var i = 0; i < this._entities.length; i++) {
        if (this._entities[i].getX() == x && this._entities[i].getY() == y) {
            return this._entities[i];
        }
    }
    return false;
}

Game.Map.prototype.addEntity = function(entity) {
    // Make sure the entity's position is within bounds
    if (entity.getX() < 0 || entity.getX() >= this._width ||
        entity.getY() < 0 || entity.getY() >= this._height) {
        throw new Error('Adding entity out of bounds.');
    }
    // Update the entity's map
    entity.setMap(this);
    // Add the entity to the list of entities
    this._entities.push(entity);
    // Check if this entity is an actor, and if so add
    // them to the scheduler
    if (entity.hasMixin('Actor')) {
       this._scheduler.add(entity, true);
    }
}

Game.Map.prototype.addEntityAtRandomPosition = function(entity) {
    var position = this.getRandomFloorPosition();
    entity.setX(position.x);
    entity.setY(position.y);
    this.addEntity(entity);
}
