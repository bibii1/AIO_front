<template>
<body>
    <div class="navbar"><NavBar/></div>
    <div class="accountContainer">
        <NavBar/>
        <h5>Bienvenue {{superuser.first_name}}</h5>
        <h5>Appareil {{user.last_name}} {{user.first_name}} </h5>
        <div class="row">
            <div class="col s10" v-for="(contract,index) in account.listContract"
                v-bind:item="contract"
                v-bind:index="index"
                v-bind:key="contract.contract_id">
                <template  v-if="contract_id===contract.contract_id">
                    <div class="card small horizontal">
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
                            <img src="../assets/img/Apple/Tablette/Ipad-Pro.png" v-if=" contract.brand === 'Apple' && contract.model == 'Ipad Pro'">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <p v-bind:item="folder_id_user">Folder Id : {{folder_id_user}}</p>
                                <p>Objet : {{contract.object}}</p>
                                <p>Marque : {{contract.brand}}</p>
                                <p>Modèle : {{contract.model}}</p>
                                <p>
                                <label>
                                <input type="checkbox" id="Casse" disabled="disabled" value="Casse" v-model="contract.listWarranted.casse">
                                <span>Casse</span>
                                </label>
                                </p>
                                <p>
                                <label>
                                    <input type="checkbox" name="Vol" id="Vol" disabled="disabled" value="Vol" v-model="contract.listWarranted.vol">
                                    <span> Vol</span>
                                </label>
                                </p>
                                <p>
                                <label>
                                <input type="checkbox" id="Oxydation" disabled="disabled" value="Oxydation" v-model="contract.listWarranted.oxydation">
                                <span> Oxydation </span>
                                </label>
                                </p>
                                <p>Prix de l'appareil : {{contract.purchasePrice}}</p>
                                <h6>Prix mensuel : {{contract.month_price}} €</h6>
                            </div>
                            <div class="card-action">
                                <a v-on:click="deleteContract(contract.contract_id)" v-if="contract.isSinistered===false">Supprimer le contrat</a>
                                <a v-on:click="updateContract(index)" v-if="contract.isSinistered===false">Modifier les garanties</a>
                                <a v-on:click="checkSinister(contract.contract_id)" v-if="contract.isSinistered===true">Suivi du sinistre</a>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="card-action">
         <button class="btn waves-effect waves-light" v-on:click="updateSinister()">Valider l'étape</button>
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
const postService = new PostService();
//import router from '../router';


export default {
    name : "AdminCheckContract",
    data: function(){
        return{
            folder_id : localStorage.getItem('folder_id'),
            superuser :" " ,
            account: {},
            dialog: false,
            user: "",
            sinister: "",
            object: "",
            contract_id: localStorage.getItem('contract_id_user'),
            folder_id_user: localStorage.getItem('folder_id_user')
        }
    },
    methods : {
        updateSinister(){
            postService.updateSinister(this.sinister,this.folder_id_user)
        },
        updateContract(){
            router.push('/account/contract/update/warranted')
        },
        deleteContract(contrat_id){
            var text = "Êtes-vous certain de vouloir supprimer ce contract ?\n\n"
            if(confirm(text))
            postService.deleteContract(this.folder_id_user,contrat_id)
            .then(()=>{
                router.push('/adminAccount/adminCheckUser');
            })
        }
    },
    components : {
        NavBar
    },
    created(){
        postService.getSuperUser(this.folder_id)
        .then(res=> {
            this.superuser = res.data
        })
        postService.getUser(this.folder_id_user)
        .then(res=> {
            this.user = res.data
        })
        postService.getSinister(this.folder_id_user,localStorage.getItem('contract_id_user'))
        .then(res=>{
            this.sinister = res.data
        })
        postService.getAccount(this.folder_id_user)
        .then(res=>{
            this.account = res.data
        })
    }
}
</script>

<style scoped>
</style>