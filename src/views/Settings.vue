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
      {{user && user.displayName}}
      <ion-button @click="logout">
        Logout
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton} from "@ionic/vue";
import {mapGetters} from "vuex";

export default {
  name: "Settings",
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton},
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>

</style>
