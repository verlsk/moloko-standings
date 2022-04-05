import React, { useEffect, useState } from 'react'
import { Table, Header } from 'semantic-ui-react'


function Standings({tableData }) {
  const [selectedTeam, setSelectedTeam] = useState("MOLOKO 2.0");
  
  useEffect(() => {
    setSelectedTeam("MOLOKO 2.0");
  }, [selectedTeam])

  const data = tableData;

  const getImage = (teamName) => {
    if (teamName === "MOLOKO 2.0") {
      return (
        <img style={{width: "auto", height: "5vw", marginLeft: "1rem"}} src="https://verlsk.github.io/moloko-standings/resources/giphy.gif"/>
      )
    }
  }

  return (
    <div>
      <Header style={{marginLeft: "5%", marginTop: "2rem"}}>Clasificación</Header>    
      <Table celled fixed unstackable striped inverted size='small'>
        <Table.Header>
          <Table.Row>          
            <Table.HeaderCell
              width={5}
            >
              Equipo
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
            >
              J
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
            >
              P
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
            >
              V
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
            >
              E
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
            >
              D
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              style={{textOverflow: "unset"}}
            >
              GF
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              style={{textOverflow: "unset"}}
            >
              GC
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              style={{textOverflow: "unset"}}
            >
              GD
            </Table.HeaderCell>          
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ team, vict, ties, def, goals_fav, goals_against, goals_diff, points, games }) => (
            <Table.Row key={team.name}>
              <Table.Cell style={{textOverflow: "unset", fontWeight: team.name === selectedTeam ? "bold":"unset", alignItems: "center", display: "flex"}}>
              {team.name}
              {getImage(team.name)}              
              </Table.Cell>        
              <Table.Cell style={{textOverflow: "unset"}}>{games}</Table.Cell>
              <Table.Cell style={{textOverflow: "unset"}}>{points}</Table.Cell>
              <Table.Cell style={{textOverflow: "unset"}}>{vict}</Table.Cell>
              <Table.Cell style={{textOverflow: "unset"}}>{ties}</Table.Cell>
              <Table.Cell style={{textOverflow: "unset"}}>{def}</Table.Cell>
              <Table.Cell style={{textOverflow: "unset"}}>{goals_fav}</Table.Cell>
              <Table.Cell style={{textOverflow: "unset"}}>{goals_against}</Table.Cell>
              <Table.Cell style={{textOverflow: "unset"}}>{goals_diff}</Table.Cell>            
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Standings
