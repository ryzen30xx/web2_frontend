<template>
  <div class="app-container">
    <nav class="navbar">
      Book Stores Management
      <button @click="goToAddBook" class="add-btn">Add Book</button>
    </nav>

  </div>
  <router-view />
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const goToAddBook = () => {
      router.push('/addbook'); // Redirects to AddBook.vue
    };

    return { goToAddBook };
  }
};
</script>

