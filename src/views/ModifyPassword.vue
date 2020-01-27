<template>
<body>
  <div class="createContainer">
    <NavBar/>
  </div>
  <div class="row">
    <form class="form" v-on:submit.prevent="onSubmit">
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" v-model="password" class="validate">
          <label for="password">Mot de passe actuelle</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          
          <input id="password1" type="password" v-model="password1" class="validate">
          <label for="password1">Entrer nouveau mot de passe</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          
          <input id="password2" type="password" v-model="password2" class="validate">
          <label for="password2">Confirmer nouveau mot de passe</label>
        </div>
      </div>
      <div class="row">
        <button class="btn waves-effect waves-light" type="submit" name="action">Mettre à jour les informations</button>
      </div>
    </form>
  </div>
</body>
</template>


<script>
//import router from '../router.js';
import NavBar from '../components/Navbar';
import router from '../router.js'



import PostService from '../PostService';
const postService = new PostService();
export default {
    name:"create",
    components : {
      NavBar
    },
    data(){
        return{
            email:"",
            password: "",
            password1: "",
            password2: "",
            count:""
        }
    },
    methods:{
        onSubmit(){
            const user={
                email: this.email,
                password: this.password
            }
            postService.getCheckLogin(user)
            .then(res=>{
                if(res.status==200)
                {
                    console.log("faire la methode pour comparer les mdp entre eux\n+faire l'update")
                    
                    
                    
                    postService.logoutallAccount(res.data.token)
                    .then(res2=>{
                        
                        console.log(res2)
                    })
                    router.push('/');
                }
                
            })

        }
    },
    created(){
      postService.getUser(localStorage.getItem('acces_token'))
      .then(res=>{       
        this.email= res.data.email;

      })
    }
    
    
}

</script>

<style scoped>
.input-field col s12{
  color: aliceblue
}
</style>