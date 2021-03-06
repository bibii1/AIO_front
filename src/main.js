import Vue from 'vue'
import App from './App.vue'
import './assets/css/styles.css'


//le routeur va nous permetre de naviguer entre chaque page de l'appli
//il peut etre appele dans 'template' avec la balise <link-router>
//il peut etre appele dans 'script' avec la methode push
//lien pour mieux comprendre https://www.thepolyglotdeveloper.com/2017/11/router-navigate-pages-vuejs-application/

import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


/*import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'*/



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
