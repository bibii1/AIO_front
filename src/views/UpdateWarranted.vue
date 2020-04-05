<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5> Bonjour {{user.first_name}}, </h5>
        <h7> Votre appareil '{{contract.object}}' est actuellement assuré pour : </h7>
        <p>
        <label>
          <input type="checkbox" id="Casse" value="Casse" v-model="casse">
          <span>Casse</span>
        </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="Vol" id="Vol" value="Vol" v-model="vol">
            <span>Vol</span>
          </label>
        </p>
        <p>
        <label>
          <input type="checkbox" id="Oxydation" value="Oxydation" v-model="oxydation">
          <span>Oxydation </span>
        </label>
        </p>
        <div class="row">
        <label>Prix mensuel</label>
        <div class="input-field col s12">
          <input disabled type="text" id="month_price" v-model="month_price" class="validate">
        </div>
      </div>
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
            folder_id : localStorage.getItem('folder_id_user'),
            user :'' ,
            contract: '',
            today : new Date(),
            mm: '',
            dd: '',
            dialog: false,
            month_price: 0,
            casse:false,
            oxydation:false,
            vol:false
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
                casse: this.casse,
                vol: this.vol,
                oxydation : this.oxydation,
                month_price: this.month_price}
            postService.updateWarrented(post)
            .then(()=>{
                const cont = {
                    email : this.user.email,
                    first_name : this.user.first_name,
                    object : this.contract.object,
                    m : m2, //the number of the next month
                    d : d,
                    casse: this.casse,
                    vol: this.vol,
                    oxydation : this.oxydation,
                    month_price: this.month_price
                }
                postService.sendMailUpdateWarranted(cont)
                if(localStorage.getItem('isAdmin')==='false' || localStorage.getItem('isAdmin')===undefined){
                  router.push('/');
                }
                else{
                  router.push('/adminAccount/adminCheckUser')
                }
            })
        },
        getMonthPrice(casse,vol,oxydation,category,price){
          var month_price = 0
          if(category==='Smartphone'){
            if(casse===true){
              if(price < 499){
                month_price+=3.99
              }
              else if (price<799){
                month_price+=5.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=7.99
              }
            }
            if(oxydation===true){
              month_price+=0.99
            }
            if(vol===true){
              if(price < 499){
                month_price+=0.99
              }
              else if (price<999){
                month_price+=1.99
              }
              else if(price<2000){
                month_price+=2.99
              }
            }
          }

          if(category==='Tablette'){
            if(casse===true){
              if(price < 499){
                month_price+=2.99
              }
              else if (price<799){
                month_price+=4.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=8.99
              }
            }
            if(oxydation===true){
              month_price+=0.99
            }
            if(vol===true){
              if (price<799){
                month_price+=0.99
              }
              else if(price<2000){
                month_price+=1.99
              }
            }
          }

          if(category==='Ordinateur portable'){
            if(casse===true){
              if(price < 499){
                month_price+=2.99
              }
              else if (price<799){
                month_price+=4.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=11.99
              }
              else if(price<2500){
                month_price+=17.99
              }
              else if(price<3000){
                month_price+=21.99
              }
              else if(price<4000){
                month_price+=27.99
              }
            }
            if(oxydation===true){
              if(price<2000){
                month_price+=0.99
              }
              else{
                month_price+=1.99
              }
            }
            if(vol===true){
              if (price<799){
                month_price+=0.99
              }
              else if(price<2000){
                month_price+=1.99
              }
              else if(price<2500){
                month_price+=2.99
              }
              else if(price<3000){
                month_price+=3.99
              }
              else if(price<4000){
                month_price+=4.99
              }
            }
          }

          if(category==='Photo et Optique'){
            if(casse===true){
              if(price < 499){
                month_price+=3.99
              }
              else if (price<799){
                month_price+=5.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=12.99
              }
              else if(price<2500){
                month_price+=18.99
              }
              else if(price<3000){
                month_price+=22.99
              }
              else if(price<4000){
                month_price+=28.99
              }
            }
            if(oxydation===true){
              if(price<2000){
                month_price+=0.99
              }
              else{
                month_price+=1.99
              }
            }
            if(vol===true){
              if (price<799){
                month_price+=0.99
              }
              else if(price<2000){
                month_price+=1.99
              }
              else if(price<2500){
                month_price+=2.99
              }
              else if(price<3000){
                month_price+=3.99
              }
              else if(price<4000){
                month_price+=4.99
              }
            }
          }

          if(category==="Console"){
            if(casse===true){
              if(price < 499){
                month_price+=2.99
              }
              else if (price<799){
                month_price+=4.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=10.99
              }
              else if(price<2500){
                month_price+=15.99
              }
            }
            if(oxydation===true){
              if(price<2000){
                month_price+=0.99
              }
              else{
                month_price+=1.99
              }
            }
            if(vol===true){
              if (price<799){
                month_price+=0.99
              }
              else if(price<2000){
                month_price+=1.99
              }
              else{
                month_price+=2.99
              }
            }
          }
          return month_price
        },
    },
    watch:{
      casse: function(val){
        this.month_price = this.getMonthPrice(val,this.vol,this.oxydation,this.contract.category,this.contract.purchasePrice).toFixed(2)
      },
      oxydation: function(val){
        this.month_price = this.getMonthPrice(this.casse,this.vol,val,this.contract.category,this.contract.purchasePrice).toFixed(2)
      },
      vol: function(val){
        this.month_price = this.getMonthPrice(this.casse,val,this.oxydation,this.contract.category,this.contract.purchasePrice).toFixed(2)
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
            this.month_price = this.contract.month_price
            this.casse = this.contract.listWarranted.casse
            this.vol = this.contract.listWarranted.vol
            this.oxydation = this.contract.listWarranted.oxydation
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