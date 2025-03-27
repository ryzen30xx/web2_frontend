<template>
    <div class="user-management">
        <h1>User Management</h1>
        <div class="controls">
            <button @click="$router.push('/')" class="btn">⬅ Back</button>
            <input v-model="searchQuery" placeholder="Search" />
            <button class="btn primary" @click="fetchUsers">Reload</button>
            <button class="btn success" @click="openAddUserModal">Add User</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in filteredUsers" :key="user._id">
                    <td>{{ user._id }}</td>
                    <td>{{ user.username }}</td>
                    <td>
                        <button class="btn danger" @click="deleteUser(user._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showAddUserModal" class="modal-overlay">
            <div class="modal">
                <h2>Add User</h2>
                <input v-model="newUser.username" placeholder="Username" />
                <input v-model="newUser.password" type="password" placeholder="Password" />
                <div class="modal-actions">
                    <button class="btn success" @click="addUser">Add</button>
                    <button class="btn secondary" @click="closeModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: [],
            searchQuery: '',
            showAddUserModal: false,
            newUser: {
                username: '',
                password: '',
                role: 'user'
            }
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user =>
                user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3005/auth/users');
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async addUser() {
            try {
                await axios.post('http://localhost:3005/auth/register', this.newUser);
                this.fetchUsers();
                this.closeModal();
            } catch (error) {
                console.error('Error adding user:', error);
            }
        },
        async deleteUser(id) {
            if (confirm('Are you sure you want to delete this user?')) {
                try {
                    await axios.delete(`http://localhost:3005/auth/users/${id}`);
                    this.fetchUsers();
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            }
        },
        openAddUserModal() {
            this.showAddUserModal = true;
        },
        closeModal() {
            this.showAddUserModal = false;
            this.newUser = { username: '', password: '', role: 'user' };
        }
    },
    mounted() {
        this.fetchUsers();
    }
};
</script>

<style scoped>
.user-management {
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    color: #ffffff;
}

.controls {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
}

.controls input {
    padding: 8px;/* General Styling */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #222;
    color: #fff;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

/* Navbar */
.navbar {
    background-color: #007bff;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.navbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Buttons */
button, .btn {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s, transform 0.2s;
}

button:hover, .btn:hover {
    opacity: 0.9;
}

.add-btn {
    background-color: #fff;
    color: #007bff;
    font-weight: bold;
}

.add-btn:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
}

.edit-btn {
    background-color: #ffc107;
    color: #000;
}

.delete-btn {
    background-color: #dc3545;
    color: #fff;
}

.submit-btn {
    background-color: #28a745;
    color: white;
}

.submit-btn:hover {
    background-color: #218838;
}

.cancel-btn {
    background-color: #dc3545;
    color: white;
}

.cancel-btn:hover {
    background-color: #c82333;
}

/* Search Bar */
.search-input {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 180px;
    font-size: 14px;
    transition: border-color 0.3s;
}

.search-input:focus {
    border-color: #007bff;
    outline: none;
}

.search-button {
    background-color: #007bff;
    color: #fff;
}

.search-button:hover {
    background-color: #0056b3;
}

/* Main Content */
.content {
    padding-top: 80px;
    text-align: center;
}

/* Book Container */
.book-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    width: 100%;
}

.book-card {
    display: flex;
    align-items: center;
    background-color: #333;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    justify-content: space-between;
    transition: transform 0.2s, box-shadow 0.2s;
    width: 80%;
    max-width: 600px;
}

.book-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.book-cover {
    width: 100px;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
}

.book-info {
    flex: 1;
    text-align: left;
}

.book-info h2 {
    font-size: 20px;
    margin: 5px 0;
    color: #fff;
}

/* Form Panel */
.form-panel {
    max-width: 800px;
    margin: 50px auto;
    padding: 30px;
    border-radius: 12px;
    background: #3a3a3a;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
    text-align: center;
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

input:focus, textarea:focus {
    background-color: #333;
    box-shadow: 0 0 5px #007bff;
}

/* Table */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

tbody tr:hover {
    background-color: #f1f1f1;
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    width: 300px;
}

.modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

/* Responsive Design */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        text-align: center;
        padding: 10px;
    }

    .navbar-right {
        margin-top: 10px;
    }

    .search-input {
        width: 100%;
    }

    .book-card {
        flex-direction: column;
        align-items: flex-start;
    }

    .book-cover {
        margin-bottom: 10px;
    }

    .form-panel {
        width: 90%;
        padding: 20px;
    }

    .btn-group {
        flex-direction: column;
    }

    .submit-btn, .cancel-btn {
        width: 100%;
    }
}

    border: 1px solid #ccc;
    border-radius: 4px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f910;
}

tbody tr:hover {
    background-color: #f1f1f10e;
}

.btn {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn.primary {
    background-color: #007bff;
    color: white;
}

.btn.success {
    background-color: #28a745;
    color: white;
}

.btn.danger {
    background-color: #dc3545;
    color: white;
}

.btn.secondary {
    background-color: #6c757d;
    color: white;
}

.btn:hover {
    opacity: 0.9;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    width: 300px;
}

.modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>