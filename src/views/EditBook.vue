<template>
    <div class="form-panel">
      <h1 class="title">Edit Book</h1>
  
      <form @submit.prevent="updateBook">
        <div class="form-group">
          <label>Title:</label>
          <input type="text" v-model="book.title" required />
        </div>
  
        <div class="form-group">
          <label>Description:</label>
          <textarea v-model="book.description" rows="5" required></textarea>
        </div>
  
        <div class="form-group">
          <label>Author:</label>
          <input type="text" v-model="book.author" required />
        </div>
  
        <div class="form-group">
          <label>Image URL:</label>
          <input type="text" v-model="book.image" required />
        </div>
  
        <div class="form-group">
          <label>Price ($):</label>
          <input type="number" v-model="book.price" required />
        </div>
  
        <div class="form-group">
          <label>Quantity:</label>
          <input type="number" v-model="book.Quantity" required />
        </div>
  
        <div class="btn-group">
          <button type="submit" class="submit-btn">Save Changes</button>
          <button @click="goBack" class="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const router = useRouter();
      const route = useRoute();
      const book = ref({});
  
      const fetchBook = async () => {
        try {
          const response = await axios.get(`http://localhost:3005/books/${route.params.id}`);
          book.value = response.data;
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };
  
      const updateBook = async () => {
        try {
          await axios.put(`http://localhost:3005/books/${route.params.id}`, book.value);
          alert('Book updated successfully!');
          router.push('/');
        } catch (error) {
          console.error('Error updating book:', error);
        }
      };
  
      const goBack = () => {
        router.push('/');
      };
  
      onMounted(fetchBook);
  
      return { book, updateBook, goBack };
    }
  };
  </script>
  
  <style>
  .form-panel {
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 12px;
    background: #3a3a3a;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
    text-align: center;
  }
  
  .title {
    color: white;
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    color: white;
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 16px;
  }
  
  input, textarea {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: none;
    background-color: #222;
    color: white;
    font-size: 16px;
    outline: none;
    transition: 0.3s;
  }
  
  textarea {
    resize: none;
    height: 150px;
  }
  
  .btn-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
  }
  
  .submit-btn {
    background-color: #28a745;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    width: 48%;
  }
  
  .cancel-btn {
    background-color: #dc3545;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    width: 48%;
  }
  
  .submit-btn:hover {
    background-color: #218838;
  }
  
  .cancel-btn:hover {
    background-color: #c82333;
  }
  </style>
  