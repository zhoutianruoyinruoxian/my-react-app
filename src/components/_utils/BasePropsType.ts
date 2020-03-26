import { CSSProperties, ReactChild } from 'react';

export default interface BasePropsType {
  style?: CSSProperties;
  className?: string;
  children?: ReactChild;
}