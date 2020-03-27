import React, { Component } from 'react';
import { Layout } from 'antd';
import menuList from 'src/config/menuList';
import { Header, LeftNav, Footer } from 'src/containers';

const { Content } = Layout;
class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <Header />
          <Layout>
            <LeftNav menuList={menuList} />
            <Layout style={{ padding: '24px 24px 0 24px' }}>
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
