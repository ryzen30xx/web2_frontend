<template>
    <div class="landing-page">
        <div class="content">
            <div class="slogan">
                <h1>Welcome to <span>Book Management System</span></h1>
            </div>
            <div class="purpose">
                <p>This website is exclusively for bookstore employees.</p>
            </div>
            <button @click="signin" class="sign-in-button">Sign In</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        signin() {
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.landing-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: #fff;
    font-family: 'Arial', sans-serif;
}

.content {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.slogan h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #fff;
}

.slogan h1 span {
    color: #ffdd57;
}

.purpose {
    font-size: 1.2rem;
    margin-bottom: 30px;
    color: #f0f0f0;
}

.sign-in-button {
    padding: 12px 25px;
    font-size: 1rem;
    color: #007bff;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.sign-in-button:hover {
    background-color: #ffdd57;
    color: #0056b3;
    transform: scale(1.05);
}
</style>