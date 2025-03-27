<template>
  <div class="navbar">
    <div class="logo">Book Stores Management</div>

    <div class="navbar-right">
      <button @click="goBack" class="add-btn">Home</button>
    </div>
  </div>

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
        <input type="number" v-model.number="book.price" required />
      </div>

      <div class="form-group">
        <label>Quantity:</label>
        <input type="number" v-model.number="book.Quantity" required />
      </div>

      <div class="btn-group">
        <button type="submit" class="submit-btn">Add Book</button>
        <button type="button" @click="goBack" class="cancel-btn">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const router = useRouter();

    // ✅ Match field names exactly as in MongoDB (`Quantity` instead of `quantity`)
    const book = ref({
      title: "",
      description: "",
      author: "",
      image: "",
      price: 0,
      Quantity: 0, // <-- Fixed field name
    });

    // ✅ Function to get token from localStorage
    const getToken = () => localStorage.getItem("token");

    const addBook = async () => {
      try {
        const token = getToken();
        if (!token) {
          alert("User is not authenticated!");
          return;
        }

        console.log("Sending Book Data:", JSON.stringify(book.value, null, 2));

        // ✅ Send request with JWT token & JSON content type
        await axios.post(
          "http://localhost:3005/books",
          book.value,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert("Book added successfully!");
        router.push("/");
      } catch (error) {
        alert("Error adding book!");
        console.error("Error adding book:", error);
      }
    };

    const goBack = () => {
      router.push("/");
    };

    return { book, addBook, goBack };
  },
};
</script>
