<template>
  <div class="row">
    <form class="form" v-on:submit.prevent="onSubmit">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" v-model="email" class="validate">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" v-model="password" class="validate">
          <label for="password">Mot De Passe</label>
        </div>
      </div>
      <div class="row">
        <button class="btn waves-effect waves-light" type="submit" name="action">Connection</button>
      </div>
    </form>
  </div>
</template>


<script>
import router from '../router.js';

import PostService from '../PostService';
const postService = new PostService();
export default {
    name:"LoginForm",
    data(){
        return{
            email :"",
            password: "",
            count:""
        }
    },
    methods:{
        onSubmit(){
            const post={
                email :this.email,
                password : this.password
            };

            postService.getCheckLogin(post)
            .then(res=>{
              //si l'utilsateur est identifié la fonction renvoit dans l'objet res.data le numero de folder de l'utilisateur
                if( res.data.folder != ""){
                    //on lance la fonction initialisation d'un account,
                    
                    //la fonction va permettre de recuperer l'ensemble de infos du compte si deja existant
                    postService.initAccount(res.data);

                    router.push('/account');
                    //je crois j'ai trouvé la facon de faire pour utiliser des sessions genre que je ne puisse pas afficher 
                    //la page /account sans passer par une authentification réussie
                    //lien - https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
                }
                else{
                  //il faudra ajouter un truc pour dire que le compte n'est pas valide etc..
                }
            });
        }
    }
}

</script>

<style scoped>
.input-field col s12{
  color: aliceblue
}
</style>