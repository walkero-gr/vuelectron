<template>  
  <v-container>
    <v-flex xs-12>
      <h5 class="headline font-weight-thin mb-3">Available Containers</h5>
    </v-flex>
    <v-layout
      text-xs-center
      wrap
    >
      <ContainersList :containers="containers" />
    </v-layout>
  </v-container>
</template>

<script>
  const got = require('got')
  var moment = require('moment')
  var voca = require('voca')

  import ContainersList from '../components/ContainersList'

  export default {
    components: {
      ContainersList
    },
    data () {
        return {
            containers: []
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
                containersData.forEach(element => {
                    element.containerName = voca.splice(element.Names[0], 0, 1)
                    element.stack = (element.Labels['com.docker.compose.project']) ? element.Labels['com.docker.compose.project'] : '-'
                    element.statusInfo = this.getStatusInfo(element.State)
                    element.createdString = moment(element.Created*1000).format('YYYY-MM-DD')
                    element.imageName = element.Image
                    if(voca.indexOf(element.Image, 'sha256:') >= 0) {
                        element.imageName = voca.splice(element.Image, 0, 7)
                        element.imageName = voca.splice(element.imageName, 12)
                    }
                });
                this.containers = containersData
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
