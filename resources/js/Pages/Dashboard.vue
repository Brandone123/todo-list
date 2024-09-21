<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import Task from '/resources/js/Components/TaskApp.vue'
import { useStore } from 'vuex'; 
import { ref, computed, onMounted } from 'vue';

// Utiliser Vuex Store pour récupérer les tâches
const store = useStore();

// Récupérer les tâches depuis le store
onMounted(async () => {
    await store.dispatch('fetchTasks');  // Si tu as une action dans ton store pour récupérer les tâches
});

// Calcul des tâches dynamiquement
const totalTasks = computed(() => store.state.tasks.length);

const pendingTasks = computed(() => 
    store.state.tasks.filter(task => task.status === 'Pending').length
);

const completedTasks = computed(() => 
    store.state.tasks.filter(task => task.status === 'Completed').length
);

</script>

<template>
    <Head title="Overview" />

    <AuthenticatedLayout>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <v-row class="mt-5">
                    <v-col cols="12" md="4">
                        <v-card class="card-1 text-center">
                            <v-card-title class="justify-space-between">
                                <v-icon class="mr-2" color="#CE0053">mdi-format-list-checkbox</v-icon>
                                <span>Total Tasks</span>
                            </v-card-title>
                            <v-card-text>
                                <span class="font-weight-bold text-h6">{{ totalTasks }}</span>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-card class="card-2 text-center">
                            <v-card-title class="justify-space-between">
                                <v-icon class="mr-2" color="#1867C0">mdi-clock-outline</v-icon>
                                <span>Pending Tasks</span>
                            </v-card-title>
                            <v-card-text>
                                <span class="font-weight-bold text-h6">{{ pendingTasks }}</span>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-card class="card-3 text-center">
                            <v-card-title class="justify-space-between">
                                <v-icon class="mr-2" color="#424656">mdi-check-circle-outline</v-icon>
                                <span>Completed Tasks</span>
                            </v-card-title>
                            <v-card-text>
                                <span class="font-weight-bold text-h6">{{ completedTasks }}</span>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </div>

        <div>
            <Task />
        </div>
    </AuthenticatedLayout>
</template>

<style>
.card-1, .card-2, .card-3 {
    margin-top: 20px;
}

.card-1 {
  border-left: 8px solid #CE0053;
}

.card-2 {
  border-left: 8px solid #1867C0;
}

.card-3 {
  border-left: 8px solid #424656;
}
</style>
