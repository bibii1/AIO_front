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
import router from '../router';


export default {
    name : "Account",
    data: function(){
        return{
            //on pourra charger tous les dossier ici pour l'instant que le folder_id
            isAuth: '',
            folder_id : localStorage.getItem('folder_id'),
            superuser :" " ,
            account: {},
            dialog: false,
            user: "",
            sinister: ""
        }
    },
    methods : {
        deleteContract(contrat_id){
            var text = "Êtes-vous certain de vouloir supprimer ce contract ?\n\n"
            text+= "Votre contrat pour cet appareil ne sera pas reconduis le mois prochain et vous perdrez vos garanties."
            if(confirm(text))
            postService.deleteContract(this.folder_id,contrat_id)
            .then(()=>{
                router.push('/');
            })
        },
        myRowClickHandler(record) {
            localStorage.setItem('contract_id_user',record.contrat_id)
            //router.push('/adminAccount/AdminCheckSinister')
        },
        updateSinister(){
            this.sinister.sinisterStep = 1
            postService.updateSinister(this.sinister,localStorage.getItem('folder_id_user'))
            .then(res=>
            console.log(res))
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
    }
}
</script>

<style>
</style>