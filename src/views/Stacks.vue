<template>
  <v-container>
    <v-flex xs-12>
      <h5 class="headline font-weight-thin mb-3">Available Stacks</h5>
    </v-flex>
    <v-layout
      text-xs-center
      wrap
    >
      <StacksList :stacks="stacks" />
    </v-layout>
  </v-container>
</template>

<script>
  const got = require('got')
  var moment = require('moment')
  var voca = require('voca')

  import StacksList from '../components/StacksList'

  export default {
    components: {
      StacksList
    },
    data () {
        return {
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
                    if(element.stack != '-') {
                        if(!stacksData[element.stack]) {
                            stacksData[element.stack] = {
                                name: element.stack,
                                numOfContainers: 0,
                                runningContainers: 0,
                                statusInfo: this.getStatusInfo('exited'),
                                containers: []
                            }
                        }
                        stacksData[element.stack].containers.push(element)
                        stacksData[element.stack].numOfContainers++
                        if (element.State == 'running') {
                          stacksData[element.stack].runningContainers++
                        }
                        if (stacksData[element.stack].runningContainers > 0) {
                          stacksData[element.stack].statusInfo = this.getStatusInfo('running');
                        }
                    }
                });

                let stacks = Object.keys(stacksData).map((key) => {
                    return stacksData[key]
                })

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
