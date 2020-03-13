<template>
    <body>
        <div class="createContainer">
            <NavBar/>
        </div>
        <div>
            <step-progress :steps="mySteps" :current-step="currentStep" icon-class="fa fa-check"></step-progress>
        </div>
    </body>
</template>


<script>

//import router from '../router.js';
import NavBar from '../components/Navbar';
import StepProgress from 'vue-step-progress';
import '../assets/css/styles.css';
import PostService from '../PostService';
const postService = new PostService();

//import PostService from '../PostService';
//const postService = new PostService();

export default {
    name:"sinisterProgress",
    data: function(){
        return{
            //on pourra charger tous les dossier ici pour l'instant que le folder_id
            mySteps : ['Déclaration','Validation','Fin'],
            currentStep : 0,
            isAuth: '',
            folder_id : localStorage.getItem('folder_id'),
            contract_id : localStorage.getItem('contract_id'),
            user : ""
        }
    },
    methods : {
    },
    components : {
      NavBar,
      'step-progress': StepProgress
    },
    created(){
        postService.getUser(this.folder_id)
        .then(res=> {
            this.user = res.data
            this.user['sinisters'].forEach(sinister => {
                if (sinister['contract_id'] === this.contract_id){
                    this.currentStep = parseInt(sinister['sinisterStep'])
                }
            });
        })
    }
}
</script>

