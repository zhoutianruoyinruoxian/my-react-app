import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// import loadable from '@loadable/component';
import App from '../App';

import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Test from 'pages/Test/index';

import Test1 from 'pages/Test1/index';
import FormTest from 'pages/FormTest/index';
import algorithm from 'pages/algorithm';
import TableX from 'pages/ComponentTest/TableX/TableX';
import SelectSearch from 'pages/ComponentTest/SelectSearch/SelectSearch';
import InputFormat from 'pages/ComponentTest/InputFormat/InputFormat';
import Step from 'pages/ComponentTest/Step/Step';
import Gantt from 'pages/ComponentTest/Gantt/Gantt';

import ObserverMode from 'pages/DesignPatterns/ObserverMode';

import Graph from 'pages/DataStructure/Graph';

import NestTest from 'pages/Nest/Test';

const supportsHistory = 'pushState' in window.history;




// const ComponentTest = loadable((props) => import(`pages/ComponentTest${}`));
// console.log(AsyncComponent, 444)

export default (store) => {
  return (
    <BrowserRouter forceRefresh={!supportsHistory}>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/test" component={Test} />
          <Route path="/algorithm" component={algorithm} />
          <Route exact path="/test1" component={Test1} />
          <Route exact path="/formTest" component={FormTest} />

          <Redirect exact path="/ComponentTest" to="/ComponentTest/TableX" />
          <Route exact path="/ComponentTest/TableX" component={TableX} />
          <Route exact path="/ComponentTest/SelectSearch" component={SelectSearch} />
          <Route exact path="/ComponentTest/InputFormat" component={InputFormat} />
          <Route exact path="/ComponentTest/Step" component={Step} />
          <Route exact path="/ComponentTest/Gantt" component={Gantt} />

          <Redirect exact path="/DesignPatterns" to="/DesignPatterns/ObserverMode" />
          <Route exact path="/DesignPatterns/ObserverMode" component={ObserverMode} />

          <Redirect exact path="/DataStructure" to="/DataStructure/Graph" />
          <Route exact path="/DataStructure/Graph" component={Graph} />


          <Route exact path="/Nest/Test" component={NestTest} />

          <Route component={() => (<div>not fond</div>)} />
        </Switch>
      </App>
    </BrowserRouter>
  );
};




// import('src/pages/FormEditor/index.tsx').then(component => {
//   if (!component.default) throw new Error(`Attempted import error: '${componentUrl}' does not contain a default export.`)
//   routList.push(
//     <Route exact component={component.default} />
//   );
// });