<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <ion-card v-if="signInEmail">
        <ion-card-header>
          <ion-card-title></ion-card-title>
          <ion-card-subtitle></ion-card-subtitle>
        </ion-card-header>
        <ion-card-content></ion-card-content>
      </ion-card>
          <div style="padding: 30vh 10px">
            <ion-title style="text-align: center; padding: 10px">Welcome to fieldStatus</ion-title>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input></ion-input>
            </ion-item>
          </div>
    </ion-content>
  </ion-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebaseui/dist/firebaseui.css'


import {
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput,
  IonContent,
  IonPage,
  IonTitle, IonItem, IonLabel
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { SignInWithApple, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple';
import { logoApple, logoGoogle, mail } from 'ionicons/icons';
import {GooglePlus} from '@ionic-native/google-plus'

export default defineComponent({
  name: "Login",
  components: { IonTitle, IonPage, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput, IonItem, IonLabel },
  setup() {
    return {logoApple, logoGoogle, mail}
  },
  data() {
    return {
      signInEmail: false
    }
  },
  methods: {
    async oAuthSignIn(token, domain) {
      try {
        const provider = new firebase.auth.OAuthProvider(domain);

        // Create sign in credentials with our token
        const credential = provider.credential({
          idToken: token
        });
        // Call the sign in with our created credentials
        console.log(await firebase.auth().signInWithCredential(credential))
        await this.$router.push('/')
      } catch (e) {
        console.error(e)
      }
    },
    async signInGoogle() {
      const res = await GooglePlus.login({
        'webClientId': '1065922007703-mjslohf50c6n626j7ejho5hgki458mn6.apps.googleusercontent.com',
        'offline': true
      })
      console.log('google login result', res)
      await this.oAuthSignIn(res.idToken, 'google.com')
    },
    async signInApple() {
      try {
        const res = await SignInWithApple.signin({
          requestedScopes: [
            ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
            ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
          ]
        })
        console.log(res)
        await this.oAuthSignIn(res.identityToken, 'apple.com')
      } catch(error) {
        console.error(error);
      }
    },
    toggleSignInEmail() {
      console.log(this.signInEmail)
      this.signInEmail = true
    }
  }
})
</script>

<style lang="scss">
</style>
