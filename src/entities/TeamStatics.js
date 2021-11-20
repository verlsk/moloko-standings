export class TeamStatics {
    constructor(team) {
        this.team = team;
        this.goals_fav = 0;
        this.goals_against = 0;
        this.ties = 0;
        this.def = 0;
        this.vict = 0;
        this.goals_diff = 0;
        this.points = 0;
    }

    addResult(goals_fav, goals_against) {
        this.goals_fav += goals_fav;
        this.goals_against += goals_against;
        if (goals_fav > goals_against) {
            this.vict++;
        }
        else if (goals_fav < goals_against) {
            this.def++;
        }
        else {
            this.ties++
        }
        this.goals_diff = this.goals_fav - this.goals_against;
        this.points = this.vict*3 + this.ties;
    }
}