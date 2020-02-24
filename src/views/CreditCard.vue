<template>
<body>
    <NavBar/>
    <div class="CreditCard">
        <CreditCard/>
    </div>
</body>
</template>


<script>
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';

import NavBar from '../components/Navbar';
import CreditCard from '../components/CreditCardForm';
//import PostService from '../PostService';
//const postService = new PostService();
//import router from '../router';


export default {
    name : "FillCreditCard",
    data: function(){
        return{
        }
    },
    methods : {
    },
    components : {
        NavBar,
        CreditCard
    }
}
</script>

<style>


.CreditCard{
  text-align: center;
  width: 100%;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
}
</style>