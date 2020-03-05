<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5>Bienvenue {{superuser.first_name}}</h5>
        <div class="card-action">
         <button v-on:click="updateSinister()">Valider l'etape</button>
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
//import router from '../router';


export default {
    name : "Account",
    data: function(){
        return{
            isAuth: '',
            folder_id : localStorage.getItem('folder_id'),
            superuser :" " ,
            account: {},
            dialog: false,
            user: "",
            sinister: "",
            object: ""
        }
    },
    methods : {
        myRowClickHandler(record) {
            localStorage.setItem('contract_id_user',record.contrat_id)
            //router.push('/adminAccount/AdminCheckSinister')
        },
        updateSinister(){
            if(this.sinisterStep< 3)
            this.sinisterStep+=1
            postService.updateSinister(this.sinister,localStorage.getItem('folder_id_user'))
        }
    },
    components : {
        NavBar
    },
    created(){
        const folder_id_user = localStorage.getItem('folder_id_user')
        postService.getSuperUser(this.folder_id)
        .then(res=> {
            this.superuser = res.data
        })
        postService.getUser(folder_id_user)
        .then(res=> {
            this.user = res.data
        })
        postService.getSinister(folder_id_user,localStorage.getItem('contract_id_user'))
        .then(res=>{
            this.sinister = res.data
        })
        postService.getAccount(localStorage.getItem('contract_id_user'))
        .then(res=>{
            this.account = res.data
        })
    }
}
</script>

<style>
</style>