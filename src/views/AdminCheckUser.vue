<template>
<body>
    <div class="navbar"><NavBar/></div>
    <div class="accountContainer">
        <h5>Fiche client</h5>
        <div class="col s12 m7">
            <div class="card horizontal">
            <div class="card-image">
                <img src="https://www.ecole-tunon.com/sites/default/files/secteur/reception_bleu_0.png" alt="" height="250" width="100">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>Nom : {{user.last_name}}</p>
                    <p>Prénom : {{user.first_name}}</p>
                    <p>Numéro de contrat d'assurance : {{user.folder}}</p>
                    <p>Téléphone : {{user.phone}}</p>
                    <p>Email : {{user.email}}</p>                
                </div>
                <div class="card-action">
                    <a v-on:click="updateUser()">Modifier la fiche client</a>
                    <a v-on:click="logoutAll()">Déconnecter les appareils</a>
                    <br/><br/>
                    <a v-on:click="deleteUser()">Supprimer l'utilisateur et ses contrats</a>                
                </div>
            </div>
            </div>
        </div>
    
        <h5>Liste des appareils assurés </h5>
        <input type="text" id="myInput" v-on:keyup="searchBySN" placeholder="Search for serial number">
        <b-table id="myTable" striped hover :items="items" :bordered="true" :fields="fields" @row-clicked="myRowClickHandler">
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
    name : "AdminCheckUser",
    data: function(){
        return{
            folder_id : localStorage.getItem('folder_id'),
            superuser :" " ,
            account: {},
            dialog: false,
            user: "",
            items:[],
            fields: [
                {
                    key: 'contract_id',
                    sortable: false
                },
                {
                    key: 'object',
                    sortable: false
                },
                {
                    key: 'serialNumber',
                    sortable: false
                },
                {
                    key: 'purchasePrice',
                    sortable: false
                }
            ]
        }
    },
    methods : {
        logoutAll(){
            if(confirm(`Etes-vous sûr de vouloir déconnecter tous les appareils ${this.user.first_name} ${this.user.last_name} ?\n Cette opération est irréversible.`)){
                postService.getUser(localStorage.getItem('folder_id_user'))
                .then(res=> {
                    this.user = res.data
                })
                if(this.user.tokens.length == 0){
                    alert(`${this.user.first_name} ${this.user.last_name} est deja déconnecté(e) de tous ses appareils`);
                    router.push('/adminAccount/adminCheckUser');

                }
                else{
                    alert(`les appareils de ${this.user.first_name} ${this.user.last_name} ont été déconnectés`)
                    const token = this.user.tokens[0].token
                    postService.logoutallAccount(token);
                    
                }
            }
        },
        deleteUser(){
            if(confirm(`Etes-vous sûr de vouloir supprimer l'utilisateur ${this.user.first_name} ${this.user.last_name} ?\n Cette opération est irréversible.`)){
                postService.deleteAll(this.user.folder);
                router.push('/adminAccount')
            }
        },
        updateUser(){
            router.push('/adminAccount/UpdateUserInfos')
        },
        myRowClickHandler(record) {
            localStorage.setItem('contract_id_user',record.contract_id)
            localStorage.setItem('folder_id_user',this.user.folder)
            router.push('/adminAccount/AdminCheckContract')
        },
        searchBySN() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[2]; //index of parameter in table
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } 
                    else {
                        tr[i].style.display = "none";
                    }
                }
            }
        },
    },
    components : {
        NavBar
    },
    created(){
        postService.getSuperUser(this.folder_id)
        .then(res=> {
            this.superuser = res.data
        })
        postService.getUser(localStorage.getItem('folder_id_user'))
        .then(res=> {
            this.user = res.data
        })
        postService.getAccount(localStorage.getItem('folder_id_user'))
        .then(res=> {
            this.account = res.data
            this.items=this.account.listContract
        })
    }
    
}
</script>

<style scoped>
.b-table{
cursor:pointer;
}
p{
    margin-left: 10px;
}
    
</style>