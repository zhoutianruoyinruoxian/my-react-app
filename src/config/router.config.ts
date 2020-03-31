import { ReactNode } from 'react';
import { Content } from 'src/containers';
export interface RouteItem {
  path: string;
  name?: string;
  icon?: string;
  redirect?: string;
  component?: ReactNode;
  routes?: Array<RouteItem>;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
}


const menuList: Array<RouteItem> = [
  {
    path: '/',
    component: Content,
    routes: [
      {
        path: '/Home',
        name: '首页',
        icon: 'home',
        component: 'Home/Home',
      },
      {
        path: '/AssetRisk',
        name: '资产风险',
        icon: 'schedule',
        routes: [
          {
            path: '/AssetRisk',
            redirect: '/AttackSurfaceManagement',
          },
          {
            path: '/AttackSurfaceManagement/:id',
            name: '攻击面管理',
            component: 'AssetRisk/AttackSurfaceManagement',
          },
          {
            path: '/SecurityBreach',
            name: '安全漏洞',
            component: 'AssetRisk/SecurityBreach/SecurityBreach',
          },
        ],
      },
    ]
  },
];

export default menuList;
