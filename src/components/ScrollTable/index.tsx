/**
 * @desc table内容自动滚动组件
 */
import React, { useEffect, useState, useRef, FC } from 'react';
import classNames from 'classnames';
import BasePropsType from '../_utils/BasePropsType';
import { CLASS_NAME } from '../_utils/constant';
import { getWidth, getHeight } from '../_utils/getStyle';
import './style.scss';


interface ScrollTableProps extends BasePropsType {
  cutWidth: number;
  cutHeight: number;
  scrollToFirstRowOnChange: boolean;
}

const ScrollTable: FC<ScrollTableProps> = ({
  prefixCls,
  className,
  cutWidth,
  cutHeight,
  scrollToFirstRowOnChange,
  children,
  ...args
}) => {
  const ScrollTableRef: any = useRef();
  const [table, setTable] = useState(null);
  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [cutHeight, children]);

  const resizeWindow = () => {
    const width = getWidth(ScrollTableRef);
    const height = getHeight(ScrollTableRef);
    const table = React.cloneElement(children as any, {
      scroll: {
        scrollToFirstRowOnChange,
        y: height - cutHeight,
        x: width - cutWidth,
      },
    });
    setTable(table);
  };

  return (
    <div
      ref={ScrollTableRef}
      className={
        classNames(prefixCls, {
          className,
        })
      }
      {...args}
    >
      {table}
    </div >
  );
};

ScrollTable.defaultProps = {
  prefixCls: `${CLASS_NAME}-scroll-table`,
  cutWidth: 0,
  cutHeight: 0,
  scrollToFirstRowOnChange: true,
};

export default ScrollTable;
