<template>
    <div>
      <h1>Todo List</h1>
      <!-- Interface pour l'ajout, la suppression et la modification des tâches -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tasks: [],
      };
    },
    methods: {
      fetchTasks() {
        // Logique pour récupérer les tâches depuis l'API
      },
      // Méthodes pour ajouter, supprimer, et modifier les tâches
    },
    mounted() {
      this.fetchTasks();
    },
  };
  </script>