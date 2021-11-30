import React, { useEffect, useState } from 'react'
import { Header, Grid, Divider, Icon, Dropdown } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import { Menu } from 'semantic-ui-react'


function Results({matchesWrapper, teamsWrapper}) {

  const [selectedTeam, setSelectedTeam] = useState(["MOLOKO 2.0"]);
  const [dropdownTeams, setDropdownTeams] = useState([]);
  
  const matchesFilter = {
    BY_TEAM: 0,
    BY_ROUND: 1
  }

  useEffect(() => {
    if (dropdownTeams.length === 0) {
      let tmpDropdown = [];
      tmpDropdown.push({
        key: "MOLOKO 2.0",
        text: "MOLOKO 2.0",
        value: "MOLOKO 2.0"
      });
      teamsWrapper.teams.forEach(team => team.name !== "MOLOKO 2.0" && tmpDropdown.push({
        key: team.name,
        text: team.name,
        value: team.name
      }));
      setDropdownTeams(tmpDropdown);
    }
  }, [selectedTeam, dropdownTeams])

  const handleChange = (e, data) => {
    setSelectedTeam(data.value)
  }

  const getGrid = () => {
      let elems = [];
      for (let i = matchesWrapper.numberOfRounds; i > 0; i--) {
        let roundMatches = matchesWrapper.matches.filter(match => match.round === i);
        elems.push(
            <div>
                <Divider style={{marginTop: "2rem", marginBottom: "2rem"}} horizontal>
                    <Header as='h4'>
                        <Icon name='tag' />
                        Jornada {i}
                    </Header>
                </Divider>
                <Grid>
                    {
                        roundMatches.map(({team1, team2, goals1, goals2, date, winner}, index) => 
                            
                            <Grid.Row key={index}>
                                <Grid.Column style={{fontWeight: winner && winner === team1 ? 'bold':'unset'}} width="4">{team1.getName()}</Grid.Column>
                                <Grid.Column width="2">{goals1}</Grid.Column>
                                <Grid.Column width="2">{goals2}</Grid.Column>
                                <Grid.Column style={{fontWeight: winner && winner === team2 ? 'bold':'unset'}} width="4">{team2.getName()}</Grid.Column>
                                <Grid.Column width="4">{date}</Grid.Column>
                            </Grid.Row>   
                        )
                    }
                </Grid>
            </div>
        )
      }
      return elems;
  }

  const getByTeamGrid = () => {
    let elems = [];
    for (let i = 0; i <  selectedTeam.length; i++) {
      let teamMatches = matchesWrapper.matches.filter(match => match.team1.getName() === selectedTeam[i] || match.team2.getName() === selectedTeam[i]);
      teamMatches = teamMatches.reverse();
      elems.push(
          <div>
              <Divider style={{marginTop: "2rem", marginBottom: "2rem"}} horizontal>
                  <Header as='h4'>
                      <Icon name='tag' />
                      {selectedTeam[i]}
                  </Header>
              </Divider>
              <Grid>
                  {
                      teamMatches.map(({team1, team2, goals1, goals2, date, winner}, index) => 
                          
                          <Grid.Row key={index}>
                              <Grid.Column style={{fontWeight: winner && winner === team1 ? 'bold':'unset'}} width="4">{team1.getName()}</Grid.Column>
                              <Grid.Column width="2">{goals1}</Grid.Column>
                              <Grid.Column width="2">{goals2}</Grid.Column>
                              <Grid.Column style={{fontWeight: winner && winner === team2 ? 'bold':'unset'}} width="4">{team2.getName()}</Grid.Column>
                              <Grid.Column width="4">{date}</Grid.Column>
                          </Grid.Row>   
                      )
                  }
              </Grid>
          </div>
      )
    }
    return elems;
}

  const getResultsDisplay = (filter) => {
    if (filter == matchesFilter.BY_ROUND) {
      return (<div>       
          {getGrid()}</div>)
    }
    else if (filter == matchesFilter.BY_TEAM) {
      return (<div>
        {getByTeamGrid()}
      </div>)
    }
  }

  const panes = [
    {   
      menuItem: (
        <Menu.Item key="round" style={{ width: "50%" }}>
          Por jornadas
        </Menu.Item>
      ),
      render: () => 
            <Tab.Pane>
                {getResultsDisplay(matchesFilter.BY_ROUND)}
            </Tab.Pane>
    },
    {
      menuItem: (
        <Menu.Item key="team" style={{ width: "50%" }}>
          Por equipos
        </Menu.Item>
      ),
      render: () => 
      <Tab.Pane>
        <Dropdown placeholder='Equipos' clearable scrolling fluid multiple selection options={dropdownTeams} value={selectedTeam} onChange={handleChange}/>
        {getResultsDisplay(matchesFilter.BY_TEAM)}
      </Tab.Pane>
    }
  ];

  const getResultsView = () => {
    return (
      <Tab panes={panes} />
    )
  }


  return (
    <div>
        <Header style={{marginLeft: "5%", marginTop: "2rem"}}>Resultados</Header>
        {getResultsView()}
    </div>
  )
}

export default Results
