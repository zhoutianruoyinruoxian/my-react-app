import React, { SFC } from 'react';
import './style.scss';

interface InitProps {
  className?: string;
  style?:React.CSSProperties;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

export type Iprops = Readonly<InitProps>

const Content: SFC<Iprops> = ({
  className = '',
  title = '',
  description = '',
  children = '',
  ...args
}) => {
  return (
    <div className={`main-content ${className}`} {...args}>
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  )
}

export default Content;