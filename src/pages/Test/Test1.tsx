import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useBindForm } from 'hooks';

const { Item, List } = Form;

export default function Test1() {
  // const [form, formData, setFormData] = useBindForm();
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(form, 5555)
  }, [form])

  const handleSubmit = () => {
    // console.log(formData, 999); 
  };
  console.log(12345)

  return (
    <Form
      form={form}
      onValuesChange={(changeValue, values) => {
        // console.log(changeValue, values, 88);
        // setFormData(values);
      }}
      // onFieldsChange={(a, b) => { console.log(a, b, 12312312312) }}
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

      <List name="ooo">
        {(fields, { add, remove }) => {
          console.log(fields, 65789)
          return (<>
            <div>
              {fields.map(o => (
                <Item
                  label="kk"
                  name={[o, 'll']}
                  key={o.name}
                  rules={[
                    {
                      required: true,
                      message: '必填',
                    },
                  ]}
                >
                  <Input />
                </Item>
              ))}
            </div>
            <Button type="primary" onClick={() => add()}>点击99</Button>
          </>
          )
        }}
      </List>
      <Button type="primary" htmlType="submit">提交</Button>
      <Button type="primary" onClick={() => form.setFieldsValue({ name: 123 })}>点击</Button>
    </Form>
  );
}
