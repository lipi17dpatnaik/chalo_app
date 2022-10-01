<template>
  <div class="maps-view">
      <div class="maps-view-header">
        <gmap-map
            v-if="routeInfos && routeInfos.length > 0"
            :zoom="14"
            :center="routeInfos[0].stops[0]"
            style="width:100%;  height: 1500px;"
        >
            <gmap-marker
                :key="index"
                v-for="(m, index) in locationMarkers"
                :position="m.position"
                :clickable="true"
                @click="toggleInfoWindow(m,index)"
            ></gmap-marker>
            <gmap-info-window
                :position="selectedMarker && selectedMarker.position"
                :opened="markerInfoWindowOpen"
                @closeclick="markerInfoWindowOpen = false"
            >
                {{ selectedMarker && selectedMarker.name || "" }}
            </gmap-info-window>
            <gmap-polyline
                :key="routeIndex"
                v-for="(routeInfo, routeIndex) in routeInfos"
                :path="routeInfo.stops"
                :options="getPolylineOptions(routeInfo)"
            >
            </gmap-polyline>
            <gmap-info-window
                :key="routeIndex"
                v-for="(routeInfo, routeIndex) in routeInfos"
                :position="routeInfo.stops[0]"
            >
         
            Currently viewing an {{ routeInfo.route.status }} route - {{ routeInfo.route.name }} in {{ routeInfo.route.direction }} direction
              
            </gmap-info-window>
        </gmap-map>
        <gmap-map
            v-else
            :zoom="14"
            :center="defaultCenter"
            style="width:100%;  height: 1500px;"
        >
        </gmap-map>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  components: {

  },
})
export default class MapsView extends Vue {
    
    @Prop() private data!: any;
    
    private selectedMarker = {} as any;
    
    private markerInfoWindowOpen = false;
    
    private defaultCenter = { lat: 12.971599, lng: 77.594566 };
    
    private selectedMarkerIndex = -1;
    
    private getPolylineOptions(routeInfo: any) {
      return {strokeColor: routeInfo.color}
    }
    private toggleInfoWindow(marker: any, index: number) {
        if (this.selectedMarkerIndex === index) 
            this.markerInfoWindowOpen = !this.markerInfoWindowOpen;
        else {
            this.markerInfoWindowOpen = true;
            this.selectedMarkerIndex = index;
            this.selectedMarker = marker;
        }
    }
    
    private getRandomColor() {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#" + randomColor;
    }
    
    private get routeInfos() {
      const test = this.data?.map((routeInfo: any) => {
            return {
                route: {...routeInfo.route},
                stops: routeInfo.stops?.map((stop: any) => {
                    return {
                        lat: parseFloat(stop.latitude),
                        lng: parseFloat(stop.longitude)
                    }
                }),
                color: this.getRandomColor(),
            }
        });
        return this.data?.map((routeInfo: any) => {
            return {
                route: {...routeInfo.route},
                stops: routeInfo.stops?.map((stop: any) => {
                    return {
                        lat: parseFloat(stop.latitude),
                        lng: parseFloat(stop.longitude)
                    }
                }),
                color: this.getRandomColor(),
            }
        });
    }
    
    private get locationMarkers() {
        let markerInfos: any = [];
        this.data?.map((routeInfo: any) => {
            routeInfo.stops.map((stop: any) => {
                markerInfos.push({
                    position: {
                        lat: parseFloat(stop.latitude),
                        lng: parseFloat(stop.longitude),
                    },
                    name: stop.name,
                });
            })
        })
        return markerInfos;
    }
    
    
}
</script>

<style lang="scss" scoped>
.maps-view {
    padding: 30px;
    &-header {
      font-weight: 500;
      font-size: 30px;
    }
}
</style>
