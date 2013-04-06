Game.Tile = function(glyph) {
    this._glyph = glyph;
};

Game.Tile.prototype.getGlyph = function() {
    return this._glyph;
};

Game.Tile.nullTile = new Game.Tile(new Game.Glyph());
Game.Tile.floorTile = new Game.Tile(new Game.Glyph('.'));
Game.Tile.wallTile = new Game.Tile(new Game.Glyph('#', 'goldenrod'));