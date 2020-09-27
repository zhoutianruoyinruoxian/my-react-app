import React, { Component } from 'react';
import { Layout } from 'antd';
import routeList from 'src/config/router.config';
import { LeftNav, Footer } from 'src/containers';
import './config/polyfill/polyfill';

const { Content } = Layout;
class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <LeftNav routeList={routeList} />
          <Layout style={{ position: 'relative' }}>
            <Content>
              {this.props.children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
