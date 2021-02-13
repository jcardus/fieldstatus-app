import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBe2gsMZaCPt_9gFX55ADod2S4T2wFr1lE",
  authDomain: "fieldstat.us",
  projectId: "fieldstatus-c4f7c",
  storageBucket: "fieldstatus-c4f7c.appspot.com",
  messagingSenderId: "1065922007703",
  appId: "1:1065922007703:web:2d71c0fb076fe127e6cfd2",
  measurementId: "G-SQ6YG8E911"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

import store from './store'

const app = createApp(App)
  .use(IonicVue)
  .use(router).use(store)

router.isReady().then(() => {
  app.mount('#app');
});
