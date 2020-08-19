import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import Router from './routes';
import store, { reducers } from 'src/redux';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './style/index.scss';

moment.locale('zh-cn'); // 设置moment全局语言

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./redux', () => store.replaceReducer(reducers));
}
const renderApp = async () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Router store={store} />
      </ConfigProvider>
    </Provider>
    , document.getElementById('root'),
  );
};
renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
