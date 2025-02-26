<script setup>
import { ref } from 'vue';
import Note from '@/components/Note/Note.vue';
import AddEditNote from '@/components/Note/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useWatchCharacters } from '@/use/useWatchCharacters';

const storeNotes = useStoreNotes();

const newNote = ref('');
const addEditNoteRef = ref(null);

const addNote = () => {
  storeNotes.addNote(newNote.value);

  newNote.value = '';
  addEditNoteRef.value.focusTextArea();
};

useWatchCharacters(newNote, 100);
</script>

<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      placeholder="Add a new note"
    >
      <template #buttons>
        <button
          @click="addNote"
          :disabled="!newNote"
          class="button is-link has-background-success"
        >
          Add new note
        </button>
      </template>
    </AddEditNote>

    <!-- <div class="card has-background-success-dark p-4 mb-5"> -->
    <!--   <div class="field"> -->
    <!--     <div class="control"> -->
    <!--       <textarea v-model="newNote" class="textarea" placeholder="Add a new note." ref="newNoteRef" /> -->
    <!--     </div> -->
    <!--   </div> -->
    <!---->
    <!--   <div class="field is-grouped is-grouped-right"> -->
    <!--     <div class="control"> -->
    <!--       <button @click="addNote" :disabled="!newNote" class="button is-link has-background-success">Add -->
    <!--         new -->
    <!--         note</button> -->
    <!--     </div> -->
    <!--   </div> -->
    <!-- </div> -->

    <Note
      v-for="note in storeNotes.notes"
      :key="note.id"
      :note="note"
      @deleteCliked="storeNotes.deleteNote(note.id)"
    />
  </div>
</template>
