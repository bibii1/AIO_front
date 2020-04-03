<template>
<body>
    <div class="sinisterContainer">
        <NavBar/>
        <h6>Veuillez sélectionner le type de sinistre</h6>
        <div class="collection">
            <a v-on:click="setCasse()" class="collection-item">Casse</a>
            <a v-on:click="setVol()" class="collection-item">Vol</a>
            <a v-on:click="setOxydation()" class="collection-item">Oxydation</a>
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
    name : "ChooseSinister",
    data: function(){
        return{
            //on pourra charger tous les dossier ici pour l'instant que le folder_id
            isAuth: '',
            folder_id : localStorage.getItem('folder_id_user'),
            index : localStorage.getItem('index'),
            warranted : { 
                casse: false,
                vol: false,
                oxydation: false
            },
            account : {},
            typeSinister : this.typeSinister
        }
    },
    methods : {
        setCasse(){
            this.warranted.casse = true
            var {check,typeSinister} = this.checkSinisterWarranted()
            this.typeSinister = typeSinister
            if(check){
                localStorage.setItem('sinisterType',this.typeSinister)
                router.push('/account/contract/sinister/informations')
            }
            else{
                alert("Vous n'avez pas souscris à cette garantie")
            }
        },
        setVol(){
            this.warranted.vol = true
            var {check,typeSinister} = this.checkSinisterWarranted()
            this.typeSinister = typeSinister
            if(check){
                localStorage.setItem('sinisterType',this.typeSinister)
                router.push('/account/contract/sinister/informations')
            }
            else{
                alert("Vous n'avez pas souscris à cette garantie")
            }
        },
        setOxydation(){
            this.warranted.oxydation = true
            var {check,typeSinister} = this.checkSinisterWarranted()
            this.typeSinister = typeSinister
            if(check){
                localStorage.setItem('sinisterType',this.typeSinister)
                router.push('/account/contract/sinister/informations')
            }
            else{
                alert("Vous n'avez pas souscris à cette garantie")
            }
        },
        checkSinisterWarranted(){
            const listWar = this.account.listContract[this.index].listWarranted;
            // on utilise une boucle pour comparer chaque propriété
            // il n'est pas interessant de comparer les attributs listWarranted et warranted
            // il faut juste comparer chacune de leur valeurs pour voir si le sinistre est le meme
            var check = false
            var typeSinister ="";
            if(this.warranted.casse==true){
                if(listWar.casse==true){
                    check=true;
                    typeSinister ="casse";
                }
            }
            else if(this.warranted.vol==true){
                if(listWar.vol==true){
                    check=true;
                    typeSinister = "vol";
                }
            }
            else if(this.warranted.oxydation==true){
                if(listWar.oxydation==true){
                    check=true;
                    typeSinister = "oxydation";
                }
            }
            return {check,typeSinister}
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