import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import routeList, { RouteItem } from 'src/config/router.config';

const supportsHistory = 'pushState' in window.history;
type RouteTransform = (list: RouteItem[], path?: string) => Promise<any[]>;

const routeTransform: RouteTransform = async (list, path = '') => {
  let routerList = [];
  for (let i = 0; i < list.length; i++) {
    const route = list[i];
    if (route.redirect) {
      routerList.push(
        <Redirect exact from={path + route.path} to={path + route.redirect} key={path + route.path} />,
      );
      continue;
    }
    if (route.component) {
      const file = await import('src/pages/' + route.component);
      const Component = file.default;
      let children = null;
      let exact = true;
      if (route.routes) {
        exact = false;
        children = await routeTransform(route.routes, path + route.path);
      }
      routerList.push(
        <Route
          exact={exact}
          sensitive
          component={() =>
            <Component>
              {children}
            </Component>
          }
          path={path + route.path}
          key={path + route.path}
        />,
      );
      continue;
    }
    if (route.routes) {
      routerList = routerList.concat(await routeTransform(route.routes, path + route.path));
      continue;
    }
  }
  return routerList;
};

export default async () => {
  const children = await routeTransform(routeList);
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
