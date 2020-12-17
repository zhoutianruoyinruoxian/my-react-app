import React, { useEffect, useState } from 'react';


export default function () {
  const [count1, setCount1] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);
  const [count3, setCount3] = useState<number>(0);

  useEffect(() => {
    setCount1(1);
    setCount2(2);
  }, []);

  useEffect(() => {
    setCount3(3);
  }, []);

  console.log(333);

  return (
    <div>242</div>
  );
}
