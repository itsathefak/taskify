<template>
    <div class="container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.post("/auth/login", {
            email: this.email,
            password: this.password,
          });
          const { token } = response.data;
          // Store token in localStorage
          localStorage.setItem("authToken", token);
          // Redirect to dashboard after login
          this.$router.push("/dashboard");
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  
  input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
  }
  
  button {
    padding: 8px 16px;
    cursor: pointer;
  }
  </style>
  