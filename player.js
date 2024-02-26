export class Player {
    constructor(playerName, team) {
        this.playerName = playerName;
        this.team = team;
    }

    // Method to update the team's budget
    updateBudget(amount) {
        this.team.budget += amount;
    }

    // Method to update team points
    updatePoints(points) {
        this.team.points += points;
    }

    // Additional methods as needed for gameplay, such as managing races, strategy decisions, etc.
}
