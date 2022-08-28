import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/kpiBlock',
    name: 'kpiBlock',
    component: () => import('../views/KpiBlock-demo.vue')
  },
  {
    path: '/title',
    name: 'title',
    component: () => import('../views/Title-demo.vue')
  },
  {
    path: '/textarea',
    name: 'textarea',
    component: () => import('../views/Textarea-demo.vue')
  },
  {
    path: '/modifyUser',
    name: 'modifyUser',
    component: () => import('../views/ModifyUser-demo.vue')
  },
  {
    path: '/editPwd',
    name: 'editPwd',
    component: () => import('../views/EditPwd-demo.vue')
  },
  {
    path: '/newModifyUser',
    name: 'newModifyUser',
    component: () => import('../views/NewModifyUser-demo.vue')
  },
  {
    path: '/newEditPwd',
    name: 'newEditPwd',
    component: () => import('../views/NewEditPwd-demo.vue')
  },
  {
    path: '/slideCode',
    name: 'slideCode',
    component: () => import('../views/SlideCode-demo.vue')
  },
  {
    path: '/filterMenu',
    name: 'filterMenu',
    component: () => import('../views/FilterMenu-demo.vue')
  },
  {
    path: '/textNote',
    name: 'textNote',
    component: () => import('../views/TextNote-demo.vue')
  },
  {
    path: '/indicatorTrend',
    name: 'indicatorTrend',
    component: () => import('../views/IndicatorTrend-demo.vue')
  },
  {
    path: '/richText',
    name: 'richText',
    component: () => import('../views/richText-demo.vue')
  },
  {
    path: '/shape',
    name: 'shape',
    component: () => import('../views/Shape-demo.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('../views/Form-demo.vue')
  },
  {
    path: '/workFlow',
    name: 'workFlow',
    component: () => import('../views/WorkFlow-demo.vue')
  }
  // {
  //   path: '/indicatorCard',
  //   name: 'indicatorCard',
  //   component: () => import('../views/IndicatorCard-demo.vue')
  // }
];

const router = new VueRouter({
  routes
});

export default router;
