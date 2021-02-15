import firebase from "firebase/app"
import {createStore} from 'vuex'

export const store = createStore({
    state: {
        user: {},
        jobs: []
    },
    mutations: {
        SET_USER (state, user) {
            state.user = user
        },
        CHANGE_JOB(state, job) {
            state.job = job
        }
    },
    actions: {
        async logout() {
            console.log(await firebase.auth().signOut())
        },
        bindTodosRef({ commit, state }) {
            // unsubscribe can be called to stop listening for changes
            firebase.firestore().collection('jobs').onSnapshot(ref => {
                ref.docChanges().forEach(change => {
                    const {newIndex, oldIndex, doc, type} = change
                    if (type === 'added') {
                        commit('CHANGE_JOB', {newIndex, oldIndex, doc, type})
                        state.jobs.splice(newIndex, 0, {id: doc.id})
                        // if we want to handle references we would do it here
                    } else if (type === 'modified') {
                        // remove the old one first
                        state.jobs.splice(oldIndex, 1)
                        // if we want to handle references we would have to unsubscribe
                        // from old references' listeners and subscribe to the new ones
                        state.jobs.splice(newIndex, 0, doc.data())
                    } else if (type === 'removed') {
                        state.jobs.splice(oldIndex, 1)
                        // if we want to handle references we need to unsubscribe
                        // from old references
                    }
                })
            })
        }
    },
    getters: {
      user(state) {
          return state.user
      },
      jobs(state) {
          return state.jobs
      }
    }
})


