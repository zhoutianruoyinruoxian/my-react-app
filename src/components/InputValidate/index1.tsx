import React, { Component } from 'react';
import { Input } from 'antd';
import './style.scss';

export default class InputValidate extends Component<any, any> {


  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      error: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
      if (nextProps.value !== this.props.value) {
        this.validateVal(nextProps.value);
      }
    }
  }

  onChange = e => {
    const val = e.target.value;
    if (!('value' in this.props)) {
      this.setState({
        value: val,
      });
      this.validateVal(val);
    }
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  validate = callback => {
    this.validateVal(this.state.value, callback);
  }

  validateVal = (val, callback?: Function) => {
    const { rules = [], disabled } = this.props;
    let ifError = false;
    // disabled状态不做校验
    if (disabled) {
      this.setState({ error: '' });
    } else {
      for (let i = 0; i < rules.length; i += 1) {
        const { required, message, pattern } = rules[i];
        if (required && !val) {
          this.setState({ error: message });
          ifError = true;
          break;
        }
        if (pattern && !pattern.test(val)) {
          this.setState({ error: message });
          ifError = true;
          break;
        }
        this.setState({ error: '' });
        ifError = false;
      }
    }
    if (typeof callback === 'function') {
      callback(ifError, val);
    }
  }

  render() {
    const { className, disabled, ...args } = this.props;
    const { value, error } = this.state;

    return (
      <div className={`input-validate ${className || ''}`}>
        <Input
          {...args}
          value={value}
          disabled={disabled}
          onChange={this.onChange}
        />
        {error &&
          <p className="input-validate-error">{error}</p>
        }
      </div>
    );
  }
}
