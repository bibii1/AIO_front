<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5>Fiche client</h5>
        <p>Nom : {{user.last_name}}</p>
        <p>Prenom : {{user.first_name}}</p>
        <p>Numero de contrat d'assurance : {{user.folder}}</p>
        <p>Telephone : {{user.phone}}</p>
        <p>Email : {{user.email}}</p>
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
            isAuth: '',
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
                // Voir si necessaire
                /*{
                    key: 'listWarranted',
                    sortable: false
                },*/
                
                {
                    key: 'purchasePrice',
                    sortable: false
                }
            ]
        }
    },
    methods : {
        myRowClickHandler(record) {
            localStorage.setItem('contract_id_user',record.contract_id)
            localStorage.setItem('folder_id_user',this.user.folder)
            if(record.isSinistered === true)
            router.push('/adminAccount/AdminCheckSinister')
            else
            alert("Cet appareil n'a pas de sinistre en cours")
        },
        searchBySN() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[2]; //index of parameter in
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

<style>
.b-table{
cursor:pointer;
}
p{
    margin-left: 10px;
}
    
</style>