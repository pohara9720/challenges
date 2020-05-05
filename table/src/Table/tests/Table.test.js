import React from 'react'
import App from '../../App'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme';
import { Table, Column } from '../index'

describe('Table', () => {

  it('App should run with table without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

describe('Table should render on its own without crashing', () => {
  const Sample = () => {
    const data = [{ name: 'Dua Lipa' }]
    return (
      <Table data={data}>
        <Column>
          {({ name }) => <div>{name}</div>}
        </Column>
      </Table>
    )
  }
  it('Should render without issues', () => {
    shallow(<Sample />);
  });
});
