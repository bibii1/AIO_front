<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5>Bienvenue {{superuser.first_name}}</h5>
        <div class="row">
            <div class="col s10" v-for="(contract,index) in account.listContract"
                v-bind:item="contract"
                v-bind:index="index"
                v-bind:key="contract.contract_id">
                <div class="card small horizontal" v-if="contract.contract_id === contrat_id ">
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
                            <p>Objet : {{contract.object}}</p>
                            <p>Catégorie : {{contract.category}}</p>
                            <p>Marque : {{contract.brand}}</p>
                            <p>Modèle : {{contract.model}}</p>
                            <p>Numéro de série : {{contract.serialNumber}}</p>
                            <p>Liste de garanties : {{contract.listWarranted}}</p>
                            <p>prix du tel : {{contract.purchasePrice}}</p>
                            <h6>Prix par mois : {{contract.month_price}} €</h6>
                        </div>
                        <div class="card-action">
                            <!-- Voir les documents ici -->
                        </div>
                    </div>
                </div>
            </div>    
        </div>
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
    name : "AdminCheckSinister",
    data: function(){
        return{
            isAuth: '',
            folder_id : localStorage.getItem('folder_id'),
            superuser :" " ,
            account: {},
            dialog: false,
            user: "",
            sinister: "",
            object: "",
            contrat_id: localStorage.getItem('contract_id_user'),
            folder_id_user: localStorage.getItem('folder_id_user')
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
            postService.updateSinister(this.sinister,this.folder_id_user)
        },
        getMonth_price(index){
            // index correspond a l'index du contrat concerné, il permet d'indiquer 
            // quel contrat dans listContract de account (récuprer à chaque création de la vue)
            var totalPrice = 0;
            const contract = this.account.listContract[index];
            const price = contract.purchasePrice; 
            if(price<250){
                if(contract.listWarranted.panne == true){
                    totalPrice = totalPrice + 1
                }
                if(contract.listWarranted.casse == true){
                    totalPrice = totalPrice + 3
                }
                if(contract.listWarranted.vol == true){
                    totalPrice = totalPrice + 1.5
                }
                if(contract.listWarranted.oxydation == true){
                    totalPrice = totalPrice + 3
                }
            }
            if(price>250 && price<600){
                if(contract.listWarranted.panne == true){
                    totalPrice = totalPrice + 1
                }
                if(contract.listWarranted.casse == true){
                    totalPrice = totalPrice + 4.5
                }
                if(contract.listWarranted.vol == true){
                    totalPrice = totalPrice + 3
                }
                if(contract.listWarranted.oxydation == true){
                    totalPrice = totalPrice + 4.5
                }
            }
            if(price>600){
                if(contract.listWarranted.panne == true){
                    totalPrice = totalPrice + 1.5
                }
                if(contract.listWarranted.casse == true){
                    totalPrice = totalPrice + 6
                }
                if(contract.listWarranted.vol == true){
                    totalPrice = totalPrice + 6
                }
                if(contract.listWarranted.oxydation == true){
                    totalPrice = totalPrice + 6
                }
            }
            return totalPrice;
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
        postService.getSinister(this.folder_id_user,this.contrat_id)
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

<style>
</style>