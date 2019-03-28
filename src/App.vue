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

      
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> | 
        <router-link to="/containers">Containers</router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="dark = !dark" icon>
        <v-icon>brightness_2</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
    <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import LandingPage from './components/LandingPage'

export default {
  name: 'App',
  components: {
    // LandingPage
  },
  data () {
    return {
      //
      dark: false
    }
  }
}
</script>
