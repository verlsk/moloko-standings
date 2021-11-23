export class MatchesWrapper {
    constructor(matches, numberOfRounds) {
        this.matches = matches;
        this.numberOfRounds = numberOfRounds;
    }

    addMatch(match) {
        this.matches.push(match);
    }
}