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
    name: '测试1',
    icon: <AppstoreOutlined />,
    component: 'AssetRisk',
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
            path: '',
            name: '攻击面管理',
            component: 'AssetRisk/AttackSurfaceManagement',
          },
        ],
      },
      {
        path: '/SecurityBreach',
        name: '测试2',
        component: 'AssetRisk/SecurityBreach/SecurityBreach',
      },
    ],
  },
  {
    path: '/Test',
    name: 'Test',
    routes: [
      {
        path: '/Test0',
        name: 'Test0',
        component: 'Test',
      },
      {
        path: '/AdvancedStep',
        name: 'AdvancedStep',
        component: 'Test/AdvancedStep',
      },
      {
        path: '/Test1',
        name: 'Test1',
        component: 'Test/Test1',
      },
      {
        path: '/Modal',
        name: 'Modal',
        component: 'Test/Modal',
      },
    ],
  },
];

export default menuList;
