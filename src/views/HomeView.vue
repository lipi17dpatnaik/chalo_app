<template>
  <div class="home">
    <AppHeader />
  <div class="app-view">
  <RoutesView class="split left" @data_submitted="submitData" />
  <MapsView class="split right" :data="data" />
   </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from '@/components/AppHeader.vue';
import RoutesView from '@/views/modules/routes/RoutesView.vue'
import MapsView from '@/views/modules/MapsView.vue'

@Component({
  components: {
    AppHeader,
    RoutesView,
    MapsView
  },
})
export default class HomeView extends Vue {
    
    private data: any = null;
    
    private submitData(data: any) {
        this.data = data;
    }
    
}
</script>

<style lang="scss" scoped>
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  overflow-x: hidden;
  padding-top: 20px;
}
/* Control the left side */
.left {
  left: 0;
}

/* Control the right side */
.right {
  right: 0;
  background-color: lightgrey;
}
</style>
