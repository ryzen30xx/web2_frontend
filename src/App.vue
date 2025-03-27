<template>
  <div class="app-container">
  </div>
  <router-view />
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, watch } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const publicPages = ['/landing', '/login'];

    const checkAuth = () => {
      const token = localStorage.getItem('token');

      if (token && publicPages.includes(route.path)) {
        router.push('/dashboard');
      } else if (!token && !publicPages.includes(route.path)) {
        router.push('/landing');
      }
    };

    onMounted(checkAuth);
    watch(route, checkAuth);

    return {};
  }
};
</script>
