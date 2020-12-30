import { CSSProperties, ReactChild } from 'react';

export default interface BasePropsType {
  prefixCls?: string;
  style?: CSSProperties;
  className?: string;
  children?: ReactChild;
}
