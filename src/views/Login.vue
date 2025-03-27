<template>
    <div class="login-container">
        <div class="login-box">
            <h2>Welcome Back</h2>
            <p class="subtitle">Please sign in to continue</p>

            <form @submit.prevent="handleLogin">
                <div class="input-group">
                    <label for="username">Username</label>
                    <input v-model="username" type="text" id="username" placeholder="Enter your username" required />
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
                </div>

                <button type="submit" class="login-button" :disabled="loading">
                    {{ loading ? "Logging in..." : "Login" }}
                </button>

                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const username = ref('');
        const password = ref('');
        const loading = ref(false);
        const errorMessage = ref('');
        const router = useRouter();

        const handleLogin = async () => {
            loading.value = true;
            errorMessage.value = '';

            try {
                const response = await axios.post('http://localhost:3005/auth/login', {
                    username: username.value,
                    password: password.value
                });

                const { token } = response.data;
                if (token) {
                    localStorage.setItem('token', token);
                    router.push('/');
                }
            } catch (error) {
                errorMessage.value = error.response?.data?.message || 'Login failed';
            } finally {
                loading.value = false;
            }
        };

        return { username, password, handleLogin, loading, errorMessage };
    }
};
</script>

<style scoped>
label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: black;
}

</style>