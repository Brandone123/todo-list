import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        tasks: [],  // Liste des tâches de l'utilisateur
        currentUser: null,  // Information sur l'utilisateur connecté
    },
    mutations: {
        // Mutations pour mettre à jour l'état des tâches
        setTasks(state, tasks) {
            state.tasks = Array.isArray(tasks) ? tasks : [];
        },
        setCurrentUser(state, user) {
            state.currentUser = user;  // Mise à jour des informations de l'utilisateur
        },
        addTask(state, task) {
            state.tasks.push(task);
        },
        updateTask(state, updatedTask) {
            const index = state.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                state.tasks.splice(index, 1, updatedTask);
            }
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter(task => task.id !== id);
        }
    },
    actions: {
        // Récupère toutes les tâches de l'utilisateur connecté
        async fetchTasks({ commit }) {
            try {
                const response = await axios.get('/tasks');  // Appel à la route GET /tasks
                console.log(response.data); // Affiche les données pour déboguer
                commit('setTasks', response.data);  // Met à jour l'état avec les tâches
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches:', error);
            }
        },
        async fetchCurrentUser({ commit }) {
            const response = await axios.get('/user');  // Appel à la route pour récupérer l'utilisateur
            commit('setCurrentUser', response.data);  // Enregistrement de l'utilisateur dans le store
        },
        // Ajoute une nouvelle tâche
        async addTask({ commit }, task) {
            try {
                const response = await axios.post('/tasks', task);  // Appel à la route POST /tasks
                commit('addTask', response.data);  // Ajoute la nouvelle tâche à l'état
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la tâche:', error);
            }
        },
        // Met à jour une tâche existante
        async updateTask({ commit }, task) {
            try {
                const response = await axios.put(`/tasks/${task.id}`, task);  // Appel à la route PUT /tasks/{task}
                commit('updateTask', response.data);  // Met à jour la tâche dans l'état
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la tâche:', error);
            }
        },
        // Supprime une tâche
        async deleteTask({ commit }, id) {
            try {
                await axios.delete(`/tasks/${id}`);  // Appel à la route DELETE /tasks/{task}
                commit('deleteTask', id);  // Supprime la tâche de l'état
            } catch (error) {
                console.error('Erreur lors de la suppression de la tâche:', error);
            }
        }
    },
});
