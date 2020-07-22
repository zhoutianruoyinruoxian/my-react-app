import React, { Component } from 'react';
import { Layout } from 'antd';
import routeList from 'src/config/router.config';
import { LeftNav, Footer } from 'src/containers';

const { Content } = Layout;
class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <Layout>
            <LeftNav routeList={routeList} />
            <Layout style={{position: 'relative' }}>
              <Content>
                {this.props.children}
              </Content>
              <Footer />
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
