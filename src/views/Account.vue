<template>
    <div class="row">
        <Navbar/>
        <h5>nous sommes dans l'account {{folder_id}}</h5>
        <button v-on:click="deleteAll" class="btn waves-effect waves-light" type="submit" name="action">Supprimer le compte et ses contrats</button>
    </div>
</template>


<script>
//dans cette vue
//pour acceder au numero de folder il suffit de faire 
//localStorage.getItem('folder_id')
//on peut se servir de cette variable pour ensuite charger notre page etc
//pour acceder au token de l'utilisateur
//localStorage.getItem('acces_token')
//on utilisera ce token pour faire logout de la session ou logout total
const Navbar = require('../components/Navbar');
import PostService from '../PostService';
const postService = new PostService();
import router from '../router';


export default {
    name : "Account",
    data: function(){
        return{
            //on pourra charger tous les dossier ici pour l'instant que le folder_id
            folder_id : localStorage.getItem('folder_id') || "le get folder_id n'a pas marché"
        }
    },
    methods : {
        deleteAll(){
            postService.deleteAll(this.folder_id);
            localStorage.removeItem('acces_token');
            localStorage.removeItem('folder_id');
            router.push('/');
        }
    },
    components : {
        Navbar
    }
}
</script>