<template>
      <div class="form-panel">
        <h1 class="title">Add a New Book</h1>
  
        <form @submit.prevent="addBook" class="form-content">
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
            <button type="submit" class="submit-btn">Add Book</button>
            <button @click="goBack" class="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
  
      const book = {
        title: '',
        description: '',
        author: '',
        image: '',
        price: '',
        Quantity: ''
      };
  
      const addBook = async () => {
        try {
          await axios.post('http://localhost:3005/books', book);
          alert('Book added successfully!');
          router.push('/'); // Redirect to home after adding
        } catch (error) {
            alert('Error adding book!');
            console.error('Error adding book:', error);
        }
      };
  
      const goBack = () => {
        router.push('/');
      };
  
      return { book, addBook, goBack };
    }
  };
  </script>
  
<style>
/* Form Panel */
.form-panel {
  width: 60%; /* Adjusted for better fit */
  max-width: 800px; /* Maximum size limit */
  min-width: 600px; /* Prevents shrinking too much */
  margin: 50px auto;
  padding: 30px;
  border-radius: 12px;
  background: #3a3a3a;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
}

/* Title */
.title {
  text-align: center;
  color: white;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Form Fields */
.form-group {
  margin-bottom: 15px;
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

/* Description Field */
textarea {
  resize: none;
  height: 150px; /* Adjusted height */
}

/* Input Focus Effect */
input:focus, textarea:focus {
  background-color: #333;
  box-shadow: 0 0 5px #007bff;
}

/* Buttons */
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
  transition: background 0.3s;
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
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #218838;
}

.cancel-btn:hover {
  background-color: #c82333;
}

/* Responsive Fix */
@media (max-width: 1024px) {
  .form-panel {
    width: 80%;
    min-width: 500px;
  }
}

@media (max-width: 768px) {
  .form-panel {
    width: 90%;
    min-width: unset;
    padding: 20px;
  }

  .btn-group {
    flex-direction: column;
  }

  .submit-btn, .cancel-btn {
    width: 100%;
  }
}

</style>