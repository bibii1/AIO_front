<template>
<body>
    <div class="navbar"><NavBar/></div>
    <div class="sinisterContainer">
        <h5>Veuillez choisir l'objet sinistré</h5>
        <div class="row">
            <div class="col s10" v-for="(contract,index) in account.listContract"
                v-bind:item="contract"
                v-bind:index="index"
                v-bind:key="contract.contract_id">
                <a v-on:click="declareSinister(index)">
                    <div class="card small horizontal" v-if="contract.isSinistered ===false">
                        <div class="card-image">
                        <img src="../assets/img/Apple/Smartphone/Iphone-X.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone X'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-11.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 11'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-11-Pro.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 11 Pro'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-11-Pro-Max.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 11 Pro Max'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-8.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 8'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-8-plus.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 8 Plus'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-7.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 7'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-7-plus.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 7 PLus'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-XS.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone XS'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-XR.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone XR'">
                        <img src="../assets/img/Apple/Smartphone/Iphone-XS-Max.png" v-if=" contract.brand === 'Apple' && contract.model == 'Iphone XS Max'">
                        <img src="../assets/img/Samsung/Smartphone/Galaxy-S10.png" v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy S10'" >
                        <img src="../assets/img/Samsung/Smartphone/Galaxy-S10.png" v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy S10+'" >
                        <img src="../assets/img/Samsung/Smartphone/Galaxy-Fold.png" v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy Fold'" >
                        <img src="../assets/img/Samsung/Smartphone/Galaxy-Note-10.png" v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy Note 10'" >
                        <img src="../assets/img/Samsung/Smartphone/Galaxy-Note-9.png" v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy Note 9'" >
                        <img src="../assets/img/Samsung/Smartphone/Galaxy-Note-8.png" v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy Note 8'" >
                        <img src="../assets/img/Huawei/Smartphone/P30-Pro.png" v-else-if="contract.brand === 'Huawei' && contract.model == 'P30 Pro'" >
                        <img src="../assets/img/Huawei/Smartphone/P20-Pro.png" v-else-if="contract.brand === 'Huawei' && contract.model == 'P20 Pro'" >
                        <img src="../assets/img/Huawei/Smartphone/P30-Lite.png" v-else-if="contract.brand === 'Huawei' && contract.model == 'P30 Lite'" >
                        <img src="../assets/img/Huawei/Smartphone/P20-Lite.png" v-else-if="contract.brand === 'Huawei' && contract.model == 'P20 Lite'" >
                        <img src="../assets/img/Huawei/Smartphone/Nova-5T.png" v-else-if="contract.brand === 'Huawei' && contract.model == 'Nova 5T'" >
                        <img src="../assets/img/Apple/Tablette/Ipad-Pro.png" v-if=" contract.brand === 'Apple' && contract.model == 'Ipad Pro'"><!-- <img src="../assets/img/Apple/Phones/iphone-X.png" v-if=" contract.brand === 'Apple'">
                            <img src="../assets/img/Samsung/Phones/636x900-vue-1-samsung-galaxy-s10-5g-argent-160694.png" v-else-if="contract.brand === 'Samsung'" >-->
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <p>Objet : {{contract.object}}</p>
                                <p>Marque : {{contract.brand}}</p>
                                <p>Modèle : {{contract.model}}</p>
                                <h6>Prix mensuel : {{contract.month_price}} €</h6>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <router-link :to="'/'">
            <button class="btn waves-effect waves-light">Mon compte</button>
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
    name : "ChooseObject",
    data: function(){
        return{
            //on pourra charger tous les dossier ici pour l'instant que le folder_id
            folder_id : localStorage.getItem('folder_id_user'),
            contract_id : localStorage.getItem('contract_id'),
            account: {}
        }
    },
    methods : {
        declareSinister(index){
            //on utilisera l'index de la card pour identifier le contrat sur lequel agir
            localStorage.setItem('index',index);
            router.push('/account/contract/sinister/chooseSinister');
        }
    },
    components : {
        NavBar
    },
    created(){
        postService.getAccount(this.folder_id)
        .then(res=>{
            this.account = res.data
        })
    }
}
</script>

<style scoped>
    
</style>