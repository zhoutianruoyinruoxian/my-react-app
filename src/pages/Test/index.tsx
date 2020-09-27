
import React from 'react';
import { Button, Modal } from 'antd';

export default function test() {
  const onClick = () => {
    Modal.open({
      title: '11',
      content: '22',
      onCancel: () => {

      },
    });
  };

  return (
    <>
      <Button onClick={onClick}>点击</Button>
    </>
  );
}
