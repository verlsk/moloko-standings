import _ from 'lodash'
import React from 'react'
import { Table } from 'semantic-ui-react'


function exampleReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
      }
    default:
      throw new Error()
  }
}

function TableExampleSortable({tableData}) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  })

  const { column, data, direction } = state

  return (
    <Table sortable celled fixed unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            width={5}
            sorted={column === 'team' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'team' })}
          >
            Equipo
          </Table.HeaderCell>
          <Table.HeaderCell
            width={2}
            sorted={column === 'vict' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'vict' })}
          >
            V
          </Table.HeaderCell>
          <Table.HeaderCell
            width={2}
            sorted={column === 'ties' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'ties' })}
          >
            E
          </Table.HeaderCell>
          <Table.HeaderCell
            width={2}
            sorted={column === 'def' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'def' })}
          >
            D
          </Table.HeaderCell>
          <Table.HeaderCell
            width={2}
            sorted={column === 'goals_fav' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'goals_fav' })}
          >
            GF
          </Table.HeaderCell>
          <Table.HeaderCell
            width={2}
            sorted={column === 'goals_against' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'goals_against' })}
          >
            GC
          </Table.HeaderCell>
          <Table.HeaderCell
            width={2}
            sorted={column === 'goals_diff' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'goals_diff' })}
          >
            GD
          </Table.HeaderCell>
          <Table.HeaderCell
            width={2}
            sorted={column === 'points' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'points' })}
          >
            P
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ team, vict, ties, def, goals_fav, goals_against, goals_diff, points }) => (
          <Table.Row key={team.name}>
            <Table.Cell>{team.name}</Table.Cell>
            <Table.Cell>{vict}</Table.Cell>
            <Table.Cell>{ties}</Table.Cell>
            <Table.Cell>{def}</Table.Cell>
            <Table.Cell>{goals_fav}</Table.Cell>
            <Table.Cell>{goals_against}</Table.Cell>
            <Table.Cell>{goals_diff}</Table.Cell>
            <Table.Cell>{points}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TableExampleSortable
