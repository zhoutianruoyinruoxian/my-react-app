import React, { useState } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { isPromise } from '../_utils';

type E = React.MouseEvent<HTMLElement, MouseEvent>;

interface AsyncButtonProps extends ButtonProps {
  onClick?: (e: E) => Promise<any> | any;
  delay?: number;
}

export default function AsyncButton(props: AsyncButtonProps) {
  const { onClick, delay, loading: propsLoading, ...args } = props;
  const [loading, setLoading] = useState(false as ButtonProps['loading']);
  /*
   * 如果设置了delay,则按钮会延迟进入loading，这期间还是可以点击的，
   * 所以为了防止重复点击，需要用到disabled来隐式阻止onLick事件
   */
  const [disabled, setDisabled] = useState(false);

  const handleClick = (e: E) => {
    if (disabled) return;
    const res = onClick(e);
    if (isPromise(res)) {
      setLoading({ delay });
      setDisabled(true);
      res.finally(() => {
        setLoading(false);
        setDisabled(false);
      });
    }
  };

  return (
    <Button
      {...args}
      onClick={handleClick}
      loading={(propsLoading && { delay }) || loading}
    />
  );
}

AsyncButton.defaultProps = {
  delay: 200,
  onClick() { },
};
