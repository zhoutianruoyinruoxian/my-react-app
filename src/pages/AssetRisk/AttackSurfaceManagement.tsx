import React, { Component } from 'react';
import { Content } from 'src/containers';

export default class AttackSurfaceManagement extends Component<any, any> {

  render() {
    console.log(this.props.match, 2222)
    return (
      <Content>
        <div className="home bip">
          <p>AttackSurfaceManagement</p>
        </div>
      </Content>
    );
  }
}

