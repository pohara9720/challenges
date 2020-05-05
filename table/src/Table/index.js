import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import ArrowUpIcon from './ArrowUpIcon'
import ArrowDownIcon from './ArrowDownIcon'

export const Column = ({ data, children }) => children(data);

const Container = styled.div`
  padding: 16px;
`

const StyledTable = styled.table`
  width: 100%;
  word-break: break-word;
  border-collapse: separate;
  border-spacing: 0 4px;
  border: 1px solid #000000;
  border-radius: 8px;

  tbody {
    color: #696969;

    tr {
      background-color: #fff; 
  }
}
`

const TH = styled.th`
  color: ${({ active }) => active ? '#6a0dad' : '#000000'};
  font-size: 12px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 16px;
  font-weight: bold;
  text-align:left;
  border-bottom: 1px solid #000000;
`

const TD = styled.td`
  padding: 16px;
  border-bottom: ${({ lastItem }) => lastItem ? 'none' : '1px solid #000000'}
`

const HeaderContainer = styled.div`
  display:flex;
  align-items:center;
  svg {
    margin-left:4px;
  }
`

const isNumber = value => {
  const integer = parseInt(value)
  return isNaN(integer) ? value : integer
}

const sortByKey = ({ key, asc }, dataset) => dataset && dataset.sort((a, b) =>
  (asc ? isNumber(a[key]) > isNumber(b[key]) : isNumber(a[key]) < isNumber(b[key])) ? 1 : -1)

export const Table = ({ data, children }) => {
  const [sortedData, setSortedData] = useState()
  const [sortOption, setSortOption] = useState({ key: '', asc: false })


  const onSort = (option) => {
    setSortOption(state => ({ key: option, asc: !state.asc }))
  }

  useEffect(() => { setSortedData(data) }, [data])

  useEffect(() => {
    const sorted = sortByKey(sortOption, sortedData)
    setSortedData(sorted)
  }, [sortOption.key, sortOption.asc, sortedData])

  return (
    <Container>
      <StyledTable>
        <thead>
          <tr>
            {React.Children.map(children, ({ props }, ix) => {
              const { sortKey, title } = props
              const { asc: isAscending, key } = sortOption
              const isActive = sortOption && sortKey === key
              const Icon = () => isAscending ? <ArrowUpIcon /> : <ArrowDownIcon />
              return (
                <TH key={ix} onClick={() => onSort(sortKey)} active={isActive} isAscending={isAscending}>
                  <HeaderContainer>
                    {title}
                    {isActive && <Icon />}
                  </HeaderContainer>
                </TH>
              )
            }

            )}
          </tr>
        </thead>
        <tbody>
          {!!sortedData &&
            sortedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {React.Children.map(children, (child, ix) => {
                  return (
                    <TD key={ix} lastItem={rowIndex === sortedData.length - 1}>
                      {React.cloneElement(child, { data: row })}
                    </TD>
                  )
                }
                )}
              </tr>
            ))}
        </tbody>
      </StyledTable>
    </Container>
  )
}
