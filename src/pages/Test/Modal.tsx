
import React, { useState } from 'react';
import { Button, Modal } from 'antd';

export default function Test() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    Modal.open({
      title: '11',
      content: count,
      onCancel: () => {

      },
    });
  };

  const onAdd = () => {
    setCount(count + 1);
  };

  const onClick1 = () => {
    setVisible(true);
  }

  const onClick2 = () => {
    Modal.confirm({
      title: '11',
      content: count,
      onCancel: () => {

      },
    });
  }

  return (
    <>
      <Button onClick={onClick}>点击</Button>
      <Button onClick={onAdd}>+1</Button>
      <Button onClick={onClick1}>点击1</Button>
      <Button onClick={onClick2}>点击2</Button>
      <div>{count}</div>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
      >

        <div>{count}</div>
      </Modal>
    </>
  );
}
