import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import AddBook from '@/views/AddBook.vue';
import EditBook from '@/views/EditBook.vue';
import BookDetail from '@/views/BookDetail.vue';
import LandingPage from '@/views/LandingPage.vue';
import LoginPage from '@/views/Login.vue';

import UserManager from '@/views/UserManagement.vue';
import { compile } from 'vue';

const routes = [
  { path: '/', component: Home },
  { path: '/addbook', component: AddBook },
  { path: '/editbook/:id', component: EditBook},
  { path: '/bookdetail/:id', component: BookDetail},
  { path: '/landing', component: LandingPage},
  { path: '/login', component: LoginPage},
  {path: '/usermanagement', component: UserManager},
  { path: '/:notFound(.*)', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
