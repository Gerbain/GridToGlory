import { Team } from './team.js';
import { Driver } from './driver.js';
import { Car } from './car.js';
import { Calendar } from './calendar.js';
import { Upgrade } from './upgrade.js';
import { Race } from './race.js';
import { Player} from './player.js';
import { Lap } from './lap.js';
import * as utils from './utils.js';
let marketDrivers = [];
let raceCalendar = [];
let currentStep = 0;
let gameState = 'init';
let player = {};
const playerResponses = {
    teamName: '',
    playerName: '',
    teamTier: '',
    driverChoices: []
};
const teamFocuses = [
    { 
        name: "Top 3", 
        skillRange: [90, 100], 
        speedRange: [90, 100], 
        aggressivenessRange: [80, 100],
        consistencyRange: [85, 100],
        racecraftRange: [85, 100],
        teamworkRange: [80, 100]
    },
    { 
        name: "Mid Field", 
        skillRange: [70, 89], 
        speedRange: [70, 89], 
        aggressivenessRange: [60, 79],
        consistencyRange: [65, 84],
        racecraftRange: [65, 84],
        teamworkRange: [60, 79]
    },
    { 
        name: "Back Field", 
        skillRange: [50, 69], 
        speedRange: [50, 69], 
        aggressivenessRange: [40, 59],
        consistencyRange: [45, 64],
        racecraftRange: [45, 64],
        teamworkRange: [40, 59]
    }
];

function generateNPCTeams(amountOfTeams, driversPerTeam) {
    
    let teams = [];

    for (let i = 0; i < amountOfTeams; i++) {
        const focusIndex = i % teamFocuses.length;
        const teamFocus = teamFocuses[focusIndex];
        const teamName = utils.generateTeamName();
        const budget = utils.randomInRange(utils.budgetRanges[teamFocus.name].min, utils.budgetRanges[teamFocus.name].max);
        const newTeam = new Team(teamName, budget);

        for (let j = 0; j < driversPerTeam; j++) {
            const newDriver = generateDriver(teamFocus);
            const newCar = generateCar(teamFocus);
            newTeam.addDriver(newDriver);
            newTeam.addCar(newCar);
        }

        teams.push(newTeam);
    }

    return teams;
}

function generateDriver(teamFocus) {
    const firstName = utils.randomItem(utils.firstNames);
    const lastName = utils.randomItem(utils.lastNames);
    const skill = utils.randomInRange(teamFocus.skillRange[0], teamFocus.skillRange[1]);
    const aggressiveness = utils.randomInRange(teamFocus.aggressivenessRange[0], teamFocus.aggressivenessRange[1]);
    const consistency = utils.randomInRange(teamFocus.consistencyRange[0], teamFocus.consistencyRange[1]);
    const racecraft = utils.randomInRange(teamFocus.racecraftRange[0], teamFocus.racecraftRange[1]);
    const teamwork = utils.randomInRange(teamFocus.teamworkRange[0], teamFocus.teamworkRange[1]);
    const contract = {
        duration: utils.randomInRange(1, 5), // Contract duration between 1 and 5 years
        salary: utils.randomInRange(100000, 500000), // Salary between 100,000 and 500,000
    };
    const basePrice = 500000; // Starting point for driver pricing
    const priceModifiers = (skill + aggressiveness + consistency + racecraft + teamwork - 250) * 1000;
    const price = basePrice + priceModifiers;

    return new Driver(firstName+" "+lastName, skill, aggressiveness, consistency, racecraft, teamwork, price, contract);
}

function generateCar(teamFocus) {
    const speed = utils.randomInRange(teamFocus.speedRange[0], teamFocus.speedRange[1]);
    return new Car(`Car Model ${Math.random().toString(36).substring(7)}`, speed);
}

