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
                class="elevation-1"
                item-key="name"
                >
                <template v-slot:items="stacks">
                    <tr @click="stacks.expanded = !stacks.expanded">
                        <td>{{ stacks.item.name }}</td>
                    </tr>
                </template>
                <template v-slot:expand="stacks">
                    <v-card flat>
                        <ContainersList :containers="stacks.item.containers" />
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
            }
            ]
        }
    }
  }
</script>

<style>

</style>
