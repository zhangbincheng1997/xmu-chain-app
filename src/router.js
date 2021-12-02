import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
      title: 'XMU-食品溯源'
    }
  },
  {
    name: 'info',
    component: () => import('./view/info'),
    meta: {
      title: 'XMU-基本信息'
    }
  },
  {
    name: 'operate',
    component: () => import('./view/operate'),
    meta: {
      title: 'XMU-溯源情况'
    }
  },
  {
    name: 'check',
    component: () => import('./view/check'),
    meta: {
      title: 'XMU-防伪查询'
    }
  },
  {
    name: 'browser',
    component: () => import('./view/browser'),
    meta: {
      title: 'XMU-区块链浏览器'
    }
  },
  {
    name: 'transDetail',
    component: () => import('./view/transDetail'),
    meta: {
      title: 'XMU-交易详情'
    }
  },
  {
    name: 'userDetail',
    component: () => import('./view/userDetail'),
    meta: {
      title: 'XMU-用户详情'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
