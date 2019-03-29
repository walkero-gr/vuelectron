<template>
  <v-app :dark="storedDark">

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


      <div id="nav" class="font-weight-light">
        <!-- <router-link to="/">Home</router-link> | -->
        <router-link to="/stacks">Stacks</router-link> |
        <router-link to="/containers">Containers</router-link> |
        <router-link to="/recipes">Recipes</router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="switchTheme()" icon>
        <v-icon>invert_colors</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
    <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  const ElectronStore = require('electron-store');
  const electronConfig = new ElectronStore();

  // import LandingPage from './components/LandingPage'

  export default {
    name: 'App',
    components: {
      // LandingPage
    },
    data () {
      return {
      }
    },
    created () {
      this.setTheme(electronConfig.get('userTheme'))
      // electronConfig.set('userTheme', 'blue');
    },
    computed: {
      storedDark() {
        return this.$store.state.dark
      }
    },
    methods: {
      switchTheme() {
        this.dark = !this.dark
        this.$store.commit('switchTheme', this.dark)
        electronConfig.set('userTheme', this.dark)
        // console.log(electronConfig.get('userTheme'))
      },
      setTheme(setDark = false) {
        this.$store.commit('switchTheme', setDark)
        electronConfig.set('userTheme', this.dark)
      }
    }
  }
</script>

<style>
.v-content .application--wrap {
  min-height: unset;
}
#nav a {
  color: #212121;
  text-decoration: none;
}
#nav a:hover {
  color: #616161;
}
.theme--dark #nav a {
  color: white;
}
.theme--dark #nav a:hover {
  color: #eeeeee;
}
</style>
