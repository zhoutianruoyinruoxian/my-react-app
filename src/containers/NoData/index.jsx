/**
 * @desc 无数据展示组件
 * @param {string} size 可选项（''，small）默认值（'')，目前有两种size展示不同的外观
 * @param {string} type 可选项（default，search，filter） 默认值（default）
 * @param {string} content 数据时展示的内容，根据type不同会有不同的默认值，任意type都可传入该参数自定义
 * @param {string|object(ReactDom)} img 无数据时展示的图片，根据type不同会有不同的默认值，任意type都可传入该参数自定义
 */

import React from 'react';
import './style.scss';

const defaultProps = {
  defaultOption: {
    content: '暂无数据',
    img: 'icon_nodate.png',
  },
  searchOption: {
    content: '搜索无结果请在右上方重新搜索',
    img: 'icon_no search.png',
  },
  filtersOption: {
    content: '筛选无结果',
    img: 'icon_no search.png',
  },
};
export default (props) => {
  const { size = '', type = 'default', className, ...args } = props;
  const { content = defaultProps[type + 'Option'].content } = props;
  const { img = defaultProps[type + 'Option'].img } = props;

  return (
    <div
      className={`${size === 'small' ? 'no-data-small' : ''} no-data ${className || ''}`}
      {...args}
    >
      {typeof img === 'string' && <img className="no-data-img" src={img && require(`../../resource/noDataImg/${img}`)} alt="" />}
      {typeof img === 'object' && img !== null && img}
      <p className="no-data-content">{content}</p>
    </div >
  );
};
