<template>
    <div class="create-task-wrapper ">
      <div class="create-task-inner animated fadeInUp">
        <form @submit.prevent="createTask" class="animated fadeIn">
          <h3 class="text-center mb-4">Create New Task</h3>
          <div class="form-group">
            <label>Title</label>
            <input v-model="title" type="text" class="form-control" placeholder="Enter task title" required />
          </div>
          <div class="form-group mt-3">
            <label>Description</label>
            <textarea v-model="description" class="form-control" rows="3" placeholder="Enter task description" required></textarea>
          </div>
          <div class="form-group mt-3">
            <label>Due Date</label>
            <input v-model="dueDate" type="datetime-local" class="form-control" required />
          </div>
          <div class="form-group mt-3">
            <label>Priority</label>
            <select v-model="priority" class="form-control">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-block w-100 mt-4">Create Task</button>
        </form>
      </div>
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
      const token = localStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
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
  .create-task-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 136px); /* Adjust based on header and footer height */
    background: #f8f9fa;
  }
  
  .create-task-inner {
    width: 600px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }
  
  .create-task-inner h3 {
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
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .fadeIn {
    animation-name: fadeIn;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  
  .fadeIn {
    animation-name: fadeIn;
  }
  
  .fadeInLeft {
    animation-name: fadeInLeft;
  }
  
  .fadeInUp {
    animation-name: fadeInUp;
  }
  </style>
  
  