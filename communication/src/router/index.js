import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [
        // 首页
        {path: '/', name: 'home', component: () => import('../pages/index')},
        //  组件通信 props
        {path: '/props', name: 'props', component: () => import('../pages/Props/Father')},
        //  局部刷新
        {path: '/refresh', name: 'refresh', component: () => import('../pages/PartialRefresh/Father')},
    ]
})
