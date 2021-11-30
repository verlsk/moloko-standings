import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Table, Header } from 'semantic-ui-react'


function Standings({tableData }) {
  const [state, dispatch] = React.useState({
    data: tableData   
  })

  const [selectedTeam, setSelectedTeam] = useState("MOLOKO 2.0");
  
  useEffect(() => {

  }, [selectedTeam])

  const { column, data, direction } = state;

  return (
    <div>
      <Header style={{marginLeft: "5%", marginTop: "2rem"}}>Clasificación</Header>    
      <Table celled fixed unstackable striped inverted size='small'>
        <Table.Header>
          <Table.Row>          
            <Table.HeaderCell
              width={5}
              sorted={column === 'team' ? direction : null}
            >
              Equipo
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={column === 'games' ? direction : null}
            >
              J
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={column === 'points' ? direction : null}
            >
              P
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={column === 'vict' ? direction : null}
            >
              V
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={column === 'ties' ? direction : null}
            >
              E
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={column === 'def' ? direction : null}
            >
              D
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              style={{textOverflow: "unset"}}
              sorted={column === 'goals_fav' ? direction : null}
            >
              GF
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              style={{textOverflow: "unset"}}
              sorted={column === 'goals_against' ? direction : null}
            >
              GC
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              style={{textOverflow: "unset"}}
              sorted={column === 'goals_diff' ? direction : null}
            >
              GD
            </Table.HeaderCell>          
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ team, vict, ties, def, goals_fav, goals_against, goals_diff, points, games }) => (
            <Table.Row key={team.name}>
              <Table.Cell style={{textOverflow: "unset", fontWeight: team.name === selectedTeam ? "bold":"unset"}}>
              {team.name}
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
