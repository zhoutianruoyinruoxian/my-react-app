/**
 * @desc 自动隐藏过长内容
 * @date 2020-12-23
 */

import React, { useEffect, useState, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import type BasePropsType from '../_utils/BasePropsType';
import './style.scss';
import Popover, { PopoverProps } from 'antd/lib/popover';

export interface EllipsisProps extends BasePropsType {
  content: ReactNode;
  placement?: PopoverProps['placement'];
}

const Ellipsis: FC<EllipsisProps> = ({ prefixCls, className, content, placement, ...args }) => {
  const ellipsisRef = useRef(null);
  const [ellipsis, setEllipsis] = useState<boolean>(false);

  useEffect(() => {
    getDomWidth();
  }, [content]);

  const getDomWidth = () => {
    const dom: any = ellipsisRef.current;
    const show = dom.clientWidth;
    const all = dom.scrollWidth;
    setEllipsis(show < all);
  };

  const contentDom = (
    <div
      className={classNames(prefixCls, className)}
      ref={ellipsisRef}
      {...args}
    >
      {content}
    </div>
  );

  return (
    <>
      {
        ellipsis ?
          <Popover
            placement={placement}
            content={<div className={`${prefixCls}-tooltip`}>{content}</div>}
          >
            {contentDom}
          </Popover> :
          contentDom
      }
    </>
  );
};

Ellipsis.defaultProps = {
  prefixCls: 'rc-ellipsis',
  placement: 'top',
};

export default Ellipsis;
