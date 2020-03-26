import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import Home from 'pages/Home/Home';
// import Login from 'pages/Login/Login';
// import Test from 'pages/Test/index';

const supportsHistory = 'pushState' in window.history;

export default (store) => {
  return (
    <BrowserRouter forceRefresh={!supportsHistory}>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/login" component={Login} />
          <Route exact path="/test" component={Test} /> */}

          <Route component={() => (<div>not fond</div>)} />
        </Switch>
      </App>
    </BrowserRouter>
  );
};