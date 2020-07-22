import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import routeList, { RouteItem } from 'src/config/router.config';

const supportsHistory = 'pushState' in window.history;
type RouteTransform = (list: RouteItem[], path?: string, nest?: boolean) => Promise<any[]>;

const routeTransform: RouteTransform = async (list, path = '', nest) => {
  let routerList = [];
  for (let i = 0; i < list.length; i++) {
    const route = list[i];
    if (route.redirect) {
      routerList.push(
        <Redirect exact from={route.path} to={path + route.redirect} key={route.path} />,
      );
      continue;
    }
    if (route.component) {
      const file = await import('src/pages/' + route.component);
      let childRoutes = null;
      if (route.routes) {
        childRoutes = await routeTransform(route.routes, '.', true);
      }
      console.log(path + route.path, 3333333)
      routerList.push(
        <Route
          exact={!nest}
          sensitive
          component={file.default}
          path={path + route.path}
          key={path + route.path}
        >
          {childRoutes}
        </Route>,
      );
      continue;
    }
    if (route.routes) {
      routerList = routerList.concat(await routeTransform(route.routes, path + route.path));
      continue;
    }
  }
  console.log(routerList, 9999999999)
  return routerList;
};

export default async (store) => {
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
