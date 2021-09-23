import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { AsyncButton } from '@';
import api from 'api';
import BasePropsType from 'src/type/BasePropsType';
import './style.scss';

const { Item, useForm } = Form;

interface LoginProps extends BasePropsType {

}

export default function Login({ prefixCls }: LoginProps) {
  const [login, setLogin] = useState(false);
  const [form] = useForm();

  const handleClick = async () => {
    const values = await form.validateFields();
    await api.login(values).then(res => {
      console.log(res, 999);
      setLogin(true);
    }).catch((err) => {
      console.log(err,888)
    });
  };

  return (
    <div className={prefixCls}>
      <Form form={form}>
        <Item
          name="username"
        >
          <Input type="text" placeholder="用户名" />
        </Item>
        <Item
          name="password"
        >
          <Input.Password placeholder="密码" />
        </Item>
      </Form>
      <AsyncButton type="primary" onClick={handleClick}>登陆</AsyncButton>
      <div>登陆状态：{login ? '已' : '未'}登陆</div>
    </div>
  );
}

Login.defaultProps = {
  prefixCls: 'main-login',
};