function generateMarketDrivers(numDrivers) {
    const marketDrivers = [];
    for (let i = 0; i < numDrivers; i++) {
        // Determine if the driver is a rookie or experienced
        const isRookie = Math.random() < 0.5; // 50% chance to be a rookie

        // Define attribute ranges based on experience
        const skillRange = isRookie ? [60, 75] : [76, 90];
        const aggressivenessRange = isRookie ? [50, 70] : [60, 80];
        const consistencyRange = isRookie ? [50, 70] : [70, 90];
        const racecraftRange = isRookie ? [50, 70] : [70, 90];
        const teamworkRange = isRookie ? [50, 70] : [60, 80];

        // Generate attributes within defined ranges
        const skill = utils.randomInRange(...skillRange);
        const aggressiveness = utils.randomInRange(...aggressivenessRange);
        const consistency = utils.randomInRange(...consistencyRange);
        const racecraft = utils.randomInRange(...racecraftRange);
        const teamwork = utils.randomInRange(...teamworkRange);

        // Generate a name for the driver
        const firstName = utils.randomItem(utils.firstNames);
        const lastName = utils.randomItem(utils.lastNames);
        const name = `${firstName} ${lastName}`;

        // Define a contract demand for the driver; rookies generally ask for less
        const salaryDemand = isRookie ? utils.randomInRange(50000, 100000) : utils.randomInRange(100001, 200000);

        const contract = {
            duration: utils.randomInRange(1, 5), // Contract duration between 1 and 5 years
            salary: utils.randomInRange(100000, 500000), // Salary between 100,000 and 500,000
        };

        const basePrice = 100000; // Starting point for driver pricing
        const priceModifiers = (skill + aggressiveness + consistency + racecraft + teamwork - 250) * 1000;
        const price = basePrice + priceModifiers;

        // Create the driver object
        const driver = {
            name,
            skill,
            aggressiveness,
            consistency,
            racecraft,
            teamwork,
            price,
            contract
        };

        // Add the driver to the market
        marketDrivers.push(driver);
    }

    return marketDrivers;
}

function updateScrollingStandings(npcTeams) {
    const scrollingDiv = document.getElementById('scrolling-standings');
    scrollingDiv.innerHTML = ''; // Clear previous content

    // Flatten the array of drivers from all teams and sort by points
    const allDrivers = npcTeams.flatMap(team => team.drivers)
                                 .sort((a, b) => b.points - a.points);

    // Create the standings text
    const standingsText = allDrivers.map((driver, index) => 
        `${index + 1}. ${driver.name} - ${driver.points} points`
    ).join('  •  ');

    const textDiv = document.createElement('div');
    textDiv.textContent = standingsText;
    scrollingDiv.appendChild(textDiv);
}

function populateRaceCalendar(raceCalendar, raceDetails) {
    // Randomize the race order
    utils.shuffleArray(raceDetails);

    // Clear existing races from the calendar if resetting
    raceCalendar.races = [];
    raceCalendar.currentRaceIndex = 0;

    // Add each race to the calendar
    raceDetails.forEach(race => {
        let amountOfLaps = utils.randomInRange(54,78);
        raceCalendar.addRace(new Race(race.name, race.circuit, race.weather, amountOfLaps));
    });
}

function getTeamBudget(teamTier) {
    teamTier = utils.capitalizeFirstLetter(teamTier);
    const budgetRanges = {
        Top: { min: 800000, max: 1000000 },
        Mid: { min: 500000, max: 750000 },
        Back: { min: 300000, max: 450000 }
    };
    const range = budgetRanges[teamTier];

    if (!range) {
        console.error('Invalid team tier specified:', teamTier);
        return 0; // Or a default budget if preferred
    }
    const step = 5000; // Defines the rounding step and ensures even numbers
    let budget = Math.floor(Math.random() * ((range.max - range.min) / step + 1)) * step + range.min;
    budget = Math.round(budget / step) * step;

    return budget;
}


function initializeGame() {
    const teamBudget = getTeamBudget(playerResponses.teamTier);
    const playerTeam = new Team(playerResponses.teamName, teamBudget);
    for (let i = 0; i < 2; i++) {
        const focusIndex = i % teamFocuses.length;
        const teamFocus = teamFocuses[focusIndex];
        const newCar = generateCar(teamFocus);
        playerTeam.addCar(newCar);
    }

    playerResponses.driverChoices.forEach(choiceIndex => {
        const index = choiceIndex - 1; 
        const driver = marketDrivers[index];
        if (driver) {
            playerTeam.addDriver(driver);
            // Mark the driver as selected if you plan to filter them out later
            driver.selected = true;
        }
    });

    // Remove selected drivers from marketDrivers
    marketDrivers = marketDrivers.filter(driver => !driver.selected);

    player = new Player(playerResponses.playerName, playerTeam);
    console.log(player);
}

