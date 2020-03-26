import React, { SFC } from 'react';
import './style.scss';

interface Iprops extends React.HTMLAttributes<HTMLDivElement> {
  menuLeft?: React.ReactNode;
  menuRight?: React.ReactNode;
}

const Content: SFC<Iprops> = (props) => {
  const { className, menuLeft, menuRight, children } = props;
  return (
    <div className={`main-content ${className || ''}`}>
      <div className="sub-title clearfix">
        <div className="menu-left">
          {menuLeft}
        </div>
        <div className="menu-right">
          {menuRight}
        </div>
      </div>
      <div className="content-section">
        {children}
      </div>
    </div>
  )
}
export default Content;
