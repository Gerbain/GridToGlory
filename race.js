import { Lap } from './lap.js';
import * as utils from './utils.js';

export class Race {
    constructor(name, circuit, weather, amountOfLaps, baseLapTime) {
        this.name = name;
        this.circuit = circuit;
        this.baseLapTime = baseLapTime;
        this.weather = weather;
        this.amountOfLaps = amountOfLaps;
        this.participants = []; // Participants should include both driver and car information
        this.laps = [];
    }

    updateWeather() {
        const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Foggy', 'Windy', 'Night Clear'];
        // Randomly change weather, or follow a predefined pattern
        this.weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    }

    simulateOvertaking() {
        // Example simplistic approach: compare speed and skill to determine overtaking
        for (let i = 1; i < this.participants.length; i++) {
            const overtakingChance = this.participants[i].car.speed + this.participants[i].driver.skill -
                                     (this.participants[i - 1].car.speed + this.participants[i - 1].driver.skill);
            if (overtakingChance > 10) { // Arbitrary threshold for successful overtake
                // Swap positions
                [this.participants[i], this.participants[i - 1]] = [this.participants[i - 1], this.participants[i]];
            }
        }
    }

    updateWeatherEveryFewLaps() {
        // Example: Change weather every 10 laps
        if (this.laps.length % 10 === 0) {
            this.updateWeather(); // Assuming updateWeather method randomly changes the race's weather
        }
    }

    checkAndExecutePitStops() {
        this.participants.forEach(driver => {
            // Simplified logic for deciding on a pit stop
            if (driver.needsPitStop) { // Assuming drivers have a method or property to determine this
                driver.executePitStop(); // Drivers handle their own pit stop logic
                // Add time for pit stop, adjust based on your game's rules
                driver.totalTime += 20; // Example pit stop time penalty
            }
        });
    }

    simulateQualifying(circuit) {
        this.participants.forEach(participant => {
            const qualifyingLap = new Lap(1, this.weather); // Assuming Lap class has been updated to use Driver directly
            qualifyingLap.calculateLapTime(participant, circuit, 1);
            participant.fastestLap = qualifyingLap.lapTime;
        });

        this.participants.sort((a, b) => a.fastestLap - b.fastestLap);
    }

    displayQualifyingResults() {
        utils.displayText("Qualifying Results:\n");
    
        this.participants.forEach((participant, index) => {
            const position = index + 1; // Position in the qualifying
            const driverName = participant.driver.name; // Assuming participant structure includes driver with a name
            const fastestLap = participant.fastestLap.toFixed(3); // Format for readability
    
            utils.displayText(`${position}. ${driverName} - Fastest Lap: ${fastestLap} seconds`);
        });
    }

    simulateRace(circuit) {
        for (let lap = 1; lap <= this.amountOfLaps; lap++) {
            this.updateWeatherEveryFewLaps(lap); // If implementing dynamic weather changes
            this.participants.forEach(participant => {
                console.log(circuit);
                participant.lapTimes.push(this.calculateLapTime(participant, circuit, lap));
                // Update tire wear and possibly consider pit stop logic
                driparticipantver.car.tireWear += 1; // Simplify tire wear increment
                // Potentially check for pit stops
            });
            // Sort by total time or implement overtaking logic here
        }
    }

    /*addParticipant(driver, car) {
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
    }*/
}
