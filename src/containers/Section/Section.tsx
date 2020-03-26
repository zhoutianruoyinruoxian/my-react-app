import React, { SFC } from 'react';
import './style.scss';

interface InitProps {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

export type Iprops = Readonly<InitProps>

const SectionTitle: SFC<Iprops> = ({
  className = '',
  title = '标题',
  description = '',
  children = '内容',
  ...args
}) => {
  return (
    <section className={`section-title ${className}`} {...args}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>{children}</div>
    </section>
  )
}

export default SectionTitle;