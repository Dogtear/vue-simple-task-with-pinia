<script setup>
import { onClickOutside } from '@vueuse/core';
import { onMounted, onUnmounted, ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

const props = defineProps({
  modalValue: {
    type: Boolean,
  },
  noteId: {
    type: String,
  },
});

const noteStore = useStoreNotes();

// emits
const emit = defineEmits(['update:modalValue']);

// Close modal
const closeModal = () => {
  emit('update:modalValue', false);
  // console.log(props.modalValue);
};

const modalCardRef = ref(null);
onClickOutside(modalCardRef, () => {
  emit('update:modalValue', false);
});

const handleKeyboard = (e) => {
  console.log('handle keyboard');
  if (e.key === 'Escape') emit('update:modalValue', false);
};

// keyboard controls
onMounted(() => {
  document.addEventListener('keyup', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard);
});
</script>

<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Node</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note ?
        <pre>{{ modalValue }}</pre>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button class="button" @click="closeModal">Cancel</button>
          <button
            class="button is-danger"
            @click="noteStore.deleteNote(noteId)"
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
