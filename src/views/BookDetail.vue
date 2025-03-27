<template>
  <div class="book-detail">
    <button @click="$router.push('/')" class="back-btn">⬅ Back</button>

    <div v-if="book" class="book-content">
      <!-- Left Section: Book Cover -->
      <div class="book-left">
        <img :src="book.image" alt="Book Cover" class="book-cover">
        <p class="author-text">Follow the author</p>
        <p class="author-name">{{ book.author }}</p>
      </div>

      <!-- Right Section: Book Details -->
      <div class="book-right">
        <h1 class="book-title">{{ book.title }}</h1>
        <p class="author">by <span class="book-author">{{ book.author }}</span></p>
        <p class="price"><strong>Price:</strong> ${{ book.price }}</p>
        <p class="release-text">This book is available now!</p>

        <div class="buy-section">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" v-model="quantity" min="1" :max="book.Quantity" class="quantity-input">
        </div>

        <button class="preorder-btn">Buy Now</button>
        <button class="add-to-list-btn">Add to List</button>

        <div class="book-info-details">
          <p><strong>Description:</strong></p>
          <p class="book-description">{{ book.description }}</p>
        </div>
      </div>
    </div>

    <p v-else>Loading book details...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const book = ref(null);
    const quantity = ref(1);

    const token = localStorage.getItem('token');

    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/books/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        book.value = response.data;
      } catch (error) {
        console.error('Error fetching book details:', error);
        if (error.response && error.response.status === 401) {
          alert('You need to login to view this page.');
          router.push('/');
        }
      }
    };

    onMounted(fetchBookDetail);

    return { book, quantity };
  },
};
</script>

<style>
/* General Styling */
.book-detail {
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  min-height: 100vh;
}

/* Back Button */
.back-btn {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #0056b3;
}

/* Book Content Layout */
.book-content {
  display: flex;
  max-width: 900px;
  background: #fff;
  color: #000;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  gap: 20px;
}

/* Left Section: Book Cover */
.book-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #ddd;
  padding-right: 20px;
}

.book-cover {
  width: 220px;
  height: 330px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.author-text {
  font-size: 14px;
  color: #555;
}

.author-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* Right Section: Book Details */
.book-right {
  flex: 2;
  padding-left: 20px;
  text-align: left;
}

.book-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.book-author {
  color: #007bff;
  font-weight: bold;
}

.price {
  font-size: 22px;
  color: #d9534f;
  margin: 15px 0;
}

.release-text {
  color: green;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Buy Section */
.buy-section {
  margin-bottom: 20px;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Buttons */
.preorder-btn,
.add-to-list-btn {
  background: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  width: 100%;
  transition: background 0.3s ease;
}

.preorder-btn:hover {
  background: #0056b3;
}

.add-to-list-btn {
  background: #28a745;
}

.add-to-list-btn:hover {
  background: #218838;
}

/* Book Description */
.book-info-details {
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 15px;
}

.book-description {
  font-size: 16px;
  color: #444;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .book-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 15px;
  }

  .book-left {
    border-right: none;
    padding-right: 0;
  }

  .book-right {
    padding-left: 0;
  }
}
</style>