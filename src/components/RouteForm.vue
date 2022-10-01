<template>
  <div class="route-form">
     <b-field label="Name">
            <b-input :disabled="disabled" v-model="route.name" @input="emitData"></b-input>
     </b-field>
     <b-field label="Direction">
            <b-radio
                :disabled="disabled"
                native-value="Up"
                v-model="route.direction"
                @input="emitData">
                Up
            </b-radio>
            <b-radio
                :disabled="disabled"
                native-value="Down"
                v-model="route.direction"
                @input="emitData">
                Down
            </b-radio>
     </b-field>
     <b-field label="Status">
            <b-radio
                :disabled="disabled"
                native-value="Active"
                v-model="route.status"
                @input="emitData">
                Active
            </b-radio>
            <b-radio
                :disabled="disabled"
                native-value="Inactive"
                v-model="route.status"
                @input="emitData">
                Inactive
            </b-radio>
     </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component({
  components: {

  },
})
export default class RouteForm extends Vue {
    @Prop() private route!: any;
    
    @Prop({ default: false }) private readonly disabled!: boolean;
    
    @Emit("route_data_updated")
    private emitData() {
        return this.route;
    }

   public mounted() {
       if(!this.route) {
           this.route = {};
       }
   }
}
</script>

<style lang="scss" scoped>
.route-form {
    margin-top: 10px;
    
}
</style>
