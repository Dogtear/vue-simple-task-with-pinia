<script setup>
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { vAutofocus } from '@/directives/vAutofocus';
import { useWatchCharacters } from '@/use/useWatchCharacters';

const loveNoteball = ref('');

const noteStores = useStoreNotes();

useWatchCharacters(loveNoteball, 50);
</script>

<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ noteStores.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters</td>
          <td>{{ noteStores.totalCharacterCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="loveNoteball"
      class="input"
      type="text"
      placeholder="Do you love noteballs"
      v-autofocus
    />
  </div>
</template>
