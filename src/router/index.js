import { createRouter, createWebHashHistory,createWebHistory} from "vue-router";


let routes= [
    {
      path:'/login',
      component:()=>import('../view/Login.vue')
    },
    {
        path: '/',
        name: 'home',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('../view/homeView.vue')
    },{
        path: '/test',
        name: 'test',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('../view/Test.vue')
    },
    //{
    //配置404页面
    //path: '/:catchAll(.*)',
    //name: '404',
    //component: () => import(''),
    //}
]
// 路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 导出
export default router
