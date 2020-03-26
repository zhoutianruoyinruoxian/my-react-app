import Gantt from './gantt';
// import { Data } from './aaa';

const gantt = {
  init(dom: HTMLDivElement) {
    return new Gantt(dom);
  },
};

export default gantt;
export {
  // Data,
  Gantt,
}