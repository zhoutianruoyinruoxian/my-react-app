import React, { Component } from 'react';
import { Content } from 'containers';

export default class AttackSurfaceManagement extends Component<any, any> {

  render() {
    console.log(this.props.children,999)
    return (
      <Content>
        <div className="home bip">
            这是AssetRisk的index组件
          {this.props.children}
        </div>
      </Content>
    );
  }
}

