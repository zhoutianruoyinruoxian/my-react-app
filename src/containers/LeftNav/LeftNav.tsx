import React, { PureComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import isEqual from 'lodash-es/isEqual';
import { RouteItem } from 'src/config/router.config';
import './style.scss';

const { Sider } = Layout;

interface LeftNavProps {
  routeList?: RouteItem[];
  hideMenu?: boolean;
}

const initialState = {
  openKeys: [],
  selectedKeys: [],
};

type Istate = Readonly<typeof initialState>;

@connect(({ header: { hideMenu } }) => ({
  hideMenu,
}))
class LeftNav extends PureComponent<LeftNavProps & RouteComponentProps, Istate> {
  readonly state: Istate = initialState;
  componentDidMount() {
    const MenuKey = this.getMenuKey(this.props.location.pathname);
    this.setMenu(MenuKey);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    const oldMenuKey = this.getMenuKey(this.props.location.pathname);
    const newMenuKey = this.getMenuKey(nextProps.location.pathname);
    if (isEqual(oldMenuKey, newMenuKey)) return;
    this.setMenu(newMenuKey);
  }

  setMenu = (menuKeys) => {
    const selectedKeys = this.addUp(menuKeys);
    this.setState({
      openKeys: [selectedKeys[0]],
      selectedKeys: selectedKeys,
    });
  }

  addUp(list: Array<string>) {
    let all: string;
    return list.map((o, i) => {
      if (i === 0) {
        all = o;
      }
      if (i > 0) {
        (all as string) += o;
      }
      return all;
    });
  }

  onOpenChange = (openKeys: string[]) => {
    this.setState({
      openKeys,
    });
  }

  getMenuKey = (path: string) => path.match(/\/[a-zA-Z0-9]*/g);


  generateMenuDom = (routeList: LeftNavProps['routeList'], subMenu = true, subPath = ''): ReactNode[] => {
    let menuList: ReactNode[] = [];
    let menuListItem: ReactNode;
    routeList.forEach(route => {
      if (!route.name || route.hideInMenu) return;
      if (subMenu && route.routes && !route.hideChildrenInMenu) {
        const childMenuList = this.generateMenuDom(route.routes, false, route.path);
        menuListItem = (
          <Menu.SubMenu
            key={route.path}//SubMenu的key值针对的是openKeys
            title={
              <span>
                {route.icon && <Icon type={route.icon} />}
                <span>{route.name}</span>
              </span>
            }
          >
            {childMenuList}
          </Menu.SubMenu>
        );
      } else {
        menuListItem = (
          <Menu.Item
            key={subPath + route.path}//Item的key值针对的是selectedKeys
          >
            <Link to={subPath + route.path}>
              {route.icon && <Icon type={route.icon} />}
              <span>{route.name}</span>
            </Link>
          </Menu.Item>
        );
      }
      menuList.push(menuListItem);
    });
    return menuList;
  }

  render() {
    const { selectedKeys, openKeys } = this.state;
    const { routeList, hideMenu } = this.props;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={hideMenu}
      >
        <Menu
          className="left-nav-menu"
          theme="dark"
          mode="inline"
          onOpenChange={this.onOpenChange}
          selectedKeys={hideMenu ? null : selectedKeys}
          openKeys={hideMenu ? null : openKeys}
        >
          {this.generateMenuDom(routeList)}
        </Menu>
      </Sider >
    );
  }
}

export default withRouter(LeftNav);
