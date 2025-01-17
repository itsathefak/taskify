<template>
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <router-link class="navbar-brand" to="/dashboard">
            <!-- <img src="/logo.svg" alt="Task Manager Logo" width="30" height="30" class="d-inline-block align-top me-2"> -->
            Task Manager
          </router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/create-task">Create Task</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
    methods: {
      logout() {
        localStorage.removeItem("authToken");
        this.$router.push("/login");
      }
    }
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-brand {
    font-weight: bold;
    color: #fe424d;
  }
  
  .nav-link {
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .nav-link:hover {
    color: #fe424d;
  }
  </style>
  