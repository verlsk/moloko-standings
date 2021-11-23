import _ from 'lodash'
import './App.css';
import { useEffect, useState } from 'react';
import { TeamsReader } from './modules/TeamsReader';
import { TeamsWrapper } from './entities/TeamsWrapper';
import { MatchesReader } from './modules/MatchesReader';
import { MatchesWrapper } from './entities/MatchesWrapper';
import { StaticsBuilder } from './modules/StaticsBuilder';
import Standings from './modules/StandingsBuilder';
import Results from './modules/ResultsView';


const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Other' },
  { name: 'Ben', age: 70, gender: 'Male' },
]


const App = () => {
  const [stats, setStats] = useState([]);
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [matchesWrapper, setMatchesWrapper] = useState(null);
  let teamsWrapper;

  const loadResources = async () => {
    if (stats.length == 0) {
      teamsWrapper = new TeamsWrapper(await TeamsReader());

      let matchesReaderRes = await MatchesReader(teamsWrapper);
      let numberOfRoundsTmp = matchesReaderRes[1]
      setNumberOfRounds(numberOfRoundsTmp);
      let tmpMatchesReader = new MatchesWrapper(matchesReaderRes[0], numberOfRoundsTmp);

      let tempStats = StaticsBuilder(teamsWrapper, tmpMatchesReader);
      
      tempStats = _.sortBy(tempStats, ['points']).reverse();

      setMatchesWrapper(tmpMatchesReader);
      setStats(tempStats);      
    }
    else {
      console.log(stats); 
      console.log(tableData);
    }
  }
  
  useEffect(()=> {
    
    loadResources();  
  }, [stats, matchesWrapper]);

  const getView = () => {
    if (stats.length != 0 && matchesWrapper != null && numberOfRounds != 0) {
      return (
        <div>
          <Standings tableData={stats}>
          </Standings>
          <Results matchesWrapper={matchesWrapper} numberOfRounds={numberOfRounds}>
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
