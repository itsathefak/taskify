<template>
    <div class="dashboard-wrapper">
      <div class="container py-5">
        <h2 class="text-center mb-4 animated fadeIn">Your Tasks</h2>
        <div class="d-flex justify-content-between mb-4 animated fadeInLeft">
          <button @click="createTask" class="btn btn-success">Create New Task</button>
        </div>
        <div v-if="tasks.length === 0" class="alert alert-info animated fadeIn">No tasks found.</div>
        <div v-else class="row">
          <div v-for="task in tasks" :key="task._id" class="col-md-4 mb-4">
            <div class="card shadow-sm h-100 animated fadeInUp" @click="openModal(task)">
              <div class="card-body d-flex flex-column">
                <h3 class="card-title">{{ task.title }}</h3>
                <p class="card-text flex-grow-1">{{ task.description.substring(0, 50) }}...</p>
                <p class="card-text"><strong>Due:</strong> {{ formatDate(task.dueDate) }}</p>
                <p class="card-text">
                  <span :class="getPriorityClass(task.priority)">{{ task.priority }}</span>
                </p>
                <p class="card-text"><strong>Status:</strong> {{ task.status }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Task Details Modal -->
    <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="taskModalLabel">{{ selectedTask?.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Description:</strong> {{ selectedTask?.description }}</p>
            <p><strong>Due:</strong> {{ formatDate(selectedTask?.dueDate) }}</p>
            <p><strong>Priority:</strong> <span :class="getPriorityClass(selectedTask?.priority)">{{ selectedTask?.priority }}</span></p>
            <p><strong>Status:</strong> {{ selectedTask?.status }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="editTask(selectedTask._id)" type="button" class="btn btn-primary">Edit</button>
            <button @click="deleteTask(selectedTask._id)" type="button" class="btn btn-danger">Delete</button>
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
        selectedTask: null, // Store the selected task for the modal
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
      createTask() {
        this.$router.push("/create-task");
      },
      editTask(taskId) {
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
      getPriorityClass(priority) {
        const classes = {
          low: 'badge bg-success',
          medium: 'badge bg-warning text-dark',
          high: 'badge bg-danger'
        };
        return classes[priority] || 'badge bg-secondary';
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
      openModal(task) {
        this.selectedTask = task;
        // Trigger the modal to open
        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();
      }
    },
  };
  </script>
  

  
  <style scoped>
  .dashboard-wrapper {
    background: #f8f9fa;
    min-height: calc(100vh - 136px); /* Adjust based on header and footer height */
  }
  
  .btn-success, .btn-danger, .btn-primary {
    transition: all 0.3s ease;
  }
  
  .btn-success {
    background-color: #28a745;
    border-color: #28a745;
  }
  
  .btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
  }
  
  .btn-primary {
    background-color: #fe424d;
    border-color: #fe424d;
  }
  
  .btn-primary:hover {
    background-color: #e63b45;
    border-color: #e63b45;
  }
  
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
  }
  
  .animated {
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
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
  
  