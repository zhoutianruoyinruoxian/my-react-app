import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapMutations } from 'src/redux';
import { Layout, Menu, Dropdown, Avatar, Icon } from 'antd';
import './style.scss';

const { Header } = Layout;

interface Iprops {
  userInfo?: any;
  hideMenu?: boolean;
  toggleMenu?: Function;
}

const mapStateToProps = ({ app, header }) => ({
  userInfo: app.userInfo,
  hideMenu: header.hideMenu,
});

const mapDispatchToProps = () => ({
  getUserInfo: mapMutations.app.getUserInfo,
  toggleMenu: mapMutations.header.toggleMenu,
});


class MainHeader extends Component<Iprops, any> {

  toggleMenu = () => {
    const { hideMenu, toggleMenu } = this.props;
    toggleMenu(!hideMenu);
  }

  render() {

    const { userInfo, hideMenu } = this.props;
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
          <a onClick={this.toggleMenu} >
            <Icon type={`menu-${hideMenu ? 'un' : ''}fold`} />
          </a>
        </div>
      </Header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
