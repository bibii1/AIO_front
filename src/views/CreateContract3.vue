<!-- Ici je vai essayer de faire des menus deroulants
    A partir de la ligne 42 je fais des essais mais marche pas pour l'instant -->

<template>
<body>
  <div class="createContainer">
    <NavBar/>
  </div>
  <div class="row">
    <form class="form" v-on:submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="row">
        <div class="input-field col s12">
          <input id="object" type="text" v-model="object" class="validate">
          <label for="object">Nom de votre objet</label>
        </div>
      </div>
      <div class="row">
        <label for="category">Catégorie</label>
        <select v-model="category">
          <option disabled value="">Please select one</option>
          <option>Smartphone</option>
          <option>Ordinateur Portable</option>
        </select>
      </div>
      <div class="row">
        <label for="brand">Marque</label>
        <select v-model="brand" v-if=" category === 'Smartphone'">
          <option disabled value="">Please select one</option>
          <option>Apple</option>
          <option>Samsung</option>
          <option>Huawei</option>
        </select>
      </div>
        <div class="row">
          <label for="model">Modèle</label>
          <select v-model="model" v-if=" brand === 'Apple'">
            <option disabled value="">Please select one</option>
            <option>Iphone 11 Pro Max</option>
            <option>Iphone 11 Pro</option>
            <option>Iphone 11 </option>
            <option>Iphone XS Max</option>
            <option>Iphone XS</option>
            <option>Iphone X</option>
            <option>Iphone XR</option>
            <option>Iphone 8 Plus</option>
            <option>Iphone 8</option>
            <option>Iphone 7 Plus</option>
            <option>Iphone 7</option>
         </select>
         <select v-model="model" v-else-if=" brand === 'Samsung'">
            <option disabled value="">Please select one</option>
            <option>Galaxy S10+</option>
            <option>Galaxy S10</option>
            <option>Galaxy Fold</option>
            <option>Galaxy Note 10</option>
            <option>Galaxy Note 9</option>
            <option>Galaxy Note 8</option>
         </select>
         <!-- 
           
         Continuer a ajouter les options / trouver le moyen de les recup depuis une database
         
         -->
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="serialNumber" type="text" v-model="serialNumber" class="validate">
            <label for="serialNumber">Numéro de série</label>
          </div>
        </div>
        <div class="row">
        <div class="input-field col s12">
          <input id="purschasePrice" type="number" v-model="purchasePrice" class="validate">
          <label for="purchasePrice">Prix d'achat</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="purchaseDate" type="date" v-model="purchaseDate" class="validate" min="2013-01-01" max="2020-12-31">
        <!-- Faire en sorte que max soit < a la date du jour dans la validation-->
          <label for="purchaseDate">Date d'achat</label>
        </div>
      </div>
      <div class="row">
        <label>Facture d'achat</label>
        <div class="input-field col s12">
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
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
    name:"create3",
    components : {
      NavBar
    },
    data(){
        return{
            object : "",
            category : "",
            brand: "",
            model :"",
            serialNumber : "", 
            purschasePrice : "",
            purschaseDate: "",
            month_price : 0,
            listWarranted : {},
            files : []
        }
    },
    methods:{
        onSubmit(){
            const formData = new FormData();
            formData.append('file',this.file)
            console.log(this.object)
            const contract={
                folder_id : localStorage.getItem('folder_id'),
                object : this.object,
                category : this.category,
                brand: this.brand,
                model : this.model,
                serialNumber : this.serialNumber,
                purschasePrice : this.purschasePrice,
                purschaseDate: this.purschaseDate,
                month_price : 0,
                listWarranted : {},
                files : this.file
            };
            console.log(contract)
            postService.createContract(contract)
            .then(res=>{
                console.log(res);
            })
            router.push('/');
        },
        handleFileUpload(){
          this.file = this.$refs.file.files[0];
        }
    }
  }

</script>

<style>
.input-field col s12{
  color: aliceblue
}

select {
    display: block;
    width: 200px;
 }

</style>
