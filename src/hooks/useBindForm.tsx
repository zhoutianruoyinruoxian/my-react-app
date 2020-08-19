import { useState, useEffect } from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/Form';

export type UseBindForm = (initFormData?: object, _form?: FormInstance) =>
  [FormInstance, object, React.Dispatch<React.SetStateAction<object>>];

const useBindForm: UseBindForm = (initFormData = {}, _form) => {
  const [form] = Form.useForm(_form);
  const [formData, setFormData] = useState(initFormData);
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData]);

  return [form, formData, setFormData];
};

export default useBindForm;
