import React from 'react';
import { Form, Input, Button } from 'antd';
import { useBindForm } from 'hooks';

const { Item } = Form;

export default function Test1() {
  const [form, formData, setFormData] = useBindForm();

  const handleSubmit = () => {
    console.log(formData, 999);
  };

  return (
    <Form
      form={form}
      onValuesChange={(changeValue, values) => { setFormData(values); }}
      onFinish={handleSubmit}
    >
      <Item
        label="name"
        name="name"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="id"
        name="id"
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
      >
        <Input />
      </Item>
      <Button type="primary" htmlType="submit">提交</Button>
    </Form>
  );
}
