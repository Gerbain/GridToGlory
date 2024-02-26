export function formatRaceTime(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Arrays for name generation
export const brands = ['Mercedes', 'Red Bull', 'McLaren', 'Ferrari', 'Dacia', 'Monster'];
export const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
export const adjectives = ['F1', 'Formula', 'Team', 'Racing', 'Boys Club'];
export const subjects = ['Group', 'Collective', 'Investors', 'Entrepeneurs', 'Lads'];
export const firstNames = [
    'Lewis', 'Max', 'Charles', 'Daniel', 'Lando',
    'Sebastian', 'Fernando', 'Valtteri', 'Sergio', 'Pierre',
    'Esteban', 'Carlos', 'Lance', 'Kevin', 'George',
    'Oscar', 'Yuki', 'Logan', 'Nico', 'Alex'
];

export const lastNames = [
    'Hamilton', 'Verstappen', 'Leclerc', 'Ricciardo', 'Norris',
    'Vettel', 'Alonso', 'Bottas', 'Perez', 'Gasly',
    'Ocon', 'Sainz', 'Stroll', 'Magnussen', 'Russell',
    'Piastri', 'Tsunoda', 'Sargeant', 'Hulkenberg', 'Albon'
];

export const BUDGET_CAP = 1000000; // Example budget cap
export const budgetRanges = {
    "Top 3": { min: 800000, max: BUDGET_CAP },
    "Mid Field": { min: 500000, max: 799999 },
    "Back Field": { min: 300000, max: 499999 }
};
export const raceDetails = [
    { name: "Australian Grand Prix", circuit: "Albert Park Circuit", weather: "Sunny" },
    { name: "Bahrain Grand Prix", circuit: "Bahrain International Circuit", weather: "Night Clear" },
    { name: "Monaco Grand Prix", circuit: "Circuit de Monaco", weather: "Cloudy" },
    { name: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve", weather: "Rainy" },
    { name: "British Grand Prix", circuit: "Silverstone Circuit", weather: "Overcast" },
    { name: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps", weather: "Foggy" },
    { name: "Italian Grand Prix", circuit: "Autodromo Nazionale Monza", weather: "Sunny" },
    { name: "Japanese Grand Prix", circuit: "Suzuka Circuit", weather: "Rainy" },
    { name: "United States Grand Prix", circuit: "Circuit of the Americas", weather: "Windy" },
    { name: "Brazilian Grand Prix", circuit: "Autódromo José Carlos Pace", weather: "Variable" },
    { name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit", weather: "Night Clear" },
    { name: "Abu Dhabi Grand Prix", circuit: "Yas Marina Circuit", weather: "Night Clear" }
];


// Function to generate a random number within a given range
export function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to randomly select an item from an array
export function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to generate a driver's name
export function generateDriverName() {
    return `${randomItem(firstNames)} ${randomItem(lastNames)}`;
}

// Function to generate a team name
export function generateTeamName() {
    const nameParts = [
        randomItem(brands),
        randomItem(colors),
        randomItem(adjectives),
        randomItem(subjects)
    ];

    // Filter out undefined elements if not all arrays are used
    const filteredNameParts = nameParts.filter(Boolean);

    // Select random parts to make a name, ensure at least 2 parts are selected
    const selectedParts = [];
    while (selectedParts.length < 2) {
        const part = randomItem(filteredNameParts);
        if (!selectedParts.includes(part)) {
            selectedParts.push(part);
        }
    }

    return selectedParts.join(' ');
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

export function displayText(text, useTypewriterEffect = true) {
    const outputElement = document.getElementById('text-output');
    if (!outputElement) {
        console.error('Text output element not found!');
        return;
    }

    // Create a new paragraph element to hold the text
    const p = document.createElement('p');
    p.style.whiteSpace = 'pre-wrap'; // Ensure whitespace and newlines are respected

    if (useTypewriterEffect) {
        let i = 0;
        const speed = 50; // Speed in milliseconds

        function typeWriter() {
            if (i < text.length) {
                p.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Automatically scroll to the bottom of the output element
                outputElement.scrollTop = outputElement.scrollHeight;
            }
        }

        typeWriter();
    } else {
        // Append new text to the paragraph element
        p.textContent = text;
    }

    // Append the paragraph element to the output container
    outputElement.appendChild(p);

    // Automatically scroll to the bottom of the output element to ensure the latest message is visible
    outputElement.scrollTop = outputElement.scrollHeight;
}

