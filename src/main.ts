import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDuWyoRt255CfT8mqSMNHKD2FsZeYEzpm0",
    libraries: "places"
  }
});

Vue.use(Buefy);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
