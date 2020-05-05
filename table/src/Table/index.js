import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid black;
  background: gray;
  padding: 16px;
`

const Table = () => {
  const [data, setData] = useState()

  useEffect(() => {

    fetch('https://swapi.dev/api/people', { method: 'GET' })
      .then(response => response.json())
      .then(({ results }) => setData(results))

  }, [])

  console.log(data)

  return (
    <Container>
      <div>Hello</div>
    </Container>
  )
}

export default Table;
