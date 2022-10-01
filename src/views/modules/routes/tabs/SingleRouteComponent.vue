<template>
  <div class="single-route-component">
     <header class="modal-card-head">
        <div class="modal-card-title">Form for single route</div>
      </header>
    <div class="single-route-component-body">
   <RouteForm :route="routeData" @route_data_updated="setRouteData" />
   <StopsForm :stops="stopsData" @stops_data_updated="setStopsData" />
    </div>
    <footer class="modal-card-foot">
        <b-button
          label="Save"
          type="is-primary"
          @click="submitData"
        />
        <b-button label="Cancel" @click="cancelData" />
      </footer>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import RouteForm from '@/components/RouteForm.vue';
import StopsForm from '@/components/StopsForm.vue';
@Component({
  components: {
      RouteForm,
      StopsForm
  },
})
export default class SingleRouteComponent extends Vue {
    
    private routeData: any = {};
    private stopsData: any = [];
    
    private setRouteData(routeData: any) {
        this.routeData = routeData;
    }
    
    private setStopsData(stopsData: any) {
        this.stopsData = stopsData;
    }
    
    @Emit("data_submitted")
    private submitData() {
        return [{ route: this.routeData, stops: this.stopsData }];
    }
    
    private cancelData() {
        this.routeData = {};
        this.stopsData = [];
    }
}
</script>

<style lang="scss" scoped>
.single-route-component {
    padding: 30px;
    &-body {
        margin-top: 10px;
        border: 1px solid #f28c28;
        border-radius: 4px;
        padding: 20px;
        text-align: left;
    }
}
</style>
