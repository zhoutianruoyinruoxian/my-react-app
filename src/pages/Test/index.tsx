import React from 'react';
import { AsyncButton } from 'raui';
import aa from 'raui/AsyncButton/demo/basic.md';

console.log(aa,2312312)
export default function Demo() {

  const handleClick = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  return (<AsyncButton onClick={handleClick} >哈哈哈哈</AsyncButton>
  );
}
