import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    { path: '/', component: Login, name: 'login' },
    {
      path: '/user/:userId',
      component: () => import('../components/users/Index.vue'),
      name: 'user',
      props: (route) => {
        return {
          userId: route.params.userId
        }
      },
    },
    {
      path: '/user/:userId/delmovement/:movementId',
      component: () => import('../components/users/movements/Delete.vue'),
      name: 'deletemovement',
      props: (route) => {
        return {
          movementId: route.params.movementId,
          userId: route.params.userId,
        }

      }
    },
    {
      path: '/user/addmovement/:userId',
      component: () => import('../components/users/movements/New.vue'),
      name: 'addmovement',
      props: (route) => {
        return {
          userId: route.params.userId,
        }

      }
    },
  ]
});

// Si se refresca estando en otra ruta, regresa a la inicial


export default router;

