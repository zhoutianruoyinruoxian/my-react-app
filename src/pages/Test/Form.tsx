import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { cloneDeep } from 'lodash-es';

const { Item } = Form;

export default function FormComponent() {

  const [form] = Form.useForm();
  const [fields, setFields] = useState<any>([]);

  const onValuesChangeHandle = (a, b: any) => {
    const list: any[] = [];
    Object.keys(b).forEach(o => {
      list.push({
        name: [o],
        value: b[o],
      });
    });
    setFields(list);
  };

  console.log(fields, 999);

  return (
    <Form
      layout="vertical"
      form={form}
      fields={fields}
      autoComplete="off"
      onValuesChange={onValuesChangeHandle}
    >
      <Item label="name" name="name">
        <Input />
      </Item>
      <Item label="text" name="text">
        <Input />
      </Item>
      <Button onClick={() => {
        const data = cloneDeep(fields);
        data[0].value = undefined;
        setFields(data);
      }}>重置</Button>
    </Form>
  )
}

