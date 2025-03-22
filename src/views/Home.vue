<template>
  <div class="content">
    <h1>Book Management</h1>

    <div class="book-container">
      <div v-for="book in books" :key="book._id" class="book-card">
        
        <!-- Book Cover -->
        <img :src="book.image" alt="Book Cover" class="book-cover">
        
        <!-- Book Details -->
        <div class="book-info">
          <h2>{{ book.title }}</h2>
          <p class="author">By {{ book.author }}</p>
          <p class="price">${{ book.price }}</p>
          <p class="quantity">Quantity: {{ book.Quantity }}</p>
        </div>

        <!-- Buttons -->
        <div class="btn-group">
          <button @click="editBook(book._id)" class="edit-btn">Edit</button>
          <button @click="confirmDelete(book._id)" class="delete-btn">Delete</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3005/books');
        books.value = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const confirmDelete = async (id) => {
      const confirmAction = window.confirm('Do you want to delete this book?');
      if (confirmAction) {
        deleteBook(id);
      }
    };

    const deleteBook = async (id) => {
      try {
        await axios.delete(`http://localhost:3005/books/${id}`);
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };

    const editBook = (id) => {
      router.push(`/EditBook/${id}`);
    };

    onMounted(fetchBooks);

    return { books, confirmDelete, editBook };
  }
};
</script>
