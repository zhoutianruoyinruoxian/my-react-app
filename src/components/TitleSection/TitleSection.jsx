import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './style.scss';
import { Link, withRouter } from 'react-router-dom';

@withRouter
export default class Home extends Component {

  static defaultProps = {
    children: '标题',
    colspan: 24,
    justify: 'start',

  }
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }


  render() {
    const { className, children, colspan, justify } = this.props;
    return (
      <Row
        className="ui-title-section"
        justify={justify}
        type="flex"
      >
        <Col
          span={colspan}
        >
          <h1 className={`ui-title-section-h1 ${className}`}>{children}</h1>
        </Col>
      </Row>
    );
  }
}
