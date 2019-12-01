<template>
     <nav>
    
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo left">AIO</router-link>
      <ul id="nav-mobile" class="right">
        <li><router-link :to="'/'">Log in</router-link></li>
        <li><router-link :to="'/create'">Create</router-link></li>
        <li><router-link to="/account">Account</router-link></li>

        <li><button v-on:click="logout" class="btn waves-effect waves-light" type="submit" name="action">Deconnection</button></li>
        <li><button v-on:click="logoutAll" class="btn waves-effect waves-light" type="submit" name="action">Deconnection total</button></li>

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
      Auth : null 
    }
  },
  methods : {
    logout(){
      const token = localStorage.getItem('acces_token');
      postService.logoutAccount(token);
      localStorage.removeItem('acces_token')
      localStorage.removeItem('folder_id')
      router.push('/');
    },
    logoutAll(){
      const token = localStorage.getItem('acces_token');
      postService.logoutallAccount(token);
      localStorage.removeItem('acces_token')
      localStorage.removeItem('folder_id')
      router.push('/');
    }
    
  },
  created(){
    const token = localStorage.getItem('acces_token');
    console.log(token)
    postService.getCheckToken(token)
    //res = nombre de fois ou le token est present dans la bdd
    .then(res=>{
      console.log("count "+res.data)
      if(res.data==1){
        this.Auth = true
      }
      else{
        this.Auth = false
      }
      console.log(this.Auth)
      return this.Auth
    })
  }
}
</script>
<style scoped>
.nav-wrapper{
  background-color: #45A1D9;
}
</style>