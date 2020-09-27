
import React from 'react';
import { Button, Modal } from 'antd';
import { AsyncButton } from 'raui';

export default function test() {
  const onClick = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Modal.open({
          title: '11',
          content: '22',
          onCancel: () => {

          },
        });
        resolve();
      }, 2000)
    })
  };
  
  return (
    <>
      <AsyncButton onClick={onClick}>点击</AsyncButton>
    </>
  );
}
