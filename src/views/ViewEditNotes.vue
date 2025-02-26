<script setup>
import AddEditNote from '@/components/Note/AddEditNote.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

const route = useRoute();
const router = useRouter();

const storeNotes = useStoreNotes();
const noteContent = ref('');
const addEditNoteRef = ref(null);

noteContent.value = storeNotes.getNoteContent(route.params.id);

const handleSaveClick = () => {
  storeNotes.updateNote(route.params.id, noteContent.value);
  router.push('/');
};
</script>

<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      placeholder="Edit Note"
      label="Edit Note"
    >
      <template #buttons class="is-flex">
        <button @click="$router.back()" class="button is-link is-light mr-3">
          Cancel
        </button>

        <button
          @click="handleSaveClick"
          :disabled="!noteContent"
          class="button is-link"
          :class="`has-background-{bgColor}`"
        >
          SaveNote
        </button>
      </template>
    </AddEditNote>
  </div>
</template>
