import React from 'react';
import type { FC } from 'react';

const FlexTable: FC<any> = ({ prefixcls, children }) => {

  const child = React.cloneElement(children, {
    className: prefixcls,
    scroll: {
      x: 'max-content',
      y: 1,
    },
  });

  return child;
};

FlexTable.defaultProps = {
  prefixcls: 'raui-flex-table',
};

export default FlexTable;
