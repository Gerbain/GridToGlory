import * as utils from './utils.js';

export class Player {
    constructor() {
        this.playerName = "";
        this.team = null;
        this.financeHistory = [];
    }

    setPlayerName(name) {
        this.playerName = name;
    }

    setTeam(team) {
        this.team = team;
    }

    recordTransaction(description, amount) {
        const transaction = {
            date: new Date(),
            description,
            amount
        };
        this.financeHistory.push(transaction);
        this.team.updateBudget(this.team.budget + amount);
    }

    summarizeFinanceState(financeHistory, currentBudget) {
        const recentNetEffect = financeHistory.slice(-10).reduce((acc, {amount}) => acc + amount, 0);
        return recentNetEffect === 0 ? "Finances are stable" :
               recentNetEffect > 0 ? "Finances have improved" :
               "Been spending more than earning";
    }

    displayFinanceOverview() {
        utils.displayText(`Current Budget: $${this.team.budget.toLocaleString()}`);

        const recentTransactions = this.financeHistory.slice(-10);
        if (recentTransactions.length > 0) {
            utils.displayText("Last 10 Transactions:");
            recentTransactions.forEach(transaction => {
                const dateStr = transaction.date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
                const amountStr = transaction.amount >= 0 ? `+${transaction.amount.toLocaleString()}` : `${transaction.amount.toLocaleString()}`;
                utils.displayText(`${dateStr}: ${transaction.description} - $${amountStr}`);
            });
        } else {
            utils.displayText("No recent transactions.");
        }

        utils.displayText(summarizeFinanceState(this.financeHistory, this.team.budget));

    }

}
