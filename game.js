import * as utils from './utils.js';
import { Player} from './player.js';

export function atTheFactory(){
    let optionText = `Welcome at the factory.\n`;
        optionText += `What do you want to do?\n`;
        optionText += `\n`;
        optionText += `[upgrades] - Meet with your Chief Technical Engineer\n`;
        optionText += `[drivers] - Catch up with Human Resources\n`;
        optionText += `[finance] - Break down numbers with your Chief Finance Officer\n`;

    utils.displayText(optionText);
}

export function atTheFactory_Finances(gameData){
    let optionTextFinance = `Here's an overview of our finances at the moment:\n`;
        optionTextFinance += `\n`;
    utils.displayText(optionTextFinance);
    gameData.player.displayFinanceOverview();
}

export function summarizeFinanceState(financeHistory, currentBudget) {
    const recentNetEffect = financeHistory.slice(-10).reduce((acc, {amount}) => acc + amount, 0);
    return recentNetEffect === 0 ? "Finances are stable" :
           recentNetEffect > 0 ? "Finances have improved" :
           "Been spending more than earning";
}

export function handleAtTheFactoryOption(input, gameData){

    switch(input){
        case 'upgrades':
            
            break;
        case 'drivers':

            break;
        case 'finance':
            atTheFactory_Finances(gameData);
            break;
        default:
            atTheFactory();
    }

}