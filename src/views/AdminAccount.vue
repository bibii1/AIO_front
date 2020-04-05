<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5>Bienvenue {{superuser.first_name}}</h5>
        <input type="text" id="myInput" v-on:keyup="searchByEmail" placeholder="Search for email">
        <b-table id="myTable" striped hover :items="users" :fields="fields" :bordered="true" @row-clicked="myRowClickHandler">
        </b-table>
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
    name : "AdminAccount",
    data: function(){
        return{
            //on pourra charger tous les dossier ici pour l'instant que le folder_id
            folder_id : localStorage.getItem('folder_id'),
            superuser :" " ,
            dialog: false,
            users: [],
            fields: [
                {
                    key: '_id',
                    sortable: false
                },
                {
                    key: 'last_name',
                    sortable: false
                },
                {
                    key: 'first_name',
                    sortable: false
                },
                {
                    key: 'folder',
                    sortable: false
                },
                
                {
                    key: 'email',
                    sortable: false
                },
                {
                    key: 'phone',
                    sortable: false
                }
            ]
        }
    },
    methods : {
        deleteContract(contrat_id){
            var text = "Êtes-vous certain de vouloir supprimer ce contract ?\n\n"
            text+= "Votre contrat pour cet appareil ne sera pas reconduis le mois prochain et vous perdrez vos garanties."
            if(confirm(text))
            postService.deleteContract(this.folder_id,contrat_id)
            .then(()=>{
                router.push('/');
            })
        },
        myRowClickHandler(record) {
            localStorage.setItem('folder_id_user',record.folder)
            router.push('/adminAccount/adminCheckUser')
        },
        searchByEmail() {
            var input = {email: document.getElementById("myInput").value};
            postService.getUserByEmail(input)
            .then(res=>{
            this.users = res.data
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
        postService.getAllUser()
        .then(res=>{
            this.users = res.data
        })
    }
}
</script>

<style scoped>
    
</style>