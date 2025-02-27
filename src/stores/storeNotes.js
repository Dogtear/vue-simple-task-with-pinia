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
  addDoc,
  query,
  orderBy,
  // limit,
} from 'firebase/firestore';

const notesCollectionRef = collection(db, 'notes');
const noteCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));

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
      notesLoaded: false,
    };
  },
  actions: {
    async getNotes() {
      this.notesLoaded = false;
      onSnapshot(noteCollectionQuery, (querySnapshot) => {
        let newNotes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };
          newNotes.push(note);
        });
        this.notes = newNotes;
        this.notesLoaded = true;
      });
    },
    async addNote(newNoteContent) {
      // const id = uuid();
      const createdAt = new Date().getTime();

      // let note = {
      //   id,
      //   content: newNoteContent,
      // };
      // this.notes.unshift(note);

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date: createdAt,
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
