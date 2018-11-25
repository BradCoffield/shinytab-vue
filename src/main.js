import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';


import VueFirestore from 'vue-firestore'
Vue.use(VueFirestore)


import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry);


import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

Vue.prototype.$http = axios;

Vue.config.productionTip = false





new Vue({
  render: h => h(App),
}).$mount('#app')
