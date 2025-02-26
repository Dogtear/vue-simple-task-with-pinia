<script setup>
import { computed, reactive } from 'vue';
import ModalDeleteNote from './ModalDeleteNote.vue';

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['deleteCliked']);

const characteLength = computed(() => {
  const charLength = props.note.content.length;
  const description =
    charLength > 0 && charLength <= 1 ? ' character' : ' characters';

  return `${charLength} ${description}`;
});

const handleDeleteClick = () => {
  emit('deleteCliked', props.note.id);
};

// const noteLength = props.note.content.length

// modals

const modals = reactive({
  deleteNote: false,
});
</script>

<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>
            {{ characteLength }}
          </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`" href="#" class="card-footer-item"
        >Edit</RouterLink
      >
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model:modalValue="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>
