<template>
  <div>
    <!-- Navbar -->
    <div class="navbar">
      <div class="logo">Book Stores Management</div>
      
      <!-- Right-aligned search bar & buttons -->
      <div class="navbar-right">
        <input v-model="searchQuery" type="text" class="search-input" placeholder="Search books...">
        <button @click="addBook" class="add-btn">Add Book</button>
        <button @click="UserManagement" class="add-btn">User Management</button>
        <button @click="logout" class="add-btn">Log Out</button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content">
      <h1>Book Management</h1>

      <div class="book-container">
        <div v-for="book in filteredBooks" :key="book._id" class="book-card" @click="viewBookDetail(book._id)">
          
          <!-- Book Cover -->
          <img :src="book.image" alt="Book Cover" class="book-cover">
          
          <!-- Book Details -->
          <div class="book-info">
            <h2>{{ book.title }}</h2>
            <p class="author">By {{ book.author }}</p>
            <p class="price">${{ book.price }}</p>
            <p class="quantity">Quantity: {{ book.Quantity }}</p>
          </div>

          <!-- Buttons (Prevent Click Event Propagation) -->
          <div class="btn-group">
            <button @click.stop="editBook(book._id)" class="edit-btn">Edit</button>
            <button @click.stop="confirmDelete(book._id)" class="delete-btn">Delete</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import UserManagement from './UserManagement.vue';

export default {
  setup() {
    const router = useRouter();
    const books = ref([]);
    const searchQuery = ref('');
    
    // Kiểm tra nếu user đã đăng nhập
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Nếu chưa đăng nhập, chuyển về login
      return;
    }

    // Gọi API lấy danh sách sách, gửi token để xác thực
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3005/books', {
          headers: { Authorization: `Bearer ${token}` }
        });
        books.value = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    // Đăng xuất
    const logout = () => {
      localStorage.removeItem('token'); // Xóa token
      router.push('/login'); // Điều hướng về trang đăng nhập
    };

    // Điều hướng đến trang chi tiết sách
    const viewBookDetail = (id) => {
      router.push(`/BookDetail/${id}`);
    };

    // Xác nhận xóa sách
    const confirmDelete = async (id) => {
      if (window.confirm('Do you want to delete this book?')) {
        deleteBook(id);
      }
    };

    // Xóa sách, gửi kèm token để xác thực
    const deleteBook = async (id) => {
      try {
        await axios.delete(`http://localhost:3005/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };

    // Điều hướng đến trang chỉnh sửa sách
    const editBook = (id) => {
      router.push(`/EditBook/${id}`);
    };

    // Điều hướng đến trang thêm sách
    const addBook = () => {
      router.push('/AddBook');
    };

    const UserManagement = () => {
      router.push('/UserManagement');
    };

    // Tìm kiếm sách theo tiêu đề
    const filteredBooks = computed(() => {
      return books.value.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    onMounted(fetchBooks);

    return { books, searchQuery, filteredBooks, viewBookDetail, confirmDelete, editBook, addBook, logout, UserManagement };
  }
};
</script>
