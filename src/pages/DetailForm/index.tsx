import React, { useEffect } from 'react';
import DetailForm from 'src/components/DetailForm/DetailForm';
import { Form, Input } from 'antd';
import { useBindForm } from 'hooks';



export default function () {
  const [form, formData, setForm] = useBindForm();

  useEffect(() => {
    form.resetFields();
    console.log('didmou');
    setForm({ kkk: 333 });
  }, []);
  console.log(123)

  return (
    <DetailForm
      form={form}
      fieldsConfig={[
        {
          fieldsSpan: 12,
          fields: [
            {
              label: '立案时间',
              name: 'kkk',
              component: Input1,
            },
          ],
        },
      ]}
    />
  );
}


function Input1(props) {
  useEffect(() => {
    console.log('didmount');
  }, []);
  console.log('update')
  return <Input {...props} />;
}
