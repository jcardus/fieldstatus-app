<template>
  <ion-page>
    <ion-content :fullscreen="true">
          <div style="padding: 30vh 10px">
            <ion-title style="text-align: center; padding: 10px">Welcome to fieldStatus</ion-title>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
            <ion-button @click="login">
              Login
            </ion-button>
          </div>
    </ion-content>
  </ion-page>
</template>

<script>
import firebase from 'firebase/app'

import {
  IonInput,
  IonContent,
  IonPage,
  IonTitle, IonItem, IonLabel, IonButton
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { logoApple, logoGoogle, mail } from 'ionicons/icons';
import {alertController} from "@ionic/core";


export default defineComponent({
  name: "Login",
  components: { IonTitle, IonPage, IonContent, IonInput, IonItem, IonLabel, IonButton },
  setup() {
    return {logoApple, logoGoogle, mail}
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        // Call the sign in with our created credentials
        await this.$router.push('/')
      } catch (e) {
        const alert = await alertController
            .create({
              header: 'Error',
              message: e,
              buttons: ['OK'],
            });
        return alert.present();
      }
    }
  }
})
</script>
