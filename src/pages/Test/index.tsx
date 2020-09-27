
import React, { useState } from 'react';
import { Button, Modal } from 'antd';

export default function Test() {
  const [count, seCount] = useState(0);
  const onClick = () => {
    Modal.open({
      title: '11',
      content: count,
      onCancel: () => {

      },
    });
  };

  const onAdd = () => {
    seCount(count + 1);
  };

  return (
    <>
      <Button onClick={onClick}>点击</Button>
      <Button onClick={onAdd}>+1</Button>
      <div>{count}</div>
    </>
  );
}
