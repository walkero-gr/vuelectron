<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <ContainersList />
    </v-layout>
  </v-container>
</template>

<script>
  import ContainersList from './LandingPage/ContainersList'

  export default {
    name: 'LandingPage',
    components: {
      ContainersList
    }
    
  }
</script>

<style>

</style>
