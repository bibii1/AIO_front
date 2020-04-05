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
                    <p>Prenom : {{user.first_name}}</p>
                    <p>Numero de contrat d'assurance : {{user.folder}}</p>
                    <p>Telephone : {{user.phone}}</p>
                    <p>Email : {{user.email}}</p>                
                </div>
            </div>
            </div>
        </div>
        <h5>Changement de votre mot de passe</h5>
        <div class="col s12 m7">
            <div class="card horizontal">
            <div class="card-stacked">
                <p>Nous ne vous demanderons jamais votre mot de passe par mail </p>
                <form class="form" v-on:submit.prevent="onSubmit">
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="lPwd" type="password" v-model="lPwd" class="validate" required>
                        <label for="lPwd">Entrez votre mot de passe actuel</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="Pwd1" type="password" v-model="Pwd1" class="validate" required>
                        <label for="Pwd1">Entrez votre nouveau mot de passe</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                        <input id="Pwd2" type="password" v-model="Pwd2" class="validate" required>
                        <label for="Pwd2">Confirmez votre nouveau mot de passe</label>
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
import router from '../router';
const postService = new PostService();
// import router from '../router';


export default {
    name : "UpdateUserInfos",
    data: function(){
        return{
            user: "",
            items:[],
            lPwd : "",
            Pwd1 : "",
            Pwd2 : "",
            exist:-1,
            folder: ""
        }
    },
    methods : {
        logoutAll(){
            const token = localStorage.getItem('acces_token');
            postService.logoutallAccount(token);
            localStorage.removeItem('isAuth')
            localStorage.removeItem('acces_token')
            localStorage.removeItem('folder_id')
            router.push('/');
        },
        onSubmit(){
            if(this.Pwd1==this.Pwd2){
                if(this.Pwd1!=this.lPwd){
                    const post={
                        password : this.lPwd,
                        new_password : this.Pwd1,
                        email: this.user.email
                    };
                    postService.changePassword(post)
                    .then(()=>{
                        postService.sendMailPasswordModification(this.user.first_name,this.user.email)
                        this.logoutAll()
                        router.push('/')
                    })
                    .catch(()=>{
                        alert("le mot de passe rentré par l'utilisateur n'est pas valide")
                    })
                }
                else{
                    alert("le nouveau et ancien mot de passe sont identiques")
                }
                

            }
            else{
                alert("les mots de passe saisis sont diférents")
            }

            // if(confirm('Êtes-vous certain de vouloir modifier le mot de passe ?'))
            // {
            //     postService.checkExist(this.email).then(res=> {
            //         this.exist = res.data
            //         if(this.user.email != this.email ){
            //             if(this.exist==0)
            //             {
            //                 postService.updateUserInfos(post)
            //                 postService.sendValidationEmail(post)
            //                 alert("Vous avez changer l'email associé à ce compte.\nUn email de validation vous à été envoyé sur cette nouvelle adresse.\nVous allez maintenant être redirigé vers la page d'accueil.")
            //                 const token = localStorage.getItem('acces_token')
            //                 postService.logoutAccount(token);
            //                 postService.unvalidateUser({folder:this.folder});
            //                 if(this.user.isSuperUser!==undefined){
            //                     router.push('/adminAccount/AdminCheckUser');
            //                 }
            //                 else{
            //                     router.push('/')
            //                 }
            //             }
            //             else
            //             {
            //                 alert('Un compte est déjà associé à cet email')
            //             }
            //         }
            //     })
            // }
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