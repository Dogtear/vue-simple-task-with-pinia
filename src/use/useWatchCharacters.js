import { watch } from 'vue';

export function useWatchCharacters(valueToWatch, limit = 100) {
  watch(valueToWatch, (newValue) => {
    if (newValue.length >= limit) {
      alert('Only 100 characters allowed');
    }
  });
}
