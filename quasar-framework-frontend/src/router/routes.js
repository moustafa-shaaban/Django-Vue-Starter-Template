const routes = [
  {
    path: '/',
    component: () => import('layouts/GuestLayout.vue'),
    meta: {
      requireAuth: false,
    },
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '/login', name: 'login', component: () => import('pages/auth/LoginPage.vue') },
      { path: '/register', name: 'register', component: () => import('pages/auth/RegisterPage.vue') },
      { path: '/500', name: 'error', component: () => import('pages/ServerError.vue') },
    ],
  },
  {
    path: '/true',
    component: () => import('layouts/AuthLayout.vue'),
    meta: {
      requireAuth: false,
    },
    children: [
      { path: '', name: 'welcome', component: () => import('pages/IndexPage.vue') },
      { path: 'profile', name: 'profile', component: () => import('pages/auth/ProfilePage.vue') },
      { path: 'settings', name: 'settings', component: () => import('pages/SettingsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes;
