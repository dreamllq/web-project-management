import { createMemoryHistory, createRouter } from 'vue-router';
// @ts-ignore
import autoRoutes from '~pages';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      redirect: '/product-management'
    },
    {
      path: '/',
      component: () => import('@/components/layout/index.vue'),
      children: autoRoutes
    }
  ] // `routes: routes` 的缩写
});

export default router;