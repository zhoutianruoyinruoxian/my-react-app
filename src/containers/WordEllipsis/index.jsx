/**
 * 自动隐藏过长内容
 */

import React from 'react';
import './style.scss';

export default (props) => {
  const { length, content, className, ...args } = props;
  let ifEllipsis = false;
  let _content = content;
  if (typeof content !== 'string') {
    throw new Error(`content must be ${'string'}`);
  }
  if (content.length > length) {
    ifEllipsis = true;
    _content = content.slice(0, length) + '...';
  }
  return (
    <div
      title={ifEllipsis ? content : ''}
      className={`word-ellipsis ${className || ''}`}
      {...args}
    >
      {_content}
    </div>
  );
};

