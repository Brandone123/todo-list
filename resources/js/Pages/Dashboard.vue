<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import Task from '/resources/js/Components/TaskApp.vue'

// Exemples de données, remplace par tes données réelles
const totalTasks = ref(25);
const pendingTasks = ref(10);
const completedTasks = ref(15);
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <!-- <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>
        </template> -->

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

        <div class="py-12">
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