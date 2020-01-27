<template>
<body>
  <div class="createContainer">
    <NavBar/>
  </div>

  <div class="row">
    <br/>
    <br/>
    <div class="row">
      <router-link v-show="!isAuth" :to="'/users/modify/password'">
          <button class="btn waves-effect waves-light">Changer votre mot de passe</button>
      </router-link>
    </div>

    <form class="form" v-on:submit.prevent="onSubmit">
      <div class="row">
        <div class="input-field col s12">
          Prenom
          <input id="fn" type="text" v-model="fn" class="validate">
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          Nom
          <input id="ln" type="text" v-model="ln" class="validate">
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          Email
          <input id="email" type="email" v-model="email" class="validate">
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <button class="btn waves-effect waves-light" type="submit" name="action">Mettre à jour les informations</button>
        </div>
      </div>
    </form>
  </div>
</body>
</template>


<script>
//import router from '../router.js';
import NavBar from '../components/Navbar';




import PostService from '../PostService';
const postService = new PostService();
export default {
    name:"create",
    components : {
      NavBar
    },
    data(){
        return{
          fn : "",
          ln : "",
          email :"",
          password: "",
          count:""
        }
    },
    methods:{
        onSubmit(){
          console.log("submit\nreste à faire la methode submit")
        },
        SendMail(){
          console.log("nous sommes rentrés dans sendLMail le lien envoyé sera :\n\n")
          console.log("http://localhost:3000/users/emailValidation/"+this.email)
        }
    },
    created(){
      postService.getUser(localStorage.getItem('acces_token'))
      .then(res=>{
        this.fn = res.data.first_name;
        this.ln = res.data.last_name;
        this.email= res.data.email;
        this.password = res.data.password;
      })
    }
    
}

</script>

<style scoped>
.input-field col s12{
  color: aliceblue,
}

</style>