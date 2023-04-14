import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import(/* webpackChunkName: "MainLayout" */ '../pages/Login.vue')
  },
  {
    redirect:"/CustomerManage",
    path:"/CustomerManage",
    name: 'MainLayout',
    component: () => import(/* webpackChunkName: "MainLayout" */ '../layouts/MainLayout.vue'),
    children:[
      {
        path: "/Home",
        name: "Home.vue",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/Home.vue"),
      },{
        path: "/WebSocketTest",
        name: "WebSocketTest",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/WebSocketTest.vue"),
      },
      {
        path: "/TableData",
        name: "TableData",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/TableData.vue"),
      },
        {
        path: "/CustomerManage",
        name: "帐无忧用户信息",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/CustomerManage.vue"),
      },
        {
        path: "/UserManage",
        name: "用户管理",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/UserManage.vue"),
      },

    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router