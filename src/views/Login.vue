<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
          <div id="firebaseui-auth-container" />
          <div id="loader">
            Loading...
          </div>
      <ion-button expand="block" @click="signInApple">
        <ion-icon :icon="logoApple"></ion-icon>
        Sign in with Apple
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script>

import * as firebaseui from 'firebaseui'
import firebase from 'firebase/app'
import 'firebaseui/dist/firebaseui.css'


import {IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
import { defineComponent } from 'vue';
import { SignInWithApple, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple';
import { logoApple } from 'ionicons/icons';

export default defineComponent({
  name: "Login",
  components: { IonButton, IonToolbar, IonTitle, IonHeader, IonPage, IonContent, IonIcon },
  setup() {
    return {logoApple}
  },
  mounted() {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult (/* authResult, redirectUrl */) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true
        },
        uiShown () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none'
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>',
      // Privacy policy url.
      privacyPolicyUrl: '<your-privacy-policy-url>'
    }
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig)
  },
  methods: {
    async signInApple() {
      try {
        const res = await SignInWithApple.signin({
          requestedScopes: [
            ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
            ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
          ]
        })
        console.log(res)
        const provider = new firebase.auth.OAuthProvider('apple.com');

        // Create sign in credentials with our token
        const credential = provider.credential({
          idToken: res.identityToken
        });
        // Call the sign in with our created credentials
        console.log(await firebase.auth().signInWithCredential(credential))
        await this.$router.push('/')
      } catch(error) {
        console.error(error);
      }
    }
  }
})
</script>

<style lang="scss">
</style>
