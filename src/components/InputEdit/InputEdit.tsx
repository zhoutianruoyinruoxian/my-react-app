import React, { Component, createRef } from 'react';
import { Icon, Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import InputValidate, { Rule } from '../InputValidate';
import './style.less';

type Value = InputProps['value'];
interface InputEditProps extends InputProps {
  required?: boolean;
  onOk?: (value?: Value, callback?: Function) => void;
  onCancel?: () => void;
  rules?: Rule[];
}

interface InputEditState {
  dsiabled: boolean;
  loading: boolean;
  value: Value;
  oldValue: Value;
  validateStatue: boolean;
}

export default class InputEdit extends Component<InputEditProps, InputEditState>{
  static defaultProps: InputEditProps = {
    rules: [],
    required: false,
    onOk: (value, next) => {
      next(true);
    },
    prefix: <Icon type="user" />,
  };

  Input = createRef<Input>();

  defaultState = {
    dsiabled: true,
    loading: false,
    validateStatue: false,
  };

  state: Readonly<InputEditState> = {
    ...this.defaultState,
    value: undefined,
    oldValue: undefined,
  }


  togglePadding = (ifpad: boolean) => {
    const { input } = this.Input.current;
    input.style.paddingRight = ifpad ? '40px' : '';

  }

  componentDidMount() {
    this.setValue();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setValue(nextProps);
  }

  setValue = ({ value } = this.props) => {
    this.setState({
      oldValue: value,
      value,
    })
  }

  onEdit = () => {
    this.setState({
      dsiabled: false,
    }, () => {
      const { input } = this.Input.current;
      input.focus();
      this.togglePadding(true);
    });

  }

  onChange = (e, validateStatue: boolean) => {
    console.log(validateStatue, 999)
    const value = e.target.value;
    const { onChange } = this.props;
    this.setState({
      value,
      validateStatue,
    })
    onChange && onChange(e);
  }

  onOk = () => {
    const { onOk } = this.props;
    const { value, validateStatue } = this.state;
    if (validateStatue) return;
    this.togglePadding(false);
    this.setState({
      loading: true,
    });
    onOk(value, this.next);
  }

  // onOk回调,通过resState控制请求后的组件状态
  next = (resState: boolean) => {
    const { value } = this.state;
    if (resState) {
      this.setState({
        ...this.defaultState,
        oldValue: value,
      });
    } else {
      this.togglePadding(true);
      this.setState({
        loading: false,
      });
    }
  }

  onCancel = () => {
    const { oldValue } = this.state;
    const { onCancel } = this.props;
    this.togglePadding(false);
    this.setState({
      ...this.defaultState,
      value: oldValue,
    });
    onCancel && onCancel();
  }


  render() {
    const { dsiabled, loading, value, validateStatue } = this.state;
    const { className, placeholder, prefix, required, rules: propsRules, ...args } = this.props;
    const rules = [...propsRules];
    if (required && !~rules.findIndex(o => o.required)) {
      rules.unshift({
        required: true,
        message: `${placeholder}必填`,
      })
    }
    return (
      <InputValidate
        {...args}
        value={value}
        className={`input-edit ${className || ''}`}
        ref={this.Input}
        rules={rules}
        disabled={dsiabled}
        placeholder={placeholder}
        prefix={prefix}
        suffix={dsiabled ?
          (<Icon type="form" onClick={this.onEdit} />) :
          (loading ? <Icon type="loading" /> :
            <>
              <Icon
                type="check"
                onClick={this.onOk}
                style={{
                  color: validateStatue ? '#999' : '',
                  cursor: validateStatue ? 'not-allowed' : '',
                }}
              />
              <Icon type="close" onClick={this.onCancel} />
            </>
          )
        }
        onChange={this.onChange}
        onPressEnter={this.onOk}
      />
    )
  }
}
