<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Jobs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="job in jobs" :key="job.id" :href="`/views/jobs/${job.id}`">{{job}}</ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem} from '@ionic/vue';
import {mapGetters} from "vuex";

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem },
  mounted() {
    this.$store.dispatch('bindTodosRef')
  },
  computed: {
    ...mapGetters(['jobs'])
  }
}
</script>
