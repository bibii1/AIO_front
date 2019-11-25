import Vue from 'vue'
import App from './App.vue'
import './assets/css/styles.css'

//le routeur va nous permetre de naviguer entre chaque page de l'appli
//il peut etre appele dans 'template' avec la balise <link-router>
//il peut etre appele dans 'script' avec la methode push
//lien pour mieux comprendre https://www.thepolyglotdeveloper.com/2017/11/router-navigate-pages-vuejs-application/

import router from './router';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
