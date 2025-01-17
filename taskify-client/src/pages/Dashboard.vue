<template>
    <div class="container">
      <h2>Your Tasks</h2>
      <button @click="createTask" class="create-task-btn">Create New Task</button>
      <button @click="logout" class="logout-btn">Logout</button> <!-- Logout button -->
      <div v-if="tasks.length === 0">No tasks found.</div>
      <div v-else>
        <div v-for="task in tasks" :key="task._id" class="task-card">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>Due: {{ new Date(task.dueDate).toLocaleDateString() }}</p>
          <p>Priority: {{ task.priority }}</p>
          <p>Status: {{ task.status }}</p>
          <div class="task-actions">
            <button @click="editTask(task._id)">Edit</button>
            <button @click="deleteTask(task._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  
  export default {
    data() {
      return {
        tasks: [],
      };
    },
    created() {
      this.getTasks();
    },
    methods: {
      async getTasks() {
        try {
          const res = await api.get("/tasks");
          this.tasks = res.data;
        } catch (error) {
          console.error("Error fetching tasks", error);
        }
      },
      async createTask() {
        this.$router.push("/create-task");
      },
      async editTask(taskId) {
        this.$router.push(`/edit-task/${taskId}`);
      },
      async deleteTask(taskId) {
        try {
          await api.delete(`/tasks/${taskId}`);
          this.tasks = this.tasks.filter(task => task._id !== taskId);
        } catch (error) {
          console.error("Error deleting task", error);
        }
      },
      logout() {
        // Remove token from localStorage
        localStorage.removeItem("authToken");
        // Redirect to login page
        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    text-align: center;
  }
  
  .create-task-btn,
  .logout-btn {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .logout-btn {
    background-color: #f44336; /* Red color for logout */
  }
  
  .task-card {
    border: 1px solid #ddd;
    padding: 15px;
    margin: 10px 0;
    background-color: #f9f9f9;
  }
  
  .task-actions {
    margin-top: 10px;
  }
  
  button {
    padding: 8px 16px;
    cursor: pointer;
    margin-right: 10px;
  }
  </style>
  