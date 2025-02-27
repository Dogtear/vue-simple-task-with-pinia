import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { db } from '@/js/firebase';
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  // limit,
} from 'firebase/firestore';

const notesCollectionRef = collection(db, 'notes');
const noteCollectionQuery = query(
  notesCollectionRef,
  orderBy('created_at', 'desc')
);

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        // {
        //   id: 'id1',
        //   content:
        //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas commodi, temporibus aliquam mollitia sunt odio beatae delectus aut. Vitae quod quae facere omnis, blanditiis enim delectus eveniet ullam laborum.',
        // },
        // {
        //   id: 'id2',
        //   content: 'This is shorter notes.',
        // },
      ],
    };
  },
  actions: {
    async getNotes() {
      onSnapshot(noteCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
          };

          notes.push(note);
        });
        this.notes = notes;
      });
    },
    async addNote(newNoteContent) {
      const id = uuid();
      const createdAt = new Date().toISOString();

      // let note = {
      //   id,
      //   content: newNoteContent,
      // };
      // this.notes.unshift(note);

      await setDoc(doc(notesCollectionRef, id), {
        content: newNoteContent,
        created_at: createdAt,
        id,
      });
    },

    async deleteNote(id) {
      // this.notes = this.notes.filter((note) => note.id !== id);
      await deleteDoc(doc(notesCollectionRef, id));
    },

    async updateNote(id, content) {
      // let index = this.notes.findIndex((note) => note.id === id);
      // this.notes[index].content = content;

      await updateDoc(doc(notesCollectionRef, id), {
        content,
      });
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
