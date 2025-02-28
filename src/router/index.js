import ViewStats from '@/views/ViewStats.vue';
import ViewNote from '@/views/ViewNote.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import ViewEditNotes from '@/views/ViewEditNotes.vue';
import ViewAuth from '@/views/ViewAuth.vue';

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
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
