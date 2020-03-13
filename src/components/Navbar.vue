<template>
  <nav>
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo left">AIO</router-link>
      <ul id="nav-mobile" class="right">
        <li><router-link v-show="!isAuth" :to="'/'">Log in</router-link></li>
        <li><router-link v-show="!isAuth" :to="'/users/create'">Create</router-link></li>
        <li><router-link v-show="!isAuth" :to="'/account'">Account</router-link></li>

        <li><button v-show="isAuth" v-on:click="logout" class="btn waves-effect waves-light" type="submit" name="action">Deconnection</button></li>
        <li><button v-show="isAuth" v-on:click="logoutAll" class="btn waves-effect waves-light" type="submit" name="action">Deconnection totale</button></li>
      </ul>
    </div>
  </nav>
</template> 

<script>
import PostService from '../PostService';
const postService = new PostService();
import router from '../router';


export default {

  data(){
    return{

      isAuth : localStorage.getItem('isAuth')||false
    }
  },
  methods : {
    logout(token=localStorage.getItem('acces_token')){
      postService.logoutAccount(token);
      localStorage.removeItem('acces_token')
      localStorage.removeItem('folder_id')
      localStorage.removeItem('isAuth')
      router.push('/');
    },
    logoutAll(token=localStorage.getItem('acces_token')){
      postService.logoutallAccount(token);
      localStorage.removeItem('isAuth')
      localStorage.removeItem('acces_token')
      localStorage.removeItem('folder_id')
      router.push('/');
    }
  },
  components:{
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
</script>
<style scoped>
.nav-wrapper{
  background-color: #45A1D9;
}

.navbar {
  overflow: hidden;
  background-color: #333;
}

.navbar a {
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}


</style>-