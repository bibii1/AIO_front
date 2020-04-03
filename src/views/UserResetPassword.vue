<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5>Changement de votre mot de passe</h5>
        <div class="col s12 m7">
            <div class="card horizontal">
            <div class="card-stacked">
                <p>Veuillez s'il vous plait indiquer votre nouveau mot de passe </p>
                <form class="form" v-on:submit.prevent="onSubmit">
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="tempPwd" type="password" v-model="tempPwd" class="validate" required>
                        <label for="tempPwd">Entrez le mot de passe temporaire</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="Pwd1" type="password" v-model="Pwd1" class="validate" required>
                        <label for="Pwd1">Entrez votre nouveau mot de passe</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="Pwd2" type="password" v-model="Pwd2" class="validate" required>
                        <label for="Pwd2">Confirmez votre nouveau mot de passe</label>
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Valider</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
</body>
</template>

<script>
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';
//dans cette vue
//pour acceder au numero de folder il suffit de faire 
//localStorage.getItem('folder_id')
//on peut se servir de cette variable pour ensuite charger notre page etc
//pour acceder au token de l'utilisateur
//localStorage.getItem('acces_token')
//on utilisera ce token pour faire logout de la session ou logout total
import NavBar from '../components/Navbar';
import PostService from '../PostService';
import router from '../router';
// import router from '../router';
const postService = new PostService();


export default {
    name : "UpdateUserInfos",
    data: function(){
        return{
            tempPwd: "",
            Pwd1 : "",
            Pwd2 : "",
        }
    },
    methods : {
        onSubmit(){
            if(this.Pwd1==this.Pwd2){
                const tempPwd = this.tempPwd;
                const new_password = this.Pwd1;
                postService.updateResetPassword(tempPwd,new_password)
                .then(()=>{
                    alert("le mot de passe a été changé")
                    router.push('/')
                })
                .catch(()=>alert("mot de passe provisoire invalide"))
                
            }
            else{
                alert("les mots de passe saisis sont diférents")
            }
        }
    },
    components : {
        NavBar
    }
}
</script>

<style>
    
</style>