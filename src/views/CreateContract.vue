<template>
<body>
  <div class="createContainer">
    <NavBar/>
  </div>
  <div class="row">
    <form class="form" v-on:submit.prevent="onSubmit">
      <div class="row">
        <div class="input-field col s12">
          <input id="object" type="text" v-model="object" class="validate">
          <label for="object">Nom de votre objet</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
            <select>
                <option value="" disabled selected>Marque</option>
                <option value="1">Apple</option>
                <option value="2">Samsung</option>
                <option value="3">Option 3</option>
            </select>
            <label>Choisissez votre marque</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="model" type="text" v-model="model" class="validate">
          <label for="model">model</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="purchasePrice" type="number" v-model="purchasePrice" class="validate">
          <label for="purchasePrice">Prix d'achat</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="purchaseDate" type="date" v-model="purchaseDate" class="validate">
          <label for="purchaseDate">Confirmer mot de passe</label>
        </div>
      </div>
      <div class="row">
        <button class="btn waves-effect waves-light" type="submit" name="action">Enregistrer l'appareil</button>
      </div>
    </form>
  </div>
</body>
</template>

<script>
import router from '../router.js';
import NavBar from '../components/Navbar';

import PostService from '../PostService';
const postService = new PostService();
      

export default {
    name:"create",
    components : {
      NavBar
    },
    data(){
      
        return{
            object : "",
            brand: "",
            model :"",
            purchasePrice : "",
            purchaseDate: "",
            month_price : 0,
            listWarranted : {}
        }
    },
    methods:{
        onSubmit(){
            console.log(this.object)
            const contract={
                folder_id : localStorage.getItem('folder_id'),
                object : this.object,
                brand: this.brand,
                model : this.model,
                purchasePrice : this.purchasePrice,
                purchaseDate: this.purchaseDate,
                month_price : 0,
                listWarranted : {}
            };
            console.log(contract)
            postService.createContract(contract)
            .then(res=>{
                console.log(res);
            })
            router.push('/');
        }
    }
}

</script>

<style scoped>
.input-field col s12{
  color: aliceblue
}
</style>