import _ from 'lodash'
import './App.css';
import { useEffect, useState } from 'react';
import { TeamsReader } from '../modules/TeamsReader';
import { TeamsWrapper } from '../entities/TeamsWrapper';
import { MatchesReader } from '../modules/MatchesReader';
import { MatchesWrapper } from '../entities/MatchesWrapper';
import { StaticsBuilder } from '../modules/StaticsBuilder';
import Standings from './StandingsBuilder';
import Results from './ResultsView';


const App = () => {
  const [stats, setStats] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [matchesWrapper, setMatchesWrapper] = useState(null);
  const [teamsWrapper, setTeamsWrapper] = useState(null);

  
  
  useEffect(()=> {
    const loadResources = async () => {
      if (stats.length === 0) {
        if (teamsWrapper == null)
          setTeamsWrapper(new TeamsWrapper(await TeamsReader()));
        else {
          let matchesReaderRes = await MatchesReader(teamsWrapper);
          let numberOfRoundsTmp = matchesReaderRes[1]
          setNumberOfRounds(numberOfRoundsTmp);
          let tmpMatchesReader = new MatchesWrapper(matchesReaderRes[0], numberOfRoundsTmp);
          let tempStats = StaticsBuilder(teamsWrapper, tmpMatchesReader);
          tempStats = _.sortBy(tempStats, ['points']).sort((a, b) => {
            if (a.points - b.points !== 0) {
              return a.points - b.points;
            }
            let goalsAgainst = tmpMatchesReader.getGoalsAgainst(a, b);
            let goalDiff = goalsAgainst[0] - goalsAgainst[1];
            if (goalDiff !== 0) {
              return goalDiff;
            }
            else {
              return a.goals_diff - b.goals_diff;
            }
          }).reverse();
  
          setMatchesWrapper(tmpMatchesReader);
          setStats(tempStats);      
        }      
      }
    }
    loadResources();  
  }, [stats, matchesWrapper, teamsWrapper]);

  const getView = () => {
    if (stats.length !== 0 && matchesWrapper != null && numberOfRounds !== 0) {
      return (
        <div>
          <Standings tableData={stats}>
          </Standings>
          <Results matchesWrapper={matchesWrapper} numberOfRounds={numberOfRounds} teamsWrapper={teamsWrapper}>
          </Results>
        </div>
        )
    }
    else {
      return null;
    }
  }
  return (
  
    <div>
      {getView()}
    </div>
    
  );
}

export default App;
