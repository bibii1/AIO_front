<template>
<body>
    <div class="accountContainer">
        <h5>Enregistrer sa carte</h5>
        <input v-model.trim="numberCard" id="nbCreditCard" placeholder = "Renseignez votre numéro de carte" type="number">
        <h6>Renseignez la date d'expiration</h6>
        <input v-model="dateCard" id="dateCreditCard" type = "date">
        <input v-model="pinCard" id="pinCreditCard" type="number" placeholder="Renseignez le cryptogramme de votre carte">
    </div>
</body>
</template>


<script>
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';

//import PostService from '../PostService';
//const postService = new PostService();


export default {
    name : "CreditCardForm",
    data: function(){
        return{
            numberCard : '',
            dateCard :'',
            pinCard :''
        }
    },
    methods : {
        onSubmit(){

        }
    },
    components : {
    },

}
</script>

<style scoped>

</style>