function processInput(input) {
    switch(currentStep) {
        case 0:
            playerResponses.teamName = input;
            utils.displayText("What is your name?", true);
            break;
        case 1:
            playerResponses.playerName = input;
            utils.displayText("Do you want a Top, Mid, or Back team?", true);
            break;
        case 2:
            playerResponses.teamPreference = input.toLowerCase();
            generatePlayerTeam(playerResponses.teamPreference);
            displayMarketDrivers(); // This now becomes the point where drivers are shown
            break;
        case 3:
            // Process the player's driver selections based on the displayed list
            const selections = input.split(',').map(num => parseInt(num.trim(), 10) - 1); // Adjust for zero-based index
            const selectedDrivers = selections.filter(index => index >= 0 && index < marketDrivers.length)
                                                .map(index => marketDrivers[index]);
            signDriversToPlayerTeam(selectedDrivers);
            utils.displayText("Setup complete! Your journey begins...");
            // Transition to the next phase of your game
            break;
    }
    currentStep++;
}

const questions = [
    "Enter your team name:",
    "Enter your player name:",
    "Do you want a Top, Mid, or Back team? (Type 'Top', 'Mid', or 'Back')",
    "Which two drivers from the market do you want to buy?"
];

function displayMarketDrivers() {
    let driverList = "Available Drivers:\n";
    marketDrivers.forEach((driver, index) => {
        driverList += `${index + 1}: ${driver.name} - Skill: ${driver.skill}, Race: ${driver.racecraft}, Agg: ${driver.aggressiveness}, cnst: ${driver.consistency}, Tmwrk: ${driver.teamwork}\n`;
        driverList += `    Price: €${driver.price} | Contract is ${driver.contract.duration} years for €${driver.contract.salary} per year\n`;
        driverList += ` \n`;
    });
    utils.displayText(driverList, true);
    utils.displayText("Enter the numbers of the two drivers you want to sign, separated by a comma (e.g., '1,2'):", true);
}


// Function to display the next question
function displayNextQuestion() {
    if (currentStep < questions.length) {
        utils.displayText(questions[currentStep], true);
        if(currentStep==3){
            displayMarketDrivers();
        }
    } else {
        // All questions asked, proceed with game initialization
        initializeGame();
        console.log(playerResponses);
    }
}

function handlePlayerResponse(questionIndex, response) {
    // Process the response based on the current question
    switch (questionIndex) {
        case 0:
            playerResponses.teamName = response;
            break;
        case 1:
            playerResponses.playerName = response;
            break;
        case 2:
            playerResponses.teamTier = response;
            break;
        case 3:
            playerResponses.driverChoices = response.split(',').map(num => parseInt(num.trim(), 10));
            break;
        default:
            console.log("Unhandled question index:", questionIndex);
    }
}

function signDriversToPlayerTeam(selectedDrivers) {
    player.team.drivers.push(...selectedDrivers);
}


document.addEventListener('DOMContentLoaded', () => {
    const npcTeams = generateNPCTeams(10, 2);
    console.log(npcTeams);

    marketDrivers = generateMarketDrivers(10);
    console.log(marketDrivers);

    raceCalendar = new Calendar();
    populateRaceCalendar(raceCalendar, utils.raceDetails);
    console.log(raceCalendar);

    let currentRace = raceCalendar.getCurrentRace();
    console.log("Current Race:", currentRace.name, "at", currentRace.circuit);

    let nextRace = raceCalendar.nextRace();
    if (nextRace) {
        console.log("Next Race:", nextRace.name, "at", nextRace.circuit);
    }

    updateScrollingStandings(npcTeams);

    const userInput = document.getElementById('user-input');
    const textOutput = document.getElementById('text-output');

    const scrollToBottom = () => {
        textOutput.scrollTop = textOutput.scrollHeight;
    }

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            textOutput.innerHTML += `<p class="input">-- ${userInput.value}</p>`;

            switch(gameState){
                case 'init':
                    const playerInput = userInput.value;
                    handlePlayerResponse(currentStep, playerInput);
                    currentStep++;
                    displayNextQuestion();
                    break;
                default:
                    console.log('You got off track, buddy.');
            }

            userInput.value = '';
            scrollToBottom();
        }
    });

    displayNextQuestion();
});