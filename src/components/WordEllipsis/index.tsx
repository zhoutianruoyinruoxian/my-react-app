/**
 * @desc 自动隐藏过长内容
 */

import React from 'react';
import './style.scss';
import { Popover } from 'antd';

export default (props) => {
  const { length, content, className, ...args } = props;
  let ifEllipsis = false;
  let _content = content;
  if (typeof content !== 'string') {
    throw new Error(`content must be ${'string'}`);
  }

  if (length && content.length > length) {
    ifEllipsis = true;
    _content = content.slice(0, length) + '...';
  }

  const contentDom = (
    <div
      className={`word-ellipsis ${className || ''}`}
      {...args}
    >
      {_content}
    </div>
  );

  return (
    <React.Fragment>
      {
        ifEllipsis ?
          <Popover
            placement="bottom"
            content={<div className="popover-content">{content}</div>}
          >
            {contentDom}
          </Popover> :
          contentDom
      }
    </React.Fragment>
  );
};

