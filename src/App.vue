<template>
  <v-app :dark="dark">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vue</span>
        <span class="font-weight-light">Electron</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn> -->

      <v-btn @click="dark = !dark" icon>
        <v-icon>brightness_2</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <LandingPage/>
    </v-content>
  </v-app>
</template>

<script>
import LandingPage from './components/LandingPage'

export default {
  name: 'App',
  components: {
    LandingPage
  },
  data () {
    return {
      //
      dark: false
    }
  }
}
</script>
