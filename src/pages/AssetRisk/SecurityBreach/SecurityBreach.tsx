import React, { Component } from 'react';

export default class SecurityBreach extends Component<any, any> {
  render() {
    return (
      <div className="home bip">
        <p>SecurityBreach</p>
        {this.props.children}
      </div>
    );
  }
}

