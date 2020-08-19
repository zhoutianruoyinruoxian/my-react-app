/**
 * @desc table内容自动滚动组件
 */
import React, { Component } from 'react';
import './style.scss';

export default class Scroll extends Component {

  static defaultProps = {
    headerHeight: 54,
    pageHeight: 64,
  }

  constructor(props) {
    super(props);
    this.state = {
      table: null,
      count: 1,
    };
  }

  componentDidMount() {
    this.resizeWindow(this.props);
    window.addEventListener('resize', this.addResiseWindow);
  }

  componentWillReceiveProps(nextprops) {
    // if (_.isEqual(this.props.children.props.dataSource, nextprops.children.props.dataSource)) return;
    this.resizeWindow(nextprops);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.addResiseWindow);
  }

  addResiseWindow = () => {
    this.resizeWindow(this.props);
  }

  resizeWindow = (props) => {
    const { headerHeight, pageHeight, children } = props;
    const cutHeight = props.cutHeight || (headerHeight + pageHeight);
    const height = this.getHeight(this.scroll);
    try {
      Number(cutHeight);
    }
    catch (err) {
      throw new Error(err);
    }
    const table = React.cloneElement(children, {
      scroll: {
        y: height - cutHeight,
      },
    });
    this.setState({
      table,
    });
  }
  /**
   * 获取doom节点高度
   * @param {string} element 节点的选择器
   * @param {boolean} includePadding 获取高度是否要包含padding（默认值false）
   */
  getHeight = (element, includePadding = false) => {
    const dom = element;
    function getStyle(obj, attr) {
      if (obj.currentStyle) {
        return Number(obj.currentStyle[attr].replace(/px/, ''));
      }
      else {
        return Number(document.defaultView.getComputedStyle(obj, null)[attr].replace(/px/, ''));
      }
    }
    try {
      if (includePadding) {
        return dom.clientHeight + getStyle(dom, 'marginBottom') + getStyle(dom, 'marginTop');
      } else {
        return dom.clientHeight + getStyle(dom, 'marginBottom') + getStyle(dom, 'marginTop') - getStyle(dom, 'paddingTop') - getStyle(dom, 'paddingBottom');
      }
    } catch (err) {
      return 0;
    }
  }

  render() {
    const { table } = this.state;
    return (
      <div className={`scroll-tb ${this.props.className || ''}`} style={this.props.style} ref={ref => this.scroll = ref}>
        {table}
      </div>
    );
  }
}
