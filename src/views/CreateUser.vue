<template>
<body>
  <div class="row">
    <form class="form" v-on:submit.prevent="onSubmit">
      <div class="row">
        <div class="input-field col s12">
          <input id="fn" type="text" v-model="fn" class="validate">
          <label for="fn">Prenom</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="ln" type="text" v-model="ln" class="validate">
          <label for="ln">Nom</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" v-model="email" class="validate">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password1" type="password" v-model="password1" class="validate">
          <label for="password1">Mot de passe</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password2" type="password" v-model="password2" class="validate">
          <label for="password2">Confirmer mot de passe</label>
        </div>
      </div>
      <div class="row">
        <button class="btn waves-effect waves-light" type="submit" name="action">Créer l'utilisateur</button>
      </div>
    </form>
  </div>
</body>
</template>


<script>
import router from '../router.js';
const uuidv4 = require('uuid/v4');

import PostService from '../PostService';
const postService = new PostService();
export default {
    name:"create",
    data(){
        return{
          fn : "",
          ln : "",
          email :"",
          password1: "",
          password2: "",
          count:""
        }
    },
    methods:{
        onSubmit(){
            const post={
                first_name : this.fn,
                last_name : this.ln,
                password : this.password1,
                email :this.email,
                folder : uuidv4()
            };
            postService.postUser(post)
            localStorage.removeItem('acces-token');
            localStorage.removeItem('folder_id');
            postService.initAccount(post.folder)
            //lorsque l'on crée un nouvel utilisateur on remove de localStorage les anciennes données
            //num dossier + ancien acces_token
            router.push('/');
        }
    }
}

</script>

<style scoped>
.input-field col s12{
  color: aliceblue
}
</style>