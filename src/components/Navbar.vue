<template>
     <nav>
    
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo left">AIO</router-link>
      <ul id="nav-mobile" class="right">
        <li><router-link v-show="!isAuth" :to="'/'">Log in</router-link></li>
        <li><router-link v-show="!isAuth" :to="'/users/create'">Create</router-link></li>
        <li><router-link v-show="isAuth" :to="'/users/modify'">Modify</router-link></li>
        <li><button v-show="isAuth" v-on:click="logout" class="btn waves-effect waves-light" type="submit" name="action">Deconnection</button></li>
        <li><button v-show="isAuth" v-on:click="logoutAll" class="btn waves-effect waves-light" type="submit" name="action">Deconnection totale</button></li>
        <!-- Dropdown Trigger 
        <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>

        -- Dropdown Structure --
        <ul id='dropdown1' class='dropdown-content'>
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li class="divider" tabindex="-1"></li>
          <li><a href="#!">three</a></li>
          <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
          <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
        </ul> -->
      </ul>
    </div>
  </nav>
</template> 

<script>
import PostService from '../PostService';
const postService = new PostService();
import router from '../router';
import $ from 'jquery';



export default {
  data(){
    return{
      isAuth : localStorage.getItem('isAuth')||false
    }
  },
  methods : {
    logout(){
      const token = localStorage.getItem('acces_token');
      postService.logoutAccount(token);
      localStorage.removeItem('acces_token')
      localStorage.removeItem('folder_id')
      localStorage.removeItem('isAuth')
      router.push('/');
    },
    logoutAll(){
      const token = localStorage.getItem('acces_token');
      postService.logoutallAccount(token);
      localStorage.removeItem('isAuth')
      localStorage.removeItem('acces_token')
      localStorage.removeItem('folder_id')
      router.push('/');
    }
  },
  created(){
    const token = localStorage.getItem('acces_token');
    postService.getCheckToken({token})
    //res = nombre de fois ou le token est present dans la bdd
    .then(res=>{
    if(res.data==1){
      this.isAuth = true
    }
    else{
      this.isAuth = false
    }
    })
  }
}

$(document).ready(function(){
    $(".dropdown-trigger").dropdown({hover: false});
  });




// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//     var instances = M.Dropdown.init(elems, options);
// });


</script>
<style scoped>
.nav-wrapper{
  background-color: #45A1D9;
}
</style>