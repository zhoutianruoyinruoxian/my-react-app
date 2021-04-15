import React, { useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Ellipsis from 'src/components/Ellipsis';


export default function () {
  const [text, setText] = useState('哈哈哈哈哈哈哈哈哈哈哈哈哈哈');
  return (
    <>
      <div style={{ width: 70, backgroundColor: '#ddd', display: 'flex' }}>
        <DeleteOutlined />
        <Ellipsis content={text} />
      </div>
      <div style={{ width: 100, backgroundColor: '#ddd' }}>
        <Ellipsis content={<span><DeleteOutlined style={{ float: 'left' }} />{text}</span>} />
      </div>
      <Button type="primary" onClick={() => setText('哈哈哈哈哈哈哈哈哈哈哈哈哈哈')}>点击1</Button>
      <Button onClick={() => setText('哈哈哈')}>点击</Button>
    </>
  );
}
