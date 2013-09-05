Game.Item = function(properties) {
    properties = properties || {};
    // Call the dynamic glyph's construtor with our set of properties
    Game.DynamicGlyph.call(this, properties);
};
// Make items inherit all the functionality from dynamic glyphs
Game.Item.extend(Game.DynamicGlyph);