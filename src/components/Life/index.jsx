import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    this.setState({
      count: this.state.count + 1,
    });
    console.log(this.state.count, 333);
    this.setState({
      count: this.state.count + 1,
    });
    console.log(this.state.count, 444);
  }
  render() {
    console.log(this.state.count, 555);
    return this.state.count;
  }
}
