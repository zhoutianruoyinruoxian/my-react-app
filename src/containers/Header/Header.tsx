import * as React from 'react';
import { connect } from 'react-redux';
import { mapMutations } from 'src/redux';
import { Layout, Menu, Dropdown, Avatar, Icon } from 'antd';
import './style.scss';

const { Header} = Layout;

interface Iprops {
  userInfo: any
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.app.userInfo,
  };
};

const mapDispatchToProps = () => {
  return {
    getUserInfo: mapMutations.app.getUserInfo,
  };
};


function MainHeader(props: Iprops) {

  const { userInfo } = props;

  const onMenuClick = ({ key }) => {
    // console.log("menu click: ", key)
    // const { dispatch } = props;
    // if (key === 'logout') {
    //   dispatch({
    //     type: 'login/logout',
    //   });
    // }
  };
  
  const menu = (
    <Menu
      className="o"
      selectedKeys={[]}
      onClick={onMenuClick}
      style={{ marginTop: 5 }}
    >
      <Menu.Item key="logout">
        <Icon type="logout" />退出登录
        </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header main-header">
      <a className="logo" >
        {/* <img src={logo} width="140" height="48" /> */}
      </a>
      <div className="header-left">
        <a className="all normal" >总览</a>
      </div>
    </Header>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
