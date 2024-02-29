export class Driver {
    constructor(name, skill, aggressiveness, consistency, racecraft, teamwork, price, contract) {
        this.name = name;
        this.skill = skill;
        this.aggressiveness = aggressiveness;
        this.consistency = consistency;
        this.racecraft = racecraft;
        this.teamwork = teamwork;
        this.price = price; // Upfront cost to sign the driver
        this.contract = contract; 
        this.points = 0;
    }

    updatePoints(points) {
        this.points += points;
    }

    // Method to renegotiate or update contract terms
    renegotiateContract(newTerms) {
        this.contract = { ...this.contract, ...newTerms };
    }

    // Example method, adjust according to your actual implementation
    displayInfo() {
        console.log(`Driver Name: ${this.name}, Skill: ${this.skill}, Contract Duration: ${this.contract.duration}, Salary: ${this.contract.salary}`);
    }

    calculateFatigue(lapNumber) {
        // Simple fatigue model: slight increase in lap times after a certain lap
        return lapNumber > 50 ? (lapNumber - 50) * 0.1 : 0; // Example: 0.1 seconds added per lap after 50 laps
    }
}
