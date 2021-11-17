export class MatchesWrapper {
    constructor(matches) {
        this.matches = matches;
    }

    addMatch(match) {
        this.matches.push(match);
    }
}