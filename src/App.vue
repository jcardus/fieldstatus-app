<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import firebase from "firebase/app";
import { defineCustomElements } from '@ionic/pwa-elements/loader';


export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('SET_USER', user)
        console.log('logged user', user)
      } else {
        this.$router.push('/login')
      }
    })
  },
  mounted() {
    defineCustomElements(window)
  }
});
</script>
