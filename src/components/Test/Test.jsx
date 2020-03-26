import React, { Component } from 'react';

const aaa = { a: 'v' };
export default class Home extends Component {
  constructor() {
    super();
    console.log(this, this.props, 333)
    setTimeout(()=>{
      console.log(this, this.props, 444)
    },1)
    this.state = {
      destory: false,
    };
  }

  render() {
    return (
      <div >{this.props.children}什么情况
      </div>
    );
  }
}
