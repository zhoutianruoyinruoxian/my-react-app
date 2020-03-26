/**
 * 将input输出的字符串转为数字(不能转数字就原样输出)
 */

import React from 'react';
import { Input } from 'antd';
// import './style.scss';

export default (props) => {
  const { className, ...args } = props;
  const change = (o) => {
    const value = o.target.value;
    let val = parseInt(value);
    val = isNaN(val) ? value : val;
    props.onChange && props.onChange(val);
  };

  return (
    <Input
      className={`${className || ''} input-number`}
      {...args}
      onChange={change}
    />
  );
};
