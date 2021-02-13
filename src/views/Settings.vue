<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-avatar></ion-avatar>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";

export default {
  name: "Settings",
  components: {IonPage, IonHeader, IonToolbar, IonTitle}
}
</script>

<style scoped>

</style>
