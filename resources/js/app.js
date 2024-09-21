import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import store from './Stores/taskStore';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import {
    VRow,
    VCol,
    VCard,
    VCardTitle,
    VCardText,
    VIcon,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VBtn,
    VDialog,
    VCardActions,
    VTextField,
    VSelect,
    VDataTable,
} from 'vuetify/components';

const vuetify = createVuetify({
    components: {
        VRow,
        VCol,
        VCard,
        VCardTitle,
        VCardText,
        VIcon,
        VToolbar,
        VToolbarTitle,
        VSpacer,
        VBtn,
        VDialog,
        VCardActions,
        VTextField,
        VSelect,
        VDataTable,
    },
});

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(vuetify) // Utilisation de Vuetify
            .use(store)
            .use(ZiggyVue, Ziggy)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});