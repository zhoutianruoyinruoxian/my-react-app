import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

export default function Item({
  disabled,
  label,
  required = true,
  rules: propsRules = [],
  children: PropsChildren = (<Input />),
  componentProps,
  ...args
}) {

  const rules = [...propsRules];
  if (required && !~rules.findIndex(o => o.required)) {
    rules.unshift({
      required: true,
      message: `${label}必填`,
    });
  }

  const children = React.cloneElement(PropsChildren, {
    disabled,
    placeholder: label,
    ...componentProps,
  });
  useEffect(() => {
    console.log(777)
  }, [])
  console.log(888)

  return (
    <Form.Item
      label={label}
      rules={rules}
      {...args}
    >
      {children}
    </Form.Item>
  );
}
