<template>
    <div class="auth-wrapper">
      <div class="auth-inner">
        <form @submit.prevent="register" class="animated ">
          <h3 class="text-center mb-4">Sign Up</h3>
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="name" type="text" class="form-control" placeholder="Enter full name" required />
          </div>
          <div class="form-group mt-3">
            <label>Email address</label>
            <input v-model="email" type="email" class="form-control" placeholder="Enter email" required />
          </div>
          <div class="form-group mt-3">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" placeholder="Enter password" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block w-100 mt-4">Sign Up</button>
          <p class="text-center mt-3">
            Already have an account? <router-link to="/login">Sign In</router-link>
          </p>
        </form>
      </div>
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
  
  <style scoped>
  .auth-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f8f9fa;
  }
  
  .auth-inner {
    width: 450px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }
  
  .auth-inner h3 {
    color: #fe424d;
  }
  
  .form-control:focus {
    border-color: #fe424d;
    box-shadow: none;
  }
  
  .btn-primary {
    background-color: #fe424d;
    border-color: #fe424d;
  }
  
  .btn-primary:hover {
    background-color: #e63b45;
    border-color: #e63b45;
  }
  
  .animated {
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }
  

  </style>
  
  