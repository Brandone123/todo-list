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
            <!-- Formatage des dates dans le tableau -->
            <template v-slot:item.created_at="{ item }">
                {{ formatDate(item.created_at) }}
            </template>
            <template v-slot:item.updated_at="{ item }">
                {{ formatDate(item.updated_at) }}
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon color="blue" @click="editTask(item)" v-if="canEdit(item)">mdi-pencil</v-icon>
                <v-icon color="red" @click="deleteTask(item.id)" v-if="canDelete(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-toolbar color="primary" dark>
                    <v-toolbar-title>{{ isEditing ? 'Edit Task' : 'Add Task' }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="taskData.title" label="Title" required density="compact" variant="outlined"/>
                    <v-select v-model="taskData.status" :items="statusOptions" label="Status" required density="compact" variant="outlined"/>
                    <v-textarea v-model="taskData.description" label="Description" required density="compact" variant="outlined"/>
                </v-card-text>
                <v-divider></v-divider>
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
    { title: 'ID', value: 'id' },
    { title: 'Created at', value: 'created_at' },
    { title: 'Updated at', value: 'updated_at' },
    { title: 'Title', value: 'title' },
    { title: 'Description', value: 'description' },
    { title: 'Status', value: 'status' },
    { title: 'Actions', value: 'actions' },
];

// Fonction pour formater la date en un format lisible
function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

const tasks = computed(() => store.state.tasks);  
const dialog = ref(false);
const isEditing = ref(false);
const taskData = ref({ 
    title: '',
    description: '', 
    status: '' 
});
const statusOptions = ['Pending', 'In Progress', 'Completed'];

const currentUser = computed(() => store.state.currentUser); 

const filteredTasks = computed(() => {
    return tasks.value.filter((task: any) => task.user_id === currentUser.value.id);
});

function canEdit(task: any) {
    return task.user_id === currentUser.value.id;
}

function canDelete(task: any) {
    return task.user_id === currentUser.value.id;
}

onMounted(async () => {
    await store.dispatch('fetchCurrentUser');
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
