<template>
  <div>
    <NavBar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/Navbar';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';

export default {
  name: 'app',
  components:{
    NavBar
  },
  updated () {
    if (!localStorage.token && this.$route.path !== '/') {
      this.$router.push('/?redirect=' + this.$route.path)
    }
  }
}
</script>

<style>
</style>
