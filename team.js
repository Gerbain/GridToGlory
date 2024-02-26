export class Team {
    constructor(name, budget) {
        this.name = name;
        this.drivers = [];
        this.cars = [];
        this.budget = budget;
        this.points = 0;
        this.upgrades = [];
    }

    addDriver(driver) {
        this.drivers.push(driver);
    }

    addCar(car) {
        this.cars.push(car);
    }

    applyUpgrade(upgrade) {
        this.upgrades.push(upgrade);
        // Deduct the cost of the upgrade from the team's budget
        this.budget -= upgrade.cost;
        // Optionally, apply the upgrade effects to cars or drivers
    }

    updatePoints(points) {
        this.points += points;
    }

    updateBudget(budget){
        this.budget += budget;
    }

    // Additional methods for managing team operations could be added here
}
