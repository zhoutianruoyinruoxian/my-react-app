import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapMutations } from 'src/redux';
import { Layout, Menu, Dropdown, Avatar, Icon } from 'antd';
import { Breadcrumb } from 'src/containers';
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

    const regionMenu = (
      <Menu>
        <Menu.Item>
          <a>区域1</a>
        </Menu.Item>
        <Menu.Item>
          <a>区域2</a>
        </Menu.Item>
        <Menu.Item>
          <a>区域3</a>
        </Menu.Item>
      </Menu>
    );

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
          <Breadcrumb />
        </div>
        <div className="header-right">
          <Dropdown overlay={regionMenu}>
            <a className="ant-dropdown-link" onClick={e => { console.log(e, 999) }}>
              Hover me <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
