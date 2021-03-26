/**
 * @desc 注意事项：'setFormData'在设置了'formData'之后再通过'setFieldsValue'往表单赋值，
 * 所以当业务中需要用到重置表单的需求之后，如果采用'setFormData()',会导致formData被清空而表单域没有任何改变，
 * 因为'setFieldsValue'设置必需指明item的name。所以在使用'setFormData'方法的时候尽量保证全数据设置，
 * 否则容易出现两边数据不一致的情况
 */

import { useState, useEffect } from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/Form';

export type UseBindForm = (initFormData?: object, _form?: FormInstance) =>
  [FormInstance, object, React.Dispatch<React.SetStateAction<object>>];

const useBindForm: UseBindForm = (initFormData, _form) => {
  const [form] = Form.useForm(_form);
  const [formData, setFormData] = useState(initFormData || {});
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData]);
  return [form, formData, setFormData];
};

export default useBindForm;
