export class TeamsWrapper {
    constructor(teams) {
        this.teams = teams;
    }

    getTeamByName(name) {
        for (var i in this.teams) {
            if (this.teams[i].getName() === name) {
                return this.teams[i];
            }
        }
    }
}