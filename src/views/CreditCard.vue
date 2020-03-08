<template>
<body>
  <NavBar />
  <div class="CreditCard">
    <VueCardPayment
      :settings="{
    labels: {
        cardNumber: 'Card number',
        month: 'Month',
        year: 'Year',
        cardHolder: 'Cardholder name',
        button: 'pay'
    },
    placeholders: {
        cardNumber: '0000 0000 0000 0000',
        month: '00',
        year: '00',
        cardHolder: 'JOHN DOE',
        cvv: '000'
    },
 
    showBank: true,
    showPaymentSystem: true
  }"></VueCardPayment>
  </div>
</body>
</template>


<script>
import "../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../node_modules/materialize-css/dist/js/materialize.min.js";

import NavBar from "../components/Navbar";
//import PostService from '../PostService';
//const postService = new PostService();
//import router from '../router';

export default {
  name: "FillCreditCard",
  data: function() {
    return {};
  },
  methods: {},
  components: {
    NavBar
  }
};
</script>

<style>
.CreditCard {
  text-align: center;
  width: 100%;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
}
</style>