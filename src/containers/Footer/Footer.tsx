import * as React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default () => (
  <Footer
    style={{
      textAlign: 'center',
      padding: '12px',
      color: 'rgba(0,0,0,0.45)',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    }}
  >
    made by zhoutian
  </Footer >
);
