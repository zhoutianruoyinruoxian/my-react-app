import React, { useRef, useEffect } from 'react';
import { Button } from 'antd';
import introJs from 'src/components/StepGuide/stepGuide';
import 'src/components/StepGuide/style.scss';

export default function Test() {
  const tour = useRef(null);

  useEffect(() => {
    startTour();
    return exit;
  }, []);

  const startTour = () => {
    tour.current = introJs([
      {
        element: '#topLeft',
        title: '第1步',
        content: '这是topLeft',
        placement: 'topLeft',
      },
      {
        element: '#top',
        title: '第2步',
        content: '这是top',
        placement: 'top',
      },
      {
        element: '#topRight',
        title: '第3步',
        content: '这是topRight',
        placement: 'topRight',
      },
      {
        element: '#rightTop',
        title: '第4步',
        content: '这是rightTop',
        placement: 'rightTop',
      },
      {
        element: '#right',
        title: '第5步',
        content: '这是right',
        placement: 'right',
      },
      {
        element: '#rightBottom',
        title: '第6步',
        content: '这是rightBottom',
        placement: 'rightBottom',
      },
      {
        element: '#bottomRight',
        title: '第7步',
        content: '这是bottomRight',
        placement: 'bottomRight',
      },
      {
        element: '#bottom',
        title: '第8步',
        content: '这是bottom',
        placement: 'bottom',
      },
      {
        element: '#bottomLeft',
        title: '第9步',
        content: '这是bottomLeft',
        placement: 'bottomLeft',
      },
      {
        element: '#leftBottom',
        title: '第10步',
        content: '这是leftBottom',
        placement: 'leftBottom',
      },
      {
        element: '#left',
        title: '第11步',
        content: '这是left',
        placement: 'left',
      },
      {
        element: '#leftTop',
        title: '第12步',
        content: '这是leftTop',
        placement: 'leftTop',
      },
    ]);
  };

  const exit = () => {
    let stepGuide = tour.current;
    stepGuide.exit();
    stepGuide = null;
  };
  return (
    <div style={{ marginLeft: 200, marginTop: 200 }}>
      <Button id="topLeft">topLeft</Button>
      <Button id="top">top</Button>
      <Button id="topRight">topRight</Button>
      <Button id="rightTop">rightTop</Button>
      <Button id="right">right</Button>
      <Button id="rightBottom">rightBottom</Button>
      <Button id="bottomRight">bottomRight</Button>
      <Button id="bottom">bottom</Button>
      <Button id="bottomLeft">bottomLeft</Button>
      <Button id="leftBottom">leftBottom</Button>
      <Button id="left">left</Button>
      <Button id="leftTop">leftTop</Button>
    </div>
  );
}
