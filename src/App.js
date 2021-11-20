import _ from 'lodash'
import './App.css';
import { useEffect, useState } from 'react';
import { TeamsReader } from './modules/TeamsReader';
import { TeamsWrapper } from './entities/TeamsWrapper';
import { MatchesReader } from './modules/MatchesReader';
import { MatchesWrapper } from './entities/MatchesWrapper';
import { StaticsBuilder } from './modules/StaticsBuilder';
import Standings from './modules/StandingsBuilder';


const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Other' },
  { name: 'Ben', age: 70, gender: 'Male' },
]


const App = () => {
  const [stats, setStats] = useState([]);
  let teamsWrapper, matchesWrapper;

  const loadResources = async () => {
    if (stats.length == 0) {
      teamsWrapper = new TeamsWrapper(await TeamsReader());
      matchesWrapper = new MatchesWrapper(await MatchesReader(teamsWrapper));
      let tempStats = StaticsBuilder(teamsWrapper, matchesWrapper);
      tempStats = _.sortBy(tempStats, ['points']).reverse();
      setStats(tempStats);      
    }
    else {
      console.log(stats); 
      console.log(tableData);
    }
  }
  
  useEffect(()=> {
    
    loadResources();  
  }, [stats]);

  const getView = () => {
    if (stats.length != 0) {
      return (
      <Standings tableData={stats}>
      </Standings>
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
