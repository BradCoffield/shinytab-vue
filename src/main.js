import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import VueFirestore from 'vue-firestore'
import VueMasonry from 'vue-masonry-css'

Vue.use(VueMasonry);
Vue.use(VueFirestore)

Vue.prototype.$http = axios;

Vue.config.productionTip = false





new Vue({
  render: h => h(App),
}).$mount('#app')
