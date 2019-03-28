<template>
    <v-layout
      text-xs-left
      wrap
    >
      <v-flex xs-12>
        <v-app id="stacksList">
            <v-card>
                <!-- <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    ></v-text-field>
                </v-card-title> -->
                <v-data-table
                :headers="headers"
                :items="stacks"
                :search="search"
                class="elevation-1"
                >
                <template v-slot:items="stacks">
                    <td>{{ stacks.item.name }}</td>
                    <!-- <td class="text-xs-center">
                        <v-chip :color="containers.item.statusInfo[0].color" text-color="white" small>{{ containers.item.statusInfo[0].text }}</v-chip>
                    </td>
                    <td class="text-xs-left">{{ containers.item.stack }}</td>
                    <td class="text-xs-left">{{ containers.item.imageName }}</td>
                    <td class="text-xs-left">{{ containers.item.createdString }}</td> -->
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
  const got = require('got')
  var moment = require('moment')
  var voca = require('voca')

  export default {
    data () {
        return {
            search: '',
            headers: [
            {
                text: 'Container',
                align: 'left',
                sortable: true,
                value: 'name'
            },
            // { 
            //     text: 'Status', align: 'center', value: 'name' 
            // },
            // { 
            //     text: 'Stack', align: 'left', value: 'name' 
            // },
            // { 
            //     text: 'Image', align: 'left', value: 'name' 
            // },
            // { 
            //     text: 'Created', align: 'left', value: 'name' 
            // }
            ],
            stacks: []
        }
    },
    created () {
        (async () => {
            try {
                const response = await got.get('unix:/var/run/docker.sock:/v1.39/containers/json?all=true',
                {
                    json: true
                })
                let containersData = response.body
                let stacksData = []
                containersData.forEach(element => {
                    element.containerName = voca.splice(element.Names[0], 0, 1)
                    element.stack = (element.Labels['com.docker.compose.project']) ? element.Labels['com.docker.compose.project'] : '-'
                    element.statusInfo = this.getStatusInfo(element.State)
                    element.createdString = moment(element.Created*1000).format('YYYY-MM-DD')
                    element.imageName = element.Image

                    if(!stacksData[element.stack]) {
                        stacksData[element.stack] = {
                            name: element.stack,
                            containers: []
                        }
                    }
                    stacksData[element.stack].containers.push(element)
                });

                let stacks = Object.keys(stacksData).map((key) => {
                    return stacksData[key]
                })
                
                console.log(stacks)
                this.stacks = stacks
            } catch (error) {
                console.log(error.response.body)
            }
        })()
    },
    methods: {
        getStatusInfo(state) {
            // primary, secondary, success, info, warning, error
            if (state == 'running') {
                return [{
                    text: 'running',
                    color: 'success'
                }]
            }
            if (state == 'exited') {
                return [{
                    text: 'stopped',
                    color: 'error'
                }]
            }
        }
    }
  }
</script>

<style>

</style>
