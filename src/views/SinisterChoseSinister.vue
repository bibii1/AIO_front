<template>
<body>
    <div class="sinisterContainer">
        <NavBar/>
        <h5>nous sommes dans la vue sinister de l'objet rattaché au contract {{contract_id}}</h5>
        <h6>selectionnez votre sinistre</h6>
        <div class="collection">
            <a v-on:click="setPanne()" class="collection-item">panne</a>
            <a v-on:click="setCasse()" class="collection-item">casse</a>
            <a v-on:click="setVol()" class="collection-item">vol</a>
            <a v-on:click="setOxydation()" class="collection-item">oxydation</a>
            <a v-on:click="setTypeSinister('autre')" class="collection-item">autre</a>
        </div>
        <div class="row">
            <div class="col s6">
                
            </div>
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


export default {
    name : "Account",
    data: function(){
        return{
            //on pourra charger tous les dossier ici pour l'instant que le folder_id
            folder_id : localStorage.getItem('folder_id'),
            index : localStorage.getItem('index'),
            warranted : { 
                panne: false,
                casse: false,
                vol: false,
                oxydation: false
            },
            account : {}
        }
    },
    methods : {
        setTypeSinister(name){
            console.log(name);
            this.type = name;
        },
        setPanne(){
            this.warranted.panne = true
            this.checkSinisterWarranted()
        },
        setCasse(){
            this.warranted.casse = true
            this.checkSinisterWarranted()
        },
        setVol(){
            this.warranted.vol = true
            this.checkSinisterWarranted()
        },
        setOxydation(){
            this.warranted.oxydation = true
            this.checkSinisterWarranted()
        },
        checkSinisterWarranted(){
            const listWar = this.account.listContract[this.index].listWarranted;
            // on utilise une boucle pour comparer chaque propriété
            // il n'est pas interessant de comparer les attributs listWarranted et warranted
            // il faut juste comparer chacune de leur valeurs pour voir si le sinistre est le meme
            console.log(listWar.panne)
            var check = false
            if(this.warranted.panne==true){
                if(listWar.panne==true){
                    check=true;
                }
            }
            if(this.warranted.casse==true){
                if(listWar.casse==true){
                    check=true;
                }
            }
            if(this.warranted.vol==true){
                if(listWar.vol==true){
                    check=true;
                }
            }
            if(this.warranted.oxydation==true){
                if(listWar.oxydation==true){
                    check=true;
                }
            }
            console.log("le garantie match: "+ check)
            if(check == true){
                console.log("réussite de la declaration du sinistre")
                router.push('/')
            }
            else{
                console.log("vous n'avez pas soustrait à cette garantie")
                for(var warkk in this.warranted){
                    warkk = false
                    console.log(warkk)
                }
            }
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