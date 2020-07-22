import React, { Component } from 'react';

export default class SecurityBreach extends Component<any, any> {
  render() {
    console.log(888888888)
    return (
      <div className="home bip">
        <p>SecurityBreach</p>
        {this.props.children}
      </div>
    );
  }
}

