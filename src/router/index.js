import ViewStats from '@/views/ViewStats.vue';
import ViewNote from '@/views/ViewNote.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import ViewEditNotes from '@/views/ViewEditNotes.vue';

const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNote,
  },
  {
    path: '/editNote/:id',
    name: 'edit-note',
    component: ViewEditNotes,
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
