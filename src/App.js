import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { TeamsReader } from './modules/TeamsReader';
import { TeamsWrapper } from './entities/TeamsWrapper';
import { MatchesReader } from './modules/MatchesReader';
import { MatchesWrapper } from './entities/MatchesWrapper';
import { StaticsBuilder } from './modules/StaticsBuilder';

const App = () => {
  let teamsWrapper, matchesWrapper, stats;

  const loadResources = async () => {
    teamsWrapper = new TeamsWrapper(await TeamsReader());
    matchesWrapper = new MatchesWrapper(await MatchesReader(teamsWrapper));
    stats = StaticsBuilder(teamsWrapper, matchesWrapper);
    console.log(stats); 
  }
  
  useEffect(()=> {
    loadResources();  
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
