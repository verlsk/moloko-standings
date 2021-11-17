export class Match {
    constructor(team1, team2, goals1, goals2, round, date) {
        this.team1 = team1;
        this.team2 = team2;
        this.goals1 = goals1;
        this.goals2 = goals2;
        this.round = round;
        this.date = date;
    }

    getResult() {
        return this.team1.getName() + " " + this.goals1 + " - " + this.goals2 + " " + this.team2.getName();
    }

    getRound() {
        return this.round;
    }

    getTeams() {
        return [this.team1, this.team2];
    }

    getGoals() {
        return [this.goals1, this.goals2];
    }

}