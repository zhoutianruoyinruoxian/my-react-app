import React, { useState, useEffect, FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from '../App';
import routeTransform from './config';

const supportsHistory = 'pushState' in window.history;


const Router: FC<any> = () => {
  const [children, setChildren] = useState(null);

  useEffect(() => {
    async function fetchRoute() {
      const _children = await routeTransform();
      setChildren(_children);
    }
    if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
      (module as any).hot.accept('./config', async () => {
        console.log('loading HMR...'); // eslint-disable-line
        await fetchRoute();
        console.log('loading success!'); // eslint-disable-line
      });
    }
    fetchRoute();
  }, []);
  return (
    <BrowserRouter forceRefresh={!supportsHistory}>
      <App>
        <Switch>
          {children}
        </Switch>
      </App>
    </BrowserRouter>
  );
};
export default Router;
