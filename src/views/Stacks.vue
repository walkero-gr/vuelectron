<template>  
  <v-container>
    <v-flex xs-12>
      <h5 class="headline font-weight-thin mb-3">Available Stacks</h5>
    </v-flex>
    <v-layout
      text-xs-center
      wrap
    >
      <StacksList />
    </v-layout>
  </v-container>
</template>

<script>
  import StacksList from '../components/StacksList'

  export default {
    components: {
      StacksList
    }
  }
</script>
