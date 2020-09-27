---
order: 1
title:
  en-US: Basic Usage
  zh-CN: 基本用法
---

## zh-CN

基本用法

## en-US

Basic Usage

````jsx

import { AsyncButton } from 'raui';

function Demo() {

  const handleClick = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  });

  return (<AsyncButton onClick={handleClick} >点击</AsyncButton>
  )
}

ReactDOM.render(<Demo />, mountNode)

````
