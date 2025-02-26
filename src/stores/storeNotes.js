import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        {
          id: 'id1',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas commodi, temporibus aliquam mollitia sunt odio beatae delectus aut. Vitae quod quae facere omnis, blanditiis enim delectus eveniet ullam laborum.',
        },
        {
          id: 'id2',
          content: 'This is shorter notes.',
        },
      ],
    };
  },
  actions: {
    addNote(newNoteContent) {
      let note = {
        id: uuid(),
        content: newNoteContent,
      };

      this.notes.unshift(note);
    },

    deleteNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },

    updateNote(id, content) {
      let index = this.notes.findIndex((note) => note.id === id);
      this.notes[index].content = content;
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.find((note) => note.id === id).content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharacterCount: (state) => {
      return state.notes.reduce((acc, note) => acc + note.content.length, 0);
    },
  },
});
