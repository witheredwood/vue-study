import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/props'},
    {   path: '/props', name: 'props', component: () => import('../pages/Props/Father') },
  ]
})
