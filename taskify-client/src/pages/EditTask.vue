<template>
    <div class="container">
      <h2>Edit Task</h2>
      <form @submit.prevent="updateTask">
        <input v-model="title" type="text" placeholder="Task Title" required />
        <textarea v-model="description" placeholder="Task Description" required></textarea>
        <input v-model="dueDate" type="datetime-local" required />
        <select v-model="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Update Task</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  
  export default {
    data() {
      return {
        taskId: this.$route.params.id,
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
      };
    },
    async created() {
      this.fetchTask();
    },
    methods: {
      async fetchTask() {
        try {
          const res = await api.get(`/tasks/${this.taskId}`);
          const task = res.data;
          this.title = task.title;
          this.description = task.description;
          this.dueDate = task.dueDate;
          this.priority = task.priority;
        } catch (error) {
          console.error("Error fetching task", error);
        }
      },
      async updateTask() {
        try {
          await api.put(`/tasks/${this.taskId}`, {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
          });
          this.$router.push("/dashboard");
        } catch (error) {
          console.error("Error updating task", error);
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
  