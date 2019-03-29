<template>
    <v-layout
      text-xs-left
      wrap
    >
      <v-flex xs-12>
        <v-app id="stacksList">
            <v-card>
                <v-card-title>
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
                :items="stacks"
                :search="search"
                :rows-per-page-items="itemsPerPage"
                class="elevation-1"
                item-key="name"
                >
                <template v-slot:items="stacks">
                    <tr @click="stacks.expanded = !stacks.expanded">
                        <td v-ripple>{{ stacks.item.name }}</td>
                        <td class="text-xs-center">
                            <v-chip :color="stacks.item.statusInfo[0].color" text-color="white" small>{{ stacks.item.statusInfo[0].text }}</v-chip>
                        </td>
                        <td class="text-xs-center">{{ stacks.item.numOfContainers }}</td>
                        <td class="text-xs-center green--text text--darken-3">{{ stacks.item.runningContainers }}</td>
                        <td class="text-xs-center red--text text--darken-3">{{ stacks.item.numOfContainers - stacks.item.runningContainers }}</td>
                    </tr>
                </template>
                <template v-slot:expand="stacks">
                    <v-card flat>
                        <ContainersList :containers="stacks.item.containers" :hideActions="true" :hideSearch="true" />
                    </v-card>
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
  import ContainersList from './ContainersList'

  export default {
    components: {
      ContainersList
    },
    props: ['stacks'],
    data () {
      return {
        search: '',
        headers: [
        {
          text: 'Stack name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Status',
          align: 'center',
          sortable: true,
          value: 'statusInfo[0].text'
        },
        {
          text: 'No. Containers',
          align: 'center',
          sortable: false
        },
        {
          text: 'Running',
          align: 'center',
          sortable: false
        },
        {
          text: 'Stopped',
          align: 'center',
          sortable: false
        }
        ],
        itemsPerPage: [
          5, 10, 25, {
            "text":"$vuetify.dataIterator.rowsPerPageAll","value":-1
          }
        ]
      }
    }
  }
</script>

<style scoped>
tr:hover {
  cursor: pointer;
}
</style>
