<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5> Bonjour {{user.first_name}}, </h5>
        <h7> Votre appareil '{{contract.object}}' est actuellement assuré pour : </h7>
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
            const dateCont = new Date(this.contract.contractDate);
            const m = String(dateCont.getMonth() + 1).padStart(2, '0');
            // the next month
            const m2 = String(dateCont.getMonth() + 2).padStart(2, '0')
            const d = String(dateCont.getDate()).padStart(2, '0');
            const y = String(dateCont.getFullYear());
            var text = `Votre garantie a commencé le ${d}/${m}/${y} et nous sommes aujourd'hui le ${this.dd}/${this.mm}.\n\n`
            text+=  `La modification de vos garanties et son prix actualisé prendra effet le ${d}/${m2}.`
            if(confirm(text))
            var post = {
                folder_id : this.folder_id, 
                contract_id:this.contract.contract_id,
                panne: this.contract.listWarranted.panne,
                casse: this.contract.listWarranted.casse,
                vol: this.contract.listWarranted.vol,
                oxydation : this.contract.listWarranted.oxydation}
            postService.updateWarrented(post)
            .then(()=>{
                const cont = {
                    email : this.user.email,
                    first_name : this.user.first_name,
                    object : this.contract.object,
                    m : m2, //the number of the next month
                    d : d,
                    panne: this.contract.listWarranted.panne,
                    casse: this.contract.listWarranted.casse,
                    vol: this.contract.listWarranted.vol,
                    oxydation : this.contract.listWarranted.oxydation
                }
                postService.sendMailUpdateWarranted(cont)
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