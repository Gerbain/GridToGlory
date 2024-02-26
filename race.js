export class Race {
    constructor(name, circuit, weather, amountOfLaps) {
        this.name = name;
        this.circuit = circuit;
        this.weather = weather;
        this.amountOfLaps = amountOfLaps;
        this.participants = []; // Participants should include both driver and car information
        this.laps = [];
    }

    addParticipant(driver, car) {
        this.participants.push({ driver, car, totalRaceTime: 0 });
    }

    updateWeatherConditions() {
        // Simplified example, you might want to make this more complex
        const weatherTypes = ['sunny', 'cloudy', 'rainy'];
        this.weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    }

    processRandomEvents(lap, participant) {
        // Implement random events like mechanical failures, safety cars, etc.
        if (Math.random() < 0.05) { // 5% chance for a random event, adjust as needed
            const eventTimePenalty = 20; // Example time penalty in seconds
            lap.addEvent({ type: 'mechanicalFailure', details: `${participant.driver.name} experiences a car issue.` });
            participant.totalRaceTime += eventTimePenalty;
        }
    }

    processStrategyDecisions(lap, participant) {
        // Example strategy decision: pit stop
        // This is a placeholder logic. You'll need to flesh this out based on your game's mechanics.
        const shouldPit = Math.random() < 0.1; // 10% chance on any given lap, adjust as needed
        if (shouldPit) {
            const pitTimePenalty = 25; // Example pit stop time in seconds
            lap.addEvent({ type: 'pitStop', details: `${participant.driver.name} makes a pit stop.` });
            participant.totalRaceTime += pitTimePenalty;
        }
    }

    calculateLapTimes() {
        this.participants.forEach(participant => {
            // Placeholder for actual lap time calculation logic
            const baseLapTime = 80; // Base lap time in seconds, adjust based on circuit
            const variability = (Math.random() * 5) - 2.5; // Adding some randomness
            const lapTime = baseLapTime + variability - participant.driver.skill * 0.1;
            participant.totalRaceTime += lapTime;
        });
    }

    simulateRace() {
        const totalLaps = this.amountOfLaps;
        for (let lapNumber = 1; lapNumber <= totalLaps; lapNumber++) {
            let lap = { lapNumber, events: [] };
            this.calculateLapTimes();
            this.participants.forEach(participant => {
                this.processRandomEvents(lap, participant);
                this.processStrategyDecisions(lap, participant);
            });
            if (lapNumber % 5 === 0) {
                this.updateWeatherConditions();
            }
            this.laps.push(lap);
        }

        this.calculateFinalResults();
    }

    calculateFinalResults() {
        // Sort participants by total race time to determine final positions
        this.participants.sort((a, b) => a.totalRaceTime - b.totalRaceTime);
        // Display or process final results
        this.participants.forEach((participant, index) => {
            console.log(`${index + 1}: ${participant.driver.name}, Total Time: ${participant.totalRaceTime.toFixed(2)} seconds`);
        });
    }
}