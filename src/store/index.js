import firebase from "firebase/app"
import {createStore} from 'vuex'

export const store = createStore({
    state: {
        user: {}
    },
    mutations: {
        SET_USER (state, user) {
            state.user = user
        }
    },
    actions: {
        async logout() {
            console.log(await firebase.auth().signOut())
        }
    },
    getters: {
      user(state) {return state.user}
    }
})


