<template>
    <body>
        <div class="createContainer">
            <NavBar/>
        </div>
        <div>
            <step-progress :steps="mySteps" :current-step="0" icon-class="fa fa-check"></step-progress>
        </div>
    </body>
</template>


<script>

//import router from '../router.js';
import NavBar from '../components/Navbar';
import StepProgress from 'vue-step-progress';
import '../assets/css/styles.css';

//import PostService from '../PostService';
//const postService = new PostService();

export default {
    name:"sinisterProgress",
    data: function(){
        return{
            //on pourra charger tous les dossier ici pour l'instant que le folder_id
            mySteps : ['Déclaration','Vérification','Validation','Fin']
        }
    },
    components : {
      NavBar,
      'step-progress': StepProgress
    },
}
</script>

