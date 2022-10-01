<template>
  <div class="stops-form">
      <b-field label="Stops">
        </b-field>
        <b-button
            v-if="!batchUpload"
            class="stops-form-add"
            @click="addNewStop"
            ><b-icon icon="plus" size="is-small"> </b-icon>
            Add Stop
        </b-button>
        <div
            class="stops-form-fields"
            v-for="(stop, stopIndex) in stops"
            :key="stopIndex"
          >
            <b-field label="Name">
                <b-input :disabled="disabled" v-model="stop.name" @input="emitData"></b-input>
            </b-field>
            <b-field label="Latitude">
              <b-input :disabled="disabled" v-model="stop.latitude" @input="emitData"></b-input>
            </b-field>
           
            <b-field label="Longitude">
              <b-input :disabled="disabled" v-model="stop.longitude" @input="emitData"></b-input>
            </b-field>
            <span @click="deleteStop(stopIndex)"  v-if="!batchUpload">
              <b-icon icon="close-circle" size="is-small"> </b-icon
            ></span>
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';

@Component({
  components: {

  },
})
export default class StopsForm extends Vue {
    @Prop() private stops!: any;

    @Prop() private batchUpload!: boolean;
    
    @Prop({ default: false }) private readonly disabled!: boolean;

    @Emit("stops_data_updated")
    private addNewStop() {
        this.stops.push({
            name: "",
            latitude: "",
            longitude: "",
        });
        return this.stops;
    }
    
    @Emit("stops_data_updated")
    private emitData() {
        return this.stops;
    }
    
    @Emit("stops_data_updated")
    private deleteStop(stopIndex: number) {
    if (this.stops.length > 1)
      this.stops.splice(stopIndex, 1);
    return this.stops;
  }

  mounted() {
    if(!this.stops) {
      this.stops = [];
    }
  }
}
</script>

<style lang="scss" scoped>
.stops-form {
    margin-top: 20px;
    &-add {
      margin-bottom: 10px;
      background-color: #7957d5;
      color: white;
    }
    &-fields {
      display: flex;
      margin-bottom: 0.5rem;
      border: 1px solid #f28c28;
      border-radius: 0.25rem;
      padding: 1rem;
      position: relative;
    }
    
}
</style>
