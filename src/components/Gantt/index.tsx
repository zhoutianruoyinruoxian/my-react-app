import React, { Component } from 'react';
import BasePropsType from '../_utils/BasePropsType';
import isEqual from 'lodash-es/isEqual';
import gantt, { Gantt } from './gantt/';
import { GanttOption } from './gantt/gantt';

interface GanttProps extends BasePropsType {
  option?: GanttOption
}

interface GanttState {
  a: number
}

export default class ReactGantt extends Component<GanttProps, GanttState> {
  myGantt: Gantt;
  thisTime: string = new Date().getTime().toString() + ~~(Math.random() * 100).toString();
  id: string = `gantt${this.thisTime}`;
  readonly state: GanttState = {
    a: 333,
  }

  componentDidMount() {
    const dom = document.getElementById(this.id);
    const myGantt = gantt.init(dom as HTMLDivElement);
    this.myGantt = myGantt;
    this.myGantt.setOption(this.props.option);
  }

  componentDidUpdate(prevProps: GanttProps) {
    if (!isEqual(prevProps, this.props)) {
      const { option } = this.props;
      this.myGantt.setOption(option);
    }
  }

  render() {
    return (
      <div id={this.id} style={{ height: 500 }}></div>
    )
  }
}