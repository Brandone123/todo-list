<script setup>
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <Head title="Welcome" />

    <div class="relative flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <div v-if="canLogin" class="fixed top-0 right-0 p-6 text-right">
            <Link
                v-if="$page.props.auth.user"
                :href="route('dashboard')"
                class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >Dashboard</Link
            >

            <template v-else>
                <Link
                    :href="route('login')"
                    class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >Log in</Link
                >

                <Link
                    v-if="canRegister"
                    :href="route('register')"
                    class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >Register</Link
                >
            </template>
        </div>

        <div class="max-w-7xl mx-auto p-6 text-center">
            <div class="flex justify-center mb-8">
                <img src="/images/digitech.png" alt="digitech" class="h-20 w-auto" />
            </div>

            <div class="text-lg font-medium text-gray-900 dark:text-white">
                Welcome to the Task Management App
            </div>

            <p class="mt-4 text-gray-600 dark:text-gray-400">
                A simple, intuitive way to manage your tasks efficiently. Get started by logging in or registering.
            </p>

            <div class="mt-8">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    Test for the recruitment of a front-end developer @Digitech-2024
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.bg-gray-100 {
    background-color: #f7fafc;
}
.dark\:bg-gray-900 {
    background-color: white;
}
</style>