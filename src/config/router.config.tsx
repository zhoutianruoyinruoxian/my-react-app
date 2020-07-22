import React from 'react';
import {
  AppstoreOutlined,
} from '@ant-design/icons';

export interface RouteItem {
  path: string;
  name?: string;
  icon?: React.ReactNode;
  redirect?: string;
  component?: string;
  routes?: Array<RouteItem>;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
}

const menuList: Array<RouteItem> = [
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/Home',
    name: '首页',
    icon: <AppstoreOutlined />,
    component: 'Home/Home',
  },
  {
    path: '/AssetRisk',
    name: '资产风险',
    icon: <AppstoreOutlined />,
    routes: [
      {
        path: '/',
        redirect: '/AttackSurfaceManagement',
      },
      {
        path: '/AttackSurfaceManagement',
        name: '哈哈哈',
        icon: <AppstoreOutlined />,
        routes: [
          {
            path: '/index',
            name: '攻击面管理',
            component: 'AssetRisk/AttackSurfaceManagement',
          },
        ],
      },
      {
        path: '/SecurityBreach',
        name: '安全漏洞',
        component: 'AssetRisk/SecurityBreach/SecurityBreach',
      },
    ],
  },
];

export default menuList;
