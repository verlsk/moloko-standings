export class MatchesWrapper {
    constructor(matches, numberOfRounds) {
        this.matches = matches;
        this.numberOfRounds = numberOfRounds;
    }

    addMatch(match) {
        this.matches.push(match);
    }

    getGoalsAgainst(team1, team2) {
        let matches_together = this.matches.filter(match => (match.team1.getName() === team1 && match.team2.getName() === team2) ||
                                                            (match.team2.getName() === team1 && match.team1.getName() === team2));

        let team1Goals = 0, team2Goals = 0;

        for (let m of matches_together) {
            if (m.team1.getName() === team1) {
                team1Goals += m.goals1;
                team2Goals += m.goals2;
            }
            else {
                team1Goals += m.goals2;
                team2Goals += m.goals1;
            }
        }

        return [team1Goals, team2Goals] 
    }
}