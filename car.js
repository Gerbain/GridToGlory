export class Car {
    constructor(model, speed, reliability, aerodynamics, enginePower, fuelEfficiency, tireWear) {
        this.model = model;
        this.speed = speed;
        this.reliability = reliability;
        this.aerodynamics = aerodynamics;
        this.enginePower = enginePower;
        this.fuelEfficiency = fuelEfficiency;
        this.tireWear = tireWear;
        this.upgrades = [];
    }

    applyUpgrade(upgrade) {
        this.upgrades.push(upgrade);
        // Apply the upgrade effects to the car's stats
        this.speed += upgrade.speedEffect || 0;
        this.reliability += upgrade.reliabilityEffect || 0;
        this.aerodynamics += upgrade.aeroEffect || 0;
        this.enginePower += upgrade.enginePowerEffect || 0;
        this.fuelEfficiency += upgrade.fuelEfficiencyEffect || 0;
        this.tireWear += upgrade.tireWearEffect || 0;
    }

    applyUpgrade2(upgrade) {
        this.upgrades.push(upgrade);
        // Loop through each effect in the upgrade and apply it to the car
        for (const effect in upgrade.effects) {
            if (this[effect] !== undefined) { // Check if the car has this property
                this[effect] += upgrade.effects[effect];
            }
        }
    }
}
