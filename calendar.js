export class Calendar {
    constructor() {
        this.races = [];
        this.currentRaceIndex = 0; // Tracks the current race within the season
    }

    addRace(race) {
        this.races.push(race);
    }

    nextRace() {
        if (this.currentRaceIndex < this.races.length - 1) {
            this.currentRaceIndex++;
            return this.races[this.currentRaceIndex];
        } else {
            console.log("End of the season reached.");
            return null; // Indicate the season is over or loop back for a new season
        }
    }

    getCurrentRace() {
        return this.races[this.currentRaceIndex];
    }

    // Optionally, implement a method to go back to the previous race (not typical for progressing through a season but can be useful for reviews or adjustments)
    previousRace() {
        if (this.currentRaceIndex > 0) {
            this.currentRaceIndex--;
            return this.races[this.currentRaceIndex];
        } else {
            console.log("Already at the start of the season.");
            return null; // Indicate the beginning of the season
        }
    }

    // Additional methods as needed, such as resetSeason, getRaceByDate, etc.
}
