<template>
  <div class="multi-route-component">
    <header class="modal-card-head">
        <div class="modal-card-title">Form for multiple routes</div>
    </header>
       <b-button
            class="multi-route-component-route-form-add"
            @click="addNewRoute"
            ><b-icon icon="plus" size="is-small"> </b-icon>
            Add Route
        </b-button>
    <div class="multi-route-component-body"
        v-for="(route, routeIndex) in routesData"
        :key="routeIndex">
        <div class="multi-route-component-body-route">
            <RouteForm :route="routesData[routeIndex].route" @route_data_updated="(data) => setRouteData(routeIndex, data)" />
            <StopsForm :stops="routesData[routeIndex].stops" @stops_data_updated="(data) => setStopsData(routeIndex, data)" />
        </div>
             <span @click="deleteRoute(routeIndex)" v-if="routeIndex > 1">
              <b-icon icon="close-circle" size="is-small"> </b-icon
            ></span>

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
export default class MultiRouteComponent extends Vue {
    private routesData: any = [{route: {}, stops: []}, {route: {}, stops: []}];

    private addNewRoute() {
        this.routesData.push({});
    }

    private deleteRoute(routeIndex: number) {
        this.routesData.splice(routeIndex, 1);
    }
    
    private setRouteData(routeIndex: number, data: any) {
        this.routesData[routeIndex].route = data;
    }
    
    private setStopsData(routeIndex: number, data: any) {
        this.routesData[routeIndex].stops = data;
    }
    
    @Emit("data_submitted")
    private submitData() {
        return this.routesData;
    }
    
    private cancelData() {
        this.routesData = [{route: {}, stops: []}, {route: {}, stops: []}];
    }

}
</script>

<style lang="scss" scoped>
.multi-route-component {
    padding: 30px;
    &-route-form-add {
        margin-top: 10px;
        background-color: #7957d5;
        color: white;
    }
    &-body {
        margin-top: 10px;
        border: 1px solid #f28c28;
        border-radius: 4px;
        padding: 20px;
        display: flex;
        text-align: left;
        &-route {
            flex-grow: 1;
        }
    }
}
</style>
