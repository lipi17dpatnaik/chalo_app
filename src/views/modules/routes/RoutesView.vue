<template>
  <div class="routes-view">
    <div class="routes-view-header">
        ROUTES
    </div>
    <div class="routes-view-body">
         <b-tabs expanded destroy-on-hide>
            <b-tab-item label="Singe Route">
              <SingleRouteComponent @data_submitted="submitData" />
            </b-tab-item>
            <b-tab-item label="Multiple Routes">
              <MultiRouteComponent @data_submitted="submitData" /> 
            </b-tab-item>
            <b-tab-item label="Batch Upload Routes">    
              <BatchUploadRouteComponent @data_submitted="submitData" />       
            </b-tab-item>
        </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import SingleRouteComponent from '@/views/modules/routes/tabs/SingleRouteComponent.vue'
import MultiRouteComponent from '@/views/modules/routes/tabs/MultiRouteComponent.vue'
import BatchUploadRouteComponent from '@/views/modules/routes/tabs/BatchUploadRouteComponent.vue'

@Component({
  components: {
      SingleRouteComponent,
      MultiRouteComponent,
      BatchUploadRouteComponent
  },
})
export default class RoutesView extends Vue {
    
    @Emit("data_submitted")
    private submitData(data: any) {
        return data;
    }
}
</script>

<style lang="scss" scoped>
.routes-view {
    padding: 30px;
    &-header {
      font-weight: 500;
      color: #f28c28;
      font-size: 30px;
    }
}
</style>
