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
    name: 'grow',
    component: () => import('./view/grow'),
    meta: {
      title: 'XMU-生长情况'
    }
  },
  {
    name: 'farm',
    component: () => import('./view/farm'),
    meta: {
      title: 'XMU-农事情况'
    }
  },
  {
    name: 'process',
    component: () => import('./view/process'),
    meta: {
      title: 'XMU-加工情况'
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
    name: 'blockchain',
    component: () => import('./view/blockchain'),
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
