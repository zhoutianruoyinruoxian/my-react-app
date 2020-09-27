import React, { useState } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { isPromise } from '../_utils';

type E = React.MouseEvent<HTMLElement, MouseEvent>;

interface AsyncButtonProps extends ButtonProps {
  onClick?: (e: E) => Promise<any>;
  delay?: number;
}

export default function AsyncButton(props: AsyncButtonProps) {
  const { onClick, delay, ...args } = props;
  const [loading, setLoading] = useState(false as ButtonProps['loading']);

  const handleClick = (e: E) => {
    const res = onClick(e);
    if (isPromise(res)) {
      setLoading({ delay });
      res.finally(() => {
        setLoading(false);
      });
    }
  };

  return (
    <Button
      {...args}
      onClick={handleClick}
      loading={loading}
    />
  );
}

AsyncButton.defaultProps = {
  delay: 0,
  onClick() { },
};
