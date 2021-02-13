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
          <ion-button @click="signInApple">Sign in with Apple</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>

import * as firebaseui from 'firebaseui'
import firebase from 'firebase/app'
import 'firebaseui/dist/firebaseui.css'


import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
import { defineComponent } from 'vue';
import { SignInWithApple, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple';


export default defineComponent({
  name: "Login",
  components: { IonButton, IonToolbar, IonTitle, IonHeader, IonPage, IonContent },
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
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          provider: 'apple.com'
        },
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
    signInApple() {
      SignInWithApple.signin({
        requestedScopes: [
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
        ]
      }).then(res => {
            // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
            alert('Send token to apple for verification: ' + res.identityToken);
            console.log(res);
          })
          .catch(error => {
            alert(error.code + ' ' + error.localizedDescription);
            console.error(error);
          });
    }
  }
})
</script>

<style lang="scss">
</style>
