import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Breadcrumb } from 'antd';

class MainBreadcrumb extends Component<RouteComponentProps, any> {
  render() {
    const { history, match, location } = this.props;
    // console.log(history, 33, match, location, 555)
    return (
      <Breadcrumb />
    )
  }
}

export default withRouter(MainBreadcrumb);
