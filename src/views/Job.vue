<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Jobs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item>{{$route.params.jobid}}</ion-item>
      </ion-list>
        <ion-fab vertical="bottom" horizontal="center" slot="fixed">
          <ion-fab-button @click="takePhoto()">
            <ion-icon :icon="camera"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo" v-for="photo in photos">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {mapGetters} from "vuex";
import { camera, trash, close } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonFab, IonFabButton, IonIcon,
  IonToolbar, IonTitle, IonContent, IonItem, IonList, IonCol, IonRow, IonImg, IonGrid
} from '@ionic/vue';
import {CameraResultType, CameraSource, Plugins} from "@capacitor/core";
import firebase from 'firebase'

export default  {
  name: 'Tab2',
  components: { IonPage, IonHeader, IonFab, IonFabButton, IonIcon,
    IonToolbar, IonTitle, IonContent, IonItem, IonList, IonCol, IonRow, IonImg, IonGrid },
  mounted() {
    this.$store.dispatch('bindTodosRef')
  },
  data() {
    return {
      photos: []
    }
  },
  computed: {
    ...mapGetters(['jobs'])
  },
  methods: {
    async takePhoto() {
      const { Camera } = Plugins;
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });
      console.log(cameraPhoto.webPath)
      const imageRef = firebase.storage().ref().child(cameraPhoto.webPath)

      const savedFileImage = {
        firebase: imageRef,
        webviewPath: cameraPhoto.webPath
      };
      this.photos.push(savedFileImage);
      imageRef.put(await fetch(cameraPhoto.webPath).then(r => r.blob()))
      await firebase.firestore().collection('jobs').doc(this.$route.params.jobid).collection('photos').add({webPath: cameraPhoto.webPath})
    }
  },
  setup() {
    return {
      camera, trash, close
    }
  }
}
</script>
