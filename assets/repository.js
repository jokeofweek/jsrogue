// A repository has a name and a constructor. The constructor is used to create
// items in the repository.
Game.Repository = function(name, ctor) {
    this._name = name;
    this._templates = {};
    this._ctor = ctor;
};

// Define a new named template.
Game.Repository.prototype.define = function(name, template) {
    this._templates[name] = template;
};


// Create an object based on a template.
Game.Repository.prototype.create = function(name) {
    // Make sure there is a template with the given name.
    var template = this._templates[name];

    if (!template) {
        throw new Error("No template named '" + name + "' in repository '" +
            this._name + "'");
    }

    // Create the object, passing the template as an argument
    return new this._ctor(template);
};

// Create an object based on a random template
Game.Repository.prototype.createRandom = function() {
    // Pick a random key and create an object based off of it.
    return this.create(Object.keys(this._templates).random());
};