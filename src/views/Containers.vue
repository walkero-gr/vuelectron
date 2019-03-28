<template>  
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <h5 class="headline font-weight-thin mb-3">Available Containers</h5>
      <ContainersList />
    </v-layout>
  </v-container>
</template>

<script>
  import ContainersList from '../components/ContainersList'

  export default {
    components: {
      ContainersList
    }
  }
</script>
