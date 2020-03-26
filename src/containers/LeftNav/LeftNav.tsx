import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import isEqual from 'lodash-es/isEqual';
import './style.scss';

const { Sider } = Layout;

const initialState = {
  openKeys: [],
  selectedKeys: [],
}

type Istate = Readonly<typeof initialState>;

class LeftNav extends React.PureComponent<any, Istate> {
  readonly state: Istate = initialState;

  componentDidMount() {
    const MenuKey = this.getMenuKey(this.props.location.pathname);
    this.setMenu(MenuKey);
  }

  componentWillReceiveProps(nextProps: any) {
    const oldMenuKey = this.getMenuKey(this.props.location.pathname);
    const newMenuKey = this.getMenuKey(nextProps.location.pathname);
    if (isEqual(oldMenuKey, newMenuKey)) return;
    this.setMenu(newMenuKey);
  }

  setMenu=(menuKeys)=>{
    const selectedKeys = this.addUp(menuKeys);
    this.setState({
      openKeys: [selectedKeys[0]],
      selectedKeys: selectedKeys,
    })
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
    })
  }

  onOpenChange = (openKeys: string[]) => {
    this.setState({
      openKeys,
    })
  }


  getMenuKey = (path: string) => path.match(/\/[a-zA-Z0-9]*/g);

  render() {
    const { selectedKeys, openKeys } = this.state;
    const { menuList } = this.props;
    return (
      <Sider width={160} style={{ background: '#fff' }}>
        <Menu
          className="left-nav-menu"
          theme="dark"
          mode="inline"
          onOpenChange={this.onOpenChange}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
        >
          {menuList.map(subMenu => (
            subMenu.children ?
              <Menu.SubMenu
                key={subMenu.path}//SubMenu的key值针对的是openKeys
                title={
                  <span>
                    {subMenu.icon && <Icon type={subMenu.icon} />}
                    {subMenu.text}
                  </span>
                }
              >
                {subMenu.children.map(o => (
                  <Menu.Item
                    key={subMenu.path + o.path}//Item的key值针对的是selectedKeys
                  >
                    <Link to={subMenu.path + o.path}>
                      {o.icon && <Icon type={o.icon} />}
                      {o.text}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu> :
              <Menu.Item
                key={subMenu.path}
              >
                <Link to={subMenu.path}>
                  {subMenu.icon && <Icon type={subMenu.icon} />}
                  {subMenu.text}
                </Link>
              </Menu.Item>
          ))
          }
        </Menu>
      </Sider >
    );
  }
}

export default withRouter(LeftNav);
