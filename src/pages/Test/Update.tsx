import React, { useState } from 'react';
import { Button } from 'antd';

export default function Demo() {
  const [a, setA] = useState(0);

  console.log(11);

  return (
    <div>
      <Child a={a} onChange={() => setTimeout(() => setA(o => o + 1), 1000)} />
    </div>
  )
}

function Child({ a, onChange }) {
  const [b, setB] = useState(0);

  const onClickHandle = () => {
    setB(o => o + 1);
    onChange();
  };

  console.log(a, b, 444);
  return (
    <div>
      {b}
      {a}
      <Button onClick={onClickHandle}>点击</Button>
    </div>
  );
}
