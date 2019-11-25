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