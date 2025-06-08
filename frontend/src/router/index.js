import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '@/views/NotFound.vue'
import ServerError from '@/views/ServerError.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GuestLayout,
      meta: {
        requireAuth: false,
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/auth/LoginPage.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/auth/RegisterPage.vue'),
        },
        { path: '/500', component: ServerError },
      ],
    },

    {
      path: '/dashboard',
      component: AuthLayout,
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: '/',
          name: 'welcome',
          component: () => import('@/views/auth/ProfilePage.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: AboutView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*', // Catch-all route for 404
      component: GuestLayout,
      children: [{ path: '', component: NotFound }],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  let authenticated = authStore.$state.isAuthenticated

  if (to.meta.requireAuth && !authenticated) {
    next({ name: 'login' })
  } else if (to.name == 'login' && authenticated) {
    next({ name: 'welcome' })
  } else if (to.name == 'register' && authenticated) {
    next({ name: 'welcome' })
  } else if (to.name == 'home' && authenticated) {
    next({ name: 'welcome' })
  } else {
    next()
  }
})

export default router
