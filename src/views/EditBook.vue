<template>
  <div class="navbar">
    <div class="logo">Book Stores Management</div>
    <div class="navbar-right">
      <button @click="goBack" class="add-btn">Home</button>
    </div>
  </div>

  <div v-if="loading" class="loading">Loading book details...</div>

  <div v-else class="form-panel">
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
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const book = ref({
      title: "",
      description: "",
      author: "",
      image: "",
      price: 0,
      Quantity: 0,
    });
    const loading = ref(true);

    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (!token) {
          throw new Error("No token found. Please login.");
        }

        const response = await axios.get(
          `http://localhost:3005/books/${route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token khi request
            },
          }
        );

        book.value = response.data;
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("Failed to load book details.");
        router.push("/");
      } finally {
        loading.value = false;
      }
    };

    const updateBook = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please login.");
        }

        await axios.put(
          `http://localhost:3005/books/${route.params.id}`,
          book.value,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Book updated successfully!");
        router.push("/");
      } catch (error) {
        console.error("Error updating book:", error);
        alert("Failed to update book.");
      }
    };

    const goBack = () => {
      router.push("/");
    };

    onMounted(fetchBook);

    return { book, updateBook, goBack, loading };
  },
};
</script>
