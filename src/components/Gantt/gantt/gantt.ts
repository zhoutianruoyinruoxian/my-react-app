import { createSVG } from './svg';

export interface Data {
  start: number;
  end: number;
  text?: string;
  progress?: number | string;
}

export interface GanttOption {
  dataSource?: Data[];
  duration?: number;
}

export default class Gantt {
  svg: SVGElement;
  option: GanttOption;
  constructor(dom) {
    console.dir(dom)
    console.log(dom.offsetWidth)
    this.draw(dom)
  }

  setOption(option: GanttOption) {
    this.option = Object.assign({}, {
      duration: 2592000000,//扩展的时间单向区间，默认为一个月，总共2个月（向前向后各扩展一个月）
    }, option);

    this.timeInterval();
  }

  draw(dom: HTMLElement) {
    const attrs = {
      append_to: dom,
    }
    this.svg = createSVG('svg', attrs);
  }

  timeInterval() {
    const { dataSource, duration } = this.option;
    let maxTime = 0, minTime = 0;
    if (!dataSource) {
      maxTime = minTime = new Date().getTime();
    } else {
      dataSource.forEach(o => {
        maxTime < o.end && (maxTime = o.end);
        (minTime === 0 || minTime > o.start) && (minTime = o.start);
      })
    }
    maxTime += duration;
    minTime -= duration;
  }

}