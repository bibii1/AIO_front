<template>
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
          <label for="password1">mot de passe</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password2" type="password" v-model="password2" class="validate">
          <label for="password2">mot de passe</label>
        </div>
      </div>
      <div class="row">
        <button class="btn waves-effect waves-light" type="submit" name="action">Créer l'utilisateur</button>
      </div>
    </form>
  </div>
</template>


<script>
import router from '../router.js';

import PostService from '../PostService';
const postService = new PostService();
export default {
    name:"create",
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
                first_name : this.fn,
                last_name : this.ln,
                password : this.password,
                email :this.email
            };
            postService.getCheckLogin(post)
            .then(res=>{
                console.log(res.data);
                if( res.data >= 1){
                    router.push('/account');
                }
            })
            .catch(err=>console.log(err));
        }
    }
}

</script>

<style scoped>
.input-field col s12{
  color: aliceblue
}
</style>