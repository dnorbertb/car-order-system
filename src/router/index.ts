import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/en/tesla/model3/'
    },
    {
      path: '/:language/:brand',
      name: 'GlobalView',
      component: () => import('@/views/GlobalView/GlobalView.vue'),
      children: [
        {
          path: ':product/:page?',
          name: 'OrderView',
          component: () => import('@/views/OrderView/OrderView.vue')
        },
        {
          path: 'summary',
          name: 'SummaryView',
          component: () => import('@/views/SummaryView/SummaryView.vue')
        }
      ]
    },

    // 404 Routes
    {
      path: '/404',
      name: 'NotFoundView',
      component: () => import('@/views/NotFoundView/NotFoundView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: { name: 'NotFoundView' },
    },
  ]
})

export default router
