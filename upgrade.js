export class Upgrade {
    constructor(name, cost, effects) {
        this.name = name;
        this.cost = cost;
        // Effects is an object that could include any number of properties
        // such as speedEffect, reliabilityEffect, etc.
        this.effects = effects;
    }
}
