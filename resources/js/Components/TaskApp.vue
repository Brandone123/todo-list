<template>
    <v-card-text>
        <v-data-table :headers="advanceHeaders" :items="filteredTasks" :items-per-page="5">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Tasks</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="openDialog">Add Task</v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn small @click="editTask(item)" v-if="canEdit(item)">Edit</v-btn>
                <v-btn small @click="deleteTask(item.id)" v-if="canDelete(item)">Delete</v-btn>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span>{{ isEditing ? 'Edit Task' : 'Add Task' }}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="taskData.title" label="Title" required />
                    <v-text-field v-model="taskData.description" label="Description" required />
                    <v-select v-model="taskData.status" :items="statusOptions" label="Status" required />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue darken-1" @click="closeDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" @click="saveTask">{{ isEditing ? 'Update' : 'Add' }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card-text>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';  

const store = useStore(); 

const advanceHeaders = [
    { title: 'Date', value: 'updated_at' },
    { title: 'Title', value: 'title' },
    { title: 'Description', value: 'description' },
    { title: 'Status', value: 'status' },
    { title: 'Actions', value: 'actions' },
];

const tasks = computed(() => store.state.tasks);  
const dialog = ref(false);
const isEditing = ref(false);
const taskData = ref({ 
    title: '',
    description: '', 
    status: '' 
});
const statusOptions = ['Pending', 'In Progress', 'Completed'];

// Utilisateur connecté (supposons que l'ID de l'utilisateur soit récupéré du store ou d'une autre source)
const currentUser = computed(() => store.state.currentUser); // Assurez-vous que cet utilisateur soit bien défini dans le store

// Filtrer les tâches pour ne montrer que celles associées à l'utilisateur connecté
const filteredTasks = computed(() => {
    return tasks.value.filter((task: any) => task.user_id === currentUser.value.id);
});

// Vérifie si l'utilisateur peut éditer une tâche
function canEdit(task: any) {
    return task.user_id === currentUser.value.id;
}

// Vérifie si l'utilisateur peut supprimer une tâche
function canDelete(task: any) {
    return task.user_id === currentUser.value.id;
}

// Fetch tasks when component is mounted
onMounted(async () => {
    await store.dispatch('fetchCurrentUser');  // Récupérer l'utilisateur connecté
    await store.dispatch('fetchTasks');
});

function openDialog() {
    taskData.value = {
        title: '',
        description: '', 
        status: '' 
    };
    isEditing.value = false;
    dialog.value = true;
}

function editTask(task: any) {
    if (canEdit(task)) {
        taskData.value = { ...task };
        isEditing.value = true;
        dialog.value = true;
    }
}

function deleteTask(id: any) {
    const task = tasks.value.find(t => t.id === id);
    if (canDelete(task)) {
        store.dispatch('deleteTask', id);
    }
}

function closeDialog() {
    dialog.value = false;
}

async function saveTask() {
    if (isEditing.value) {
        await store.dispatch('updateTask', taskData.value);
    } else {
        await store.dispatch('addTask', taskData.value);
    }
    closeDialog();
}
</script>
