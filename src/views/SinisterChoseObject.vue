<template>
<body>
    <div class="sinisterContainer">
        <NavBar/>
        <h5>nous sommes dans la vue choisir le sinistre </h5>
        <h6>du contract {{contract_id}}</h6>
        <div class="row">
            <div class="col s10" v-for="(contract,index) in account.listContract"
                v-bind:item="contract"
                v-bind:index="index"
                v-bind:key="contract.contract_id">
                <a v-on:click="declareSinister(index)">
                    <div class="card small horizontal">
                        <div class="card-image">
                           <!-- <img src="../assets/img/Apple/Phones/iphone-X.png" v-if=" contract.brand === 'Apple'">
                            <img src="../assets/img/Samsung/Phones/636x900-vue-1-samsung-galaxy-s10-5g-argent-160694.png" v-else-if="contract.brand === 'Samsung'" >-->
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <p>Objet : {{contract.object}}</p>
                                <p>Marque : {{contract.brand}}</p>
                                <p>Modèle : {{contract.model}}</p>
                                <h6>Prix par mois : {{contract.month_price}} €</h6>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <router-link v-show="!isAuth" :to="'/'">
            <button class="btn waves-effect waves-light">Visionnage du compte</button>
            </router-link>
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
            contract_id : localStorage.getItem('contract_id'),
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
        },
        declareSinister(index){
            //on utilisera l'index de la card pour identifier le contrat sur lequel agir
            localStorage.setItem('index',index);
            router.push('/account/contract/sinister/choseSinister');
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