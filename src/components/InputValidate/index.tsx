import React, { useState, useEffect, useRef, useImperativeHandle, useReducer } from 'react';
import { Input } from 'antd';
import './style.scss';

const useUpdateEffect = (effect, deps) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};


const InputValidate = (props, ref) => {
  const InputRef = useRef();
  const {
    value,
    rules = [],
    className,
    onChange: propsOnChange,
    disabled,
    ...args
  } = props;
  const [state, setState] = useReducer((state, action) => ({ ...state, ...action }), { value });
  const [error, setError] = useState('');

  useImperativeHandle(ref, () => ({
    validate,
    InputRef,
  }));

  useEffect(() => {
    // if ('value' in props) {
      setState({ value });
    // }
  }, [value]);

  useUpdateEffect(() => {
    validateVal(state.value);
  }, [state.value, disabled]);


  const validateVal = (val, callback) => {
    let ifError = false;
    // disabled状态不做校验
    if (disabled) {
      setError('');
    } else {
      for (let i = 0; i < rules.length; i += 1) {
        const { required, message, pattern } = rules[i];
        if (required && !val) {
          setError(message);
          ifError = true;
          break;
        }
        if (pattern && !pattern.test(val)) {
          setError(message);
          ifError = true;
          break;
        }
        setError('');
        ifError = false;
      }
    }
    if (typeof callback === 'function') {
      callback(ifError, val);
    }
  };

  const validate = callback => {
    validateVal(state.value, callback);
  };

  const onChange = e => {
    // debugger;
    const val = e.target.value;
    console.log('out --', props);
    console.log(val);


    if (!('value' in props)) {
      console.log('inner --', props);
      console.log(val);
      setState({ value: val });
    }
    if (propsOnChange) {
      propsOnChange(e);
    }
  };

  return (
    <div className={`input-validate ${className || ''}`}>
      <Input
        {...args}
        value={state.value}
        disabled={disabled}
        ref={InputRef}
        onChange={onChange}
      />
      {error &&
        <p className="input-validate-error">{error}</p>
      }
    </div>
  );
};

const InputValidateRef = React.forwardRef(InputValidate);

export default InputValidateRef;
