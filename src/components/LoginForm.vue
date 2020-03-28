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
import PostService from '../PostService';
const postService = new PostService();
import router from '../router';


export default {
    name:"LoginForm",
    data(){
        return{
            email :"",
            password: "",
            count:"",
            error : false
        }
    },
    methods:{
      onSubmit(){
        postService.getCheckLogin({
          email: this.email,
          password : this.password
        })
        .then(res =>{
          if(res.data.userTemp.emailValidation == true)
          {
            const token = res.data.token
            const folder_id = res.data.userTemp.folder
            localStorage.setItem('acces_token',token)
            localStorage.setItem('folder_id_user',folder_id)
            localStorage.setItem('isAuth',true)
            if(this.email.includes('@aio.fr'))
            {
              localStorage.setItem('isAdmin',true)
              router.push('/adminAccount')
            }
            else
            {
              localStorage.setItem('isAdmin',false)
              router.push('account')
            }
          }
          else
            alert("L'email n'a pas été validé. Véfifiez votre boite mail.")
        })
    }
  }
}

</script>

<style scoped>
.input-field col s12{
  color: aliceblue
}
</style>