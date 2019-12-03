<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5>nous sommes dans l'account {{folder_id}}</h5>
        <div class="row">
            <div class="col s10" v-for="(contract,index) in account.listContract"
                v-bind:item="contract"
                v-bind:index="index"
                v-bind:key="contract.contract_id">
                <div class="card small horizontal">
                    <div class="card-image">
                        <img src="../assets/img/iphone-X.png">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <p>Objet : {{contract.object}}</p>
                            <p>Marque : {{contract.brand}}</p>
                            <p>Modèle : {{contract.model}}</p>
                            <h6>Prix par mois : {{contract.month_price}} €</h6>
                        </div>
                        <div class="card-action">
                            <a v-on:click="deleteContract(contract.contract_id)">Supprimer le contrat</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-link v-show="!isAuth" :to="'/account/contract/create'">
            <button class="btn waves-effect waves-light">Ajouter un appareil à assurer</button>
            </router-link>
        <br/>
        <button v-on:click="deleteAll" class="btn waves-effect waves-light" type="submit" name="action">Supprimer le compte et ses contrats</button>
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
            folder_id : localStorage.getItem('folder_id'),
            account: {}
        }
    },
    methods : {
        deleteAll(){
            postService.deleteAll(this.folder_id);
            localStorage.removeItem('acces_token');
            localStorage.removeItem('folder_id');
            router.push('/');
        },
        deleteContract(contrat_id){
            console.log(contrat_id);
            console.log(this.folder_id);
            postService.deleteContract(this.folder_id,contrat_id)
            .then(()=>{
                router.push('/');
            })
        }
    },
    components : {
        NavBar
    },
    created(){
        postService.getAccount(this.folder_id)
        .then(res=>{
            console.log(res.data)
            this.account = res.data
        })
    }
}
</script>

<style scoped>
    
</style>