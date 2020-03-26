/**
 * 
 * @desc 将input输出的字符串转为数字(不能转数字就原样输出)(格式化成1,000,000格式)
 * `该组件目前无法输入与symbol相同的字符，需要修改（要么无法输入任何字符，要么能输入任何字符）`
 */

import React, { Component } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

type Value = string;
export interface InputFormatProps extends InputProps {
  defaultValue?: Value;
  value?: Value;
  format?: {
    size: number;
    symbol: string;
    direction?: 'positive' | 'reverse';
  }
}
interface InputFormatState {
  value: Value;
}

export default class InputFormat extends Component<InputFormatProps, InputFormatState>{

  static getDerivedStateFromProps(nextProps: InputFormatProps) {
    if ('value' in nextProps) {//受控状态根据props.value控制组件的state.value
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  constructor(props: InputFormatProps) {
    super(props);
    // const value = 'value' in props ? props.value : props.defaultValue;//针对组件是否受控选择初始值
    const value = Reflect.has(props, 'value') ? props.value : props.defaultValue;//针对组件是否受控选择初始值
    this.state = {
      value,
    }
  }

  // 已经被getDerivedStateFromProps新方法替代
  // componentWillReceiveProps(nextProps: InputFormatProps) {
  //   if (nextProps.value !== this.props.value) {//受控状态根据props.value控制组件的state.value
  //     this.setState({
  //       value: nextProps.value,
  //     })
  //   }
  // }

  checkParams = (props = this.props) => {
    if (!props.format) return false;
    const { size, symbol } = props.format;
    if (size && symbol) return true;
    return false;
  }


  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (this.checkParams()) {
      const { symbol } = this.props.format;
      const pattern = new RegExp(symbol, 'g');
      value = value.replace(pattern, '');
    }
    event.target.value = value;
    if (!('value' in this.props)) {//为了跟受控状态行为保持一致
      this.setState({
        value,
      })
    }
    this.props.onChange && this.props.onChange(event);
  }

  format = (value: InputFormatProps['value']) => {
    if (!value || !this.checkParams()) return value;
    const { size, symbol, direction } = this.props.format;
    const pattern = direction === 'reverse' ? `.{1,${size}}(?=(.{${size}})+$)` : `.{${size}}(?=(.{1,${size}})+$)`;
    const patternReg = new RegExp(pattern, 'g');
    return value.toString().replace(patternReg, `$&${symbol}`);
  }

  resetMaxLength = (length: number) => {
    const { size } = this.props.format;
    const quotient = ~~(length / size);
    const remainder = length % size;
    const additional = remainder === 0 ? -1 : 0;
    return length + quotient + additional;
  }

  render() {
    const { value } = this.state;
    const { className, maxLength, format, ...args } = this.props;
    let maxLengthProps = typeof maxLength == 'undefined' ? {} : {
      maxLength: this.resetMaxLength(maxLength)
    }
    return (
      <Input
        {...args}
        className={`input-format ${className || ''}`}
        value={this.format(value)}
        {...maxLengthProps}
        onChange={this.handleChange}
      />
    )
  }
}