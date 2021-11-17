import { TeamStatics } from "../entities/TeamStatics";

export const StaticsBuilder = (teamsWrapper, matchesWrapper) => {
    const mapTeams = new Map();
    for (var i in teamsWrapper.teams) {
        mapTeams.set(teamsWrapper.teams[i].getName(), new TeamStatics(teamsWrapper.teams[i]))
    }

    for (var j in matchesWrapper.matches) {    
        let match = matchesWrapper.matches[j];
        if (teamsWrapper.teams.includes(match.team1)) {
            let stats = mapTeams.get(match.team1.getName());
            stats.addResult(match.goals1, match.goals2);
            mapTeams.set(match.team1.getName(), stats);
        }
        if (teamsWrapper.teams.includes(match.team2)) {
            let stats = mapTeams.get(match.team2.getName());
            stats.addResult(match.goals2, match.goals1);
            mapTeams.set(match.team2.getName(), stats);
        }
    }

    return mapTeams;
}