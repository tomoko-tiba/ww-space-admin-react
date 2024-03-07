export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { name: '用户管理', icon: 'table', path: '/user-list', component: './UserList' },
  { name: '作品管理', icon: 'crown', path: '/work', 
    routes: [
      { path: '/work', redirect: '/work/list' },
      { path: '/work/list', name:'作品列表', component: './Work' },
      { path: '/work/create', name:'新建作品', component: './Work/Edit' },
      { path: '/work/update/:id', name:'更新作品', component: './Work/Edit', hideInMenu: true },
    ] },
    { name: '分类管理', icon: 'table', path: '/category', component: './CategoryList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
