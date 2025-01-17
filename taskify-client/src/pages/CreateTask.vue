<template>
    <div class="container">
      <h2>Create New Task</h2>
      <form @submit.prevent="createTask">
        <input v-model="title" type="text" placeholder="Task Title" required />
        <textarea v-model="description" placeholder="Task Description" required></textarea>
        <input v-model="dueDate" type="datetime-local" required />
        <select v-model="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
    </div>
  </template>
  
  <script>
  import api, { setAuthToken } from "../services/api";
  
  export default {
    data() {
      return {
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
      };
    },
    created() {
      // Set the Authorization header if the token exists
      const token = localStorage.getItem("authToken");
      if (token) {
        setAuthToken(token); // Use the function to set the token in the header
      }
    },
    methods: {
      async createTask() {
        try {
          await api.post("/tasks", {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
          });
          this.$router.push("/dashboard");
        } catch (error) {
          console.error("Error creating task", error);
          alert("Error creating task: " + error.response?.data?.message || error.message);
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
  
  input, textarea, select {
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
  