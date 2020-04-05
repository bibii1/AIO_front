<template>
  <nav>
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo left">AIO</router-link>
      <ul id="nav-mobile" class="right">
        <li><router-link v-show="!isAuth" :to="'/'">Se connecter</router-link></li>
        <li><router-link v-show="!isAuth" :to="'/users/create'">Créer un compte</router-link></li>

        <li><button v-show="isAuth" v-on:click="goToSettings" class="btn waves-effect waves-light" type="submit" name="action">Paramètres</button></li>
        <li><button v-show="isAuth" v-on:click="logout" class="btn waves-effect waves-light" type="submit" name="action">Déconnexion</button></li>
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
      isAuth : localStorage.getItem('isAuth')||false,
      folder_id : localStorage.getItem('folder_id')
    }
  },
  methods : {
    logout(){
      const token = localStorage.getItem('acces_token');
      postService.logoutAccount(token)
      localStorage.removeItem('acces_token')
      localStorage.removeItem('folder_id')
      localStorage.removeItem('isAuth')
      router.push('/');
    },
    goToSettings(){
      router.push('/users/settings');
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