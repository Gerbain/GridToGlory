export class Lap {
    constructor(lapNumber, weather) {
        this.lapNumber = lapNumber;
        this.weather = weather;
        this.events = []; // To store events that occur during the lap (e.g., overtakes, crashes)
        this.lapTime = 0; // Placeholder for the lap time, to be calculated
    }

    calculateLapTime(participant, circuit, lapNumber) {
        const baseTime = circuit.baseLapTime;
        const skillImpact = 100 - participant.driver.skill;
        const driverSkillModifier = skillImpact * 0.02;
        const carPerformance = participant.car.speed;
        const carSpeedModifier = (100 - carPerformance) * 0.02;
        const tireWearModifier = participant.car.tireWear * 0.05; // Example: Increase time as tire wears
    
        let weatherModifier;
        switch (this.weather) {
            case 'rainy': weatherModifier = 5; break;
            case 'foggy': weatherModifier = 2; break;
            case 'windy': weatherModifier = 1; break;
            default: weatherModifier = 0;
        }
    
        const variabilityFactor = (Math.random() * 1) - 0.7;
        const fatigueModifier = lapNumber > 50 ? (lapNumber - 50) * 0.02 : 0;
        this.lapTime = baseTime + driverSkillModifier + carSpeedModifier + tireWearModifier + weatherModifier + variabilityFactor + fatigueModifier;
    
        // Ensure lap time doesn't fall below a realistic minimum
        this.lapTime = Math.max(this.lapTime, baseTime * 0.95);
        return this.lapTime;
    }
    
    
}
