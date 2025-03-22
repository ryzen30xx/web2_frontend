import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import AddBook from '@/views/AddBook.vue'; // Make sure this file exists in views/
import EditBook from '@/views/EditBook.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/addbook', component: AddBook },
  {path: '/editbook/:id', component: EditBook},
  { path: '/:notFound(.*)', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
