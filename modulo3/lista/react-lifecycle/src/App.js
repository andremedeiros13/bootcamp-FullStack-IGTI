import React, { Component } from 'react';
import Users from './components/users/Users';
import Toogle from './components/toogle/Toogle';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false
    }
  }
  async componentDidMount() {
    const res = await fetch('https://randomuser.me/api/?seed=rush&nat=br&results=10');
    const json = await res.json();

    this.setState({
      users: json.results
    });

  }

  handleShowUsers = (isChecked) => {
    this.setState({ showUsers: isChecked });

  }
  render() {
    const { showUsers, users } = this.state
    return (
      <div>
        <h3>React Lifecycle</h3>
        <Toogle
          description="Monstrar usuários:"
          enabled={showUsers}
          onToggle={this.handleShowUsers} />
        <hr />
        {
          showUsers && <Users users={users} />
        }
      </div>
    )
  }
}
