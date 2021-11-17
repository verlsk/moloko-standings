import { Match } from "../entities/Match";
import { RoundsList } from "../entities/RoundsList";

export const MatchesReader = async (teamsWrapper) => {
    try {
        var matches = [];
        for (var i in RoundsList) {
            let fileName = RoundsList[i];
            let name = "https://verlsk.github.io/moloko-standings/resources/" + fileName;
            const response = await fetch(name);
            const data = (await response.text()).split("\n");
            
            var round = 0;
            var date = 0;
            for (let t in data) {
                var line = data[t];
                if (t === "0") {
                    round = line.split(" ")[1];
                    date = line.split(" ")[2].split("(")[1].split(")")[0];
                }
                else {
                    var line_array = line.split("\t");
                    var team1 = teamsWrapper.getTeamByName(line_array[1]);
                    var team2 = teamsWrapper.getTeamByName(line_array[2]);
                    var goals1 = line_array[3];
                    var goals2 = line_array[5];
                    matches.push(new Match(team1, team2, goals1, goals2, round, date));
                }
            }
        }
        

        return matches;

    } catch (err) {
        console.error(err);
    }

}