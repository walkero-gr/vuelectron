<template>
  <v-layout
    text-xs-left
    wrap
  >
    <v-flex xs-12>
      <v-app id="containersList">
          <v-card>
            <v-card-title v-if="hideSearch !== true">
              <v-spacer></v-spacer>
              <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="containers"
            :search="search"
            :rows-per-page-items="itemsPerPage"
            :hide-actions="hideActions"
            class="elevation-1"
            >
            <template v-slot:items="containers">
              <td>{{ containers.item.containerName }}</td>
              <td class="text-xs-center">
                  <v-chip :color="containers.item.statusInfo[0].color" text-color="white" small>{{ containers.item.statusInfo[0].text }}</v-chip>
              </td>
              <td class="text-xs-left">{{ containers.item.stack }}</td>
              <td class="text-xs-left">{{ containers.item.imageName }}</td>
              <td class="text-xs-left">{{ containers.item.createdString }}</td>
            </template>
            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="error">
              Sorry, no containers to display. Make sure docker is running on your machine. :(
              </v-alert>
            </template>
            </v-data-table>
          </v-card>
      </v-app>
    </v-flex>
  </v-layout>
</template>



<script>
  export default {
    props: ['containers', 'hideActions', 'hideSearch'],
    data () {
      let retData = {
        search: '',
        headers: [
        {
          text: 'Container',
          align: 'left',
          sortable: true,
          value: 'containerName'
        },
        {
          text: 'Status', align: 'center', value: 'State'
        },
        {
          text: 'Stack', align: 'left', value: 'stack'
        },
        {
          text: 'Image', align: 'left', value: 'imageName'
        },
        {
          text: 'Created', align: 'left', value: 'createdString'
        }
        ],
        itemsPerPage: [
          10, 25, {
            "text":"$vuetify.dataIterator.rowsPerPageAll","value":-1
          }
        ]
      }

      if(this.hideActions) {
        retData.itemsPerPage =[{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]
      }

      return retData
    }
  }
</script>

<style>

</style>
