<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5>Mes informations</h5>
        <div class="col s12 m7">
            <div class="card horizontal">
                <div class="card-image">
                    <img src="https://www.ecole-tunon.com/sites/default/files/secteur/reception_bleu_0.png" alt="" height="250" width="100">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <p>Nom : {{user.last_name}}</p>
                        <p>Prénom : {{user.first_name}}</p>
                        <p>Numéro de contrat d'assurance : {{user.folder}}</p>
                        <p>Téléphone : {{user.phone}}</p>
                        <p>Email : {{user.email}}</p>                
                    </div>
                    <div class="card-action">
                        <a v-on:click="updateUser()">Modifier mes informations</a> 
                        <a href="/users/update/password">Modifier mon mot de passe</a>             
            
                    </div>
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
const postService = new PostService();
import router from '../router';


export default {
    name : "UserSettings",
    data: function(){
        return{
            isAuth: '',
            folder_id : localStorage.getItem('folder_id_user'),
            account: {},
            dialog: false,
            user: ""
        }
    },
    methods : {
        changePwd(){
            router.push('/users/UpdateUserInfos')
        },
    },
    components : {
        NavBar
    },
    created(){
        postService.getUser(localStorage.getItem('folder_id_user'))
        .then(res=> {
            this.user = res.data
        })
        postService.getAccount(localStorage.getItem('folder_id_user'))
        .then(res=> {
            this.account = res.data
            this.items=this.account.listContract
        })
    }
    
}
</script>

<style>
.b-table{
cursor:pointer;
}
p{
    margin-left: 10px;
}
    
</style>
