<template>
<body>
    <div class="accountContainer">
        <NavBar/>
        <h5>Informations actuelles</h5>
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
            </div>
            </div>
        </div>
        <h5>Nouvelles informations</h5>
        <div class="col s12 m7">
            <div class="card horizontal">
            <div class="card-stacked">
                <p>Les informations à ne pas changer doivent être remplies avec leur valeur actuelle </p>
                <form class="form" v-on:submit.prevent="onSubmit">
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="ln" type="text" v-model="ln" class="validate" required>
                        <label for="ln">Nom</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="fn" type="text" v-model="fn" class="validate" required>
                        <label for="fn">Prénom</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="phone" type="text" v-model="phone" class="validate" required>
                        <label for="phone">Téléphone Portable</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="email" type="email" v-model="email" class="validate" required>
                        <label for="email">Email</label>
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Valider</button>
                    </div>
                </form>
            </div>
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
const postService = new PostService();
import router from '../router';


export default {
    name : "UpdateUserInfos",
    data: function(){
        return{
            user: "",
            items:[],
            fn : "",
            ln : "",
            email :"",
            phone: "",
            exist:-1,
            folder: ""
        }
    },
    methods : {
        onSubmit(){
            const post={
                first_name : this.fn,
                last_name : this.ln,
                email :this.email,
                phone: this.phone,
                folder: this.user.folder
            };
            if(confirm('Êtes-vous certain de vouloir modifier ces informations ?\nCette action est irréversible.'))
            {
                postService.checkExist(this.email).then(res=> {
                    this.exist = res.data
                    if(this.user.email != this.email ){
                        if(this.exist==0)
                        {
                            postService.updateUserInfos(post)
                            postService.sendValidationEmail(post)
                            alert("Vous avez changer l'email associé à ce compte.\nUn email de validation vous à été envoyé sur cette nouvelle adresse.\nVous allez maintenant être redirigé vers la page d'accueil.")
                            const token = localStorage.getItem('acces_token')
                            postService.logoutAccount(token);
                            postService.unvalidateUser({folder:this.folder});
                            if(this.user.isSuperUser!==undefined){
                                router.push('/adminAccount/AdminCheckUser');
                            }
                            else{
                                router.push('/')
                            }
                        }
                        else
                        {
                            alert('Un compte est déjà associé à cet email')
                        }
                    }
                })
            }
        }
    },
    components : {
        NavBar
    },
    created(){
        this.folder = localStorage.getItem('folder_id_user')
        postService.getUser(this.folder)
        .then(res=> {
            this.user = res.data
        })
    }
    
}
</script>

<style>
    
</style>