import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import ReactGantt from 'gantt-for-react';

export default class Gantt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'Day',
      tasks: [
        {
          id: 'Task 1',
          name: 'Redesign website',
          start: moment().format('YYYY-MM-DD'),
          end: moment().format('YYYY-MM-DD'),
          progress: 20,
          disabled: true,
        },
        {
          id: 'Task 2',
          name: 'Redesign website',
          start: moment().format('YYYY-MM-DD'),
          end: moment().format('YYYY-MM-DD'),
          progress: 20,
          disabled: false,
        },
      ]
    };
  }
  customPopupHtml = task => {
    return `
      <div class="details-container">
        <h5>${task.name}</h5>
        <p>Expected to finish by</p>
        <p>${task.progress}% completed!</p>
      </div>
    `;
  };

  onClick = (task) => {
    console.log(task, 333)
  }

  onDateChange = (task, start, end) => {
    if(task.disabled){
      const tasks = _.cloneDeep(this.state.tasks);
      const index = tasks.findIndex(o=>o.id === task.id);
      tasks[index].start = start;
      tasks[index].end = end;
      this.setState({
        tasks,
      })
    }
    
    console.log(task, start, end, 444)

  }

  onProgressChange = (task, progress) => {
    console.log(task, progress, 55)

  }

  render() {
    return (
      <div className="examples">
        <div className="parent">
          <label> render ReactGantt Component </label>
          <div style={{ overflow: 'scroll' }}>
            <ReactGantt
              tasks={this.state.tasks}
              viewMode={this.state.viewMode}
              customPopupHtml={this.customPopupHtml}
              onClick={this.onClick}
              onDateChange={this.onDateChange}
              onProgressChange={this.onProgressChange}
            // scrollOffsets={this.state.scrollOffsets}
            />
          </div>
        </div>
      </div>
    );
  }
}
