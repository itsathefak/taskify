<template>
    <div class="container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Full Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
      };
    },
    methods: {
      async register() {
        try {
          const res = await api.post("/auth/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
  
          alert("Registration successful! Please login.");
          this.$router.push("/login");
        } catch (error) {
          console.error(error.response?.data?.message || "Registration failed");
        }
      },
    },
  };
  </script>
  