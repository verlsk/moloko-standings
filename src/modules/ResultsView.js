import React, { useEffect, useState } from 'react'
import { Header, Grid, Divider, Icon } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'
import { Menu } from 'semantic-ui-react'

function Results({matchesWrapper}) {

  const [selectedTeam, setSelectedTeam] = useState("MOLOKO 2.0");
  
  useEffect(() => {

  }, [selectedTeam])

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
  const getResultsDisplay = () => {
    return (<div>       
        {getGrid()}</div>)
  }

  const panes = [
    {   
      menuItem: (
        <Menu.Item key="round" style={{ width: "50%" }}>
          Por rondas
        </Menu.Item>
      ),
      render: () => 
            <Tab.Pane>
                {getResultsDisplay()}
            </Tab.Pane>
    },
    {
      menuItem: (
        <Menu.Item key="team" style={{ width: "50%" }}>
          Por equipos
        </Menu.Item>
      ),
      render: () => <Tab.Pane>Por equipos</Tab.Pane>
    }
  ];

  const getResultsView = () => {
    return (
      <Tab panes={panes} />
    )
  }


  return (
    <div>
        <Header style={{marginLeft: "5%"}}>Resultados</Header>
        {getResultsView()}
    </div>
  )
}

export default Results
