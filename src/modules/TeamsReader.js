import { Team } from "../entities/Team";
export const TeamsReader = async () => {
    try {
        const response = await fetch("https://verlsk.github.io/moloko-standings/resources/Equipos.txt");
        const data = (await response.text()).split("\n");
        var teams_list = [];
        for (let t in data) {
            teams_list.push(new Team(data[t]));
        }

        return teams_list;
    } catch (err) {
        console.error(err);
    }

}