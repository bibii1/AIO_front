<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5> Bonjour {{user.first_name}}, </h5>
        <h7> Votre appareil, {{contract.object}}, est actuellement assuré pour : </h7>

        
        <h7> Votre garantie a commencé le XX:XX et nous sommes aujourd'hui le {{dd}}/{{mm}}.</h7>
        <h7> La modification de votre garantie et votre nouvelle facturation prendra effet le XX:XX et vous ne serez pas couvert jusqu'a cette date.</h7>
        <h7> Cliquer sur les cases correspondantes pour modifier vos garanties</h7>
        <p>
        <label> 
        <input type="checkbox" id="Perte" value="Perte" v-model="contract.listWarranted.panne">
        <span>Panne</span>
        </label>
        </p>
        <p> 
        <label>
        <input type="checkbox" id="Casse" value="Casse" v-model="contract.listWarranted.casse">
        <span>Casse</span>
        </label>
        </p>
        <p>
        <label>
            <input type="checkbox" name="Vol" id="Vol" value="Vol" v-model="contract.listWarranted.vol">
            <span> Vol</span>
        </label>
        </p>
        <p>
        <label>
        <input type="checkbox" id="Oxydation" value="Oxydation" v-model="contract.listWarranted.oxydation">
        <span> Oxydation </span>
        </label>
        </p>
        <h6>Prix par mois : {{getMonth_price(index)}} €</h6>
    </div>
    <button class="btn waves-effect waves-light" v-on:click="updateContract()" >Confirmer les nouvelles garanties</button>

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
            index :'',
            folder_id : localStorage.getItem('folder_id'),
            user :'' ,
            contract: '',
            today : new Date(),
            mm: '',
            dd: '',
            dialog: false
        }
    },
    methods : {
        updateContract(){
            var text = `Votre garantie a commencé le XX:XX et nous sommes aujourd'hui le {{dd}}/{{mm}}.\n\n`
            text+=  `La modification de vos garanties et son prix actualisé prendra effet le XX:XX.`
            if(confirm(text))
            var post = {
                folder_id : this.folder_id, 
                contract_id:this.contract.contract_id,
                panne: this.contract.listWarranted.panne,
                casse: this.contract.listWarranted.casse,
                vol: this.contract.listWarranted.vol,
                oxydation : this.contract.listWarranted.oxydation}
            console.log()
            postService.updateWarrented(post)
            .then(()=>{
                router.push('/');
            })
        },
        getMonth_price(){
            // index correspond a l'index du contrat concerné, il permet d'indiquer 
            // quel contrat dans listContract de account (récuprer à chaque création de la vue)
            var totalPrice = 0;
            const contract = this.contract;
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
        const today = new Date()
        this.mm = String(today.getMonth() + 1).padStart(2, '0');
        this.dd = String(today.getDate()).padStart(2, '0');
        postService.getAccount(this.folder_id)
        .then(res=>{
            const account = res.data
            this.index = localStorage.getItem("index");
            this.contract = account.listContract[this.index];
            console.log(this.contract)
        })
        postService.getUser(this.folder_id)
        .then(res=> {
            this.user = res.data
        })
    }
}
</script>

<style scoped>
    
</style>