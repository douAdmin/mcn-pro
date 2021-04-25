// const wrappers = {
//   auth: '@/middleware/auth'
// }

export default [
  // 仪表盘
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'smile',
    routes: [
      {
        path: 'workbench',
        name: 'workbench',
        icon: 'smile',
        component: './Welcome',
      }
    ]
  },
  {
    path: '/task',
    name: 'task',
    icon: 'smile',
    routes: [
      {
        path: 'must-see',
        name: 'must-see',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: 'apply',
        name: 'apply',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: 'work-report',
        name: 'work-report',
        icon: 'smile',
        component: './Welcome',
      }
    ]
  },
  {
    path: '/statistics',
    name: 'statistics',
    icon: 'smile',
    routes: [
      {
        path: 'like',
        name: 'like',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: 'settlement',
        name: 'settlement',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: 'apply',
        name: 'apply',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: 'person',
        name: 'person',
        icon: 'smile',
        component: './Welcome',
      }
    ]
  },
  {
    path: '/personal',
    name: 'personal',
    title: '个人页',
    icon: 'smile',
    routes: [
      {
        path: 'center',
        name: 'center',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: 'setting',
        name: 'setting',
        title: '个人设置',
        icon: 'smile',
        routes: [
          {
            path: 'base',
            name: 'base',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: 'account',
            name: 'account',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: 'security',
            name: 'security',
            icon: 'smile',
            component: './Welcome',
          },
        ]
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    icon: 'smile',
    routes: [
      {
        path: 'manage-account',
        name: 'manage-account',
        icon: 'smile',
        component: './Welcome',
      }
    ]
  },
  {
    hideInMenu: true,
    path: '/login',
    name: 'login',
    layout: false,
    component: './Login',
  },
  {
    hideInMenu: true,
    path: '/welcome',
    name: 'welcome',
    component: './Welcome'
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    layout: false,
    component: './404'
  }
];
