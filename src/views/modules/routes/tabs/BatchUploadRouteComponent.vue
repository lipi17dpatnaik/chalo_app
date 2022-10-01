<template>
  <div class="batch-upload-route-component">
     <header class="modal-card-head">
        <div class="modal-card-title">Form for batch uploading routes</div>
     </header>
    <div>
      <b-field class="upload-file">
        <b-upload v-model="csvFile" @input="onFileUpload" drag-drop class="upload-file">
          <section class="section">
            <div class="content has-text-centered">
            <p>
            <b-icon icon="upload" size="is-large"> </b-icon>
            </p>
            <p>Drop .csv file here or click to upload</p>
            <sup
                  >Create a .csv file with columns - route name; route direction; route status; stop 1 name,latitutude,longitude|stop 2 name,latitude,longitude|... and upload </sup
            >
            </div>
          </section>
        </b-upload>
      </b-field>
    </div>
    <div v-if="routesData.length > 0" class="batch-upload-route-component-body">
        Processed Data
        <div class="batch-upload-route-component-body"
            v-for="(route, routeIndex) in routesData"
            :key="routeIndex">
            <div class="batch-upload-route-body-route">
                <RouteForm disabled :route="routesData[routeIndex].route" />
                <StopsForm disabled :stops="routesData[routeIndex].stops" :batch-upload="batchUpload" />
        </div>
        </div>
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
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import RouteForm from '@/components/RouteForm.vue';
import StopsForm from '@/components/StopsForm.vue';

const fileReader = new FileReader();

@Component({
  components: {
      RouteForm,
      StopsForm
  },
})
export default class BatchUploadRouteComponent extends Vue {
  private batchUpload = true;

  private routesData: any = [];
  private csvFile: any;
    
  private csvToArray(str: string) {
        const rows = str.split(/\r\n|\n/);
        const arr = rows.map((row) => {
            const rowData = row.split(",");
            return {
                route: {
                    name: rowData[0],
                    direction: rowData[1],
                    status: rowData[2],
                },
                stops: rowData[3].split("|").map((stop) => {
                    const stopData = stop.split(";");
                    return {
                        name: stopData[0],
                        latitude: stopData[1],
                        longitude: stopData[2],
                    };
                }),
            };
        });
        return arr;
    }
    
  private onFileUpload() {
        this.routesData = [];
        fileReader.readAsText(this.csvFile);
        fileReader.onload =  (event) => {
            const CSVtext = event.target?.result;
            if (CSVtext) {
                try {
                    this.routesData = this.csvToArray(CSVtext.toString());
                } catch(error: any) {
                    fileReader.abort();
                    console.log("Error in reading CSV: ", error);
                }
            }
        };
        fileReader.onerror = () => {
            console.log("Error in reading CSV");
            this.csvFile = null;
            fileReader.abort();
        };
    }
    
  @Emit("data_submitted")
  private submitData() {
        this.csvFile = null;
         return this.routesData;
    }
    
  private cancelData() {
        this.routesData = [];
        this.csvFile = null;
    }
}
</script>

<style lang="scss" scoped>
.batch-upload-route-component {
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
