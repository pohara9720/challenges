import React, { useState, useEffect } from 'react';
import { Table, Column } from './Table'


const App = () => {
  const [data, setData] = useState()

  useEffect(() => {

    fetch('https://swapi.dev/api/people', { method: 'GET' })
      .then(response => response.json())
      .then(({ results }) => setData(results))

  }, [])

  const formatDate = (dateString) => {
    const toDate = new Date(dateString)
    const formatted = toDate.toLocaleString()
    const [date] = formatted.split(',')
    return date
  }

  return (
    <Table data={data}>
      <Column sortKey='name' title='Name'>
        {({ name }) => <div>{name}</div>}
      </Column>
      <Column sortKey='height' title='Height'>
        {({ height }) => <div>{height}</div>}
      </Column>
      <Column sortKey='mass' title='Mass'>
        {({ mass }) => <div>{mass}</div>}
      </Column>
      <Column sortKey='hair_color' title='Hair Color'>
        {({ hair_color }) => <div>{hair_color}</div>}
      </Column>
      <Column sortKey='eye_color' title='Eye Color'>
        {({ eye_color }) => <div>{eye_color}</div>}
      </Column>
      <Column sortKey='created' title='Created'>
        {({ created }) => <div>{formatDate(created)}</div>}
      </Column>
      <Column sortKey='edited' title='Edited'>
        {({ edited }) => <div>{formatDate(edited)}</div>}
      </Column>
    </Table>
  )
}

export default App;
