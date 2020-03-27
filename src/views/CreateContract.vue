<template>
<body>
  <div class="createContainer">
    <NavBar/>
  </div>
  <div class="row">
    <form class="form" v-on:submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="row">
        <div class="input-field col s12">
          <input id="object" type="text" v-model="object" class="validate" required>
          <label for="object">Nom de votre objet</label>
        </div>
      </div>
      <div class="row">
        <label for="category">Catégorie</label>
        <select v-model="category" required>
          <option disabled value="">Please select one</option>
          <option>Smartphone</option>
          <option>Ordinateur Portable</option>
          <option>Tablette</option>
        </select>
      </div>
      <div class="row">
        <label for="brand">Marque</label>
        <select v-model="brand" v-if=" category === 'Smartphone'" required>
          <option disabled value="">Please select one</option>
          <option>Apple</option>
          <option>Samsung</option>
          <option>Huawei</option>
        </select>
        <select v-model="brand" v-else-if=" category === 'Tablette'" required>
          <option disabled value="">Please select one</option>
          <option>Apple</option>
          <option>Samsung</option>
        </select>
      </div>
        <div class="row">
          <label for="model">Modèle</label>
          <select v-model="model" v-if=" brand === 'Apple' && category==='Smartphone'" required>
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
         <select v-model="model" v-else-if=" brand === 'Samsung'&& category==='Smartphone'" required>
            <option disabled value="">Please select one</option>
            <option>Galaxy S10+</option>
            <option>Galaxy S10</option>
            <option>Galaxy Fold</option>
            <option>Galaxy Note 10</option>
            <option>Galaxy Note 9</option>
            <option>Galaxy Note 8</option>
         </select>
         <select v-model="model" v-else-if=" brand === 'Huawei'&& category==='Smartphone'" required>
            <option disabled value="">Please select one</option>
            <option>P30 Pro</option>
            <option>P30 Lite</option>
            <option>P20 Pro</option>
            <option>P20 Lite</option>
            <option>Nova 5T</option>
         </select>
         <select v-model="model" v-if=" brand === 'Apple' && category==='Tablette'" required>
            <option disabled value="">Please select one</option>
            <option>Ipad Pro</option>
         </select>
         <!-- 
           
         Continuer a ajouter les options / trouver le moyen de les recup depuis une database
         
         -->
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="serialNumber" type="text" v-model="serialNumber" class="validate" required>
            <label for="serialNumber">Numéro de série</label>
          </div>
        </div>
        <div class="row">
        <div class="input-field col s12">
          <input id="purschasePrice" type="number" v-model="purchasePrice" class="validate" min="2013-01-01" max="2020-12-31" required>
          <label for="purchasePrice">Prix d'achat</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="purchaseDate" type="date" v-model="purchaseDate" class="validate" required>
          <label for="purchaseDate">Date d'achat</label>
        </div>
      </div>
      <div class="row">
        <label>Facture d'achat</label>
        <div class="input-field col s12">
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" class="validate" required>
        </div>
      </div>
      <div class="row">
        <label>Liste des garanties souhaitées</label>
        <p>
        <label>
          <input type="checkbox" id="Perte" value="Perte" v-model="panne">
          <span>Panne</span>
        </label>
        </p>
        <p>
        <label>
          <input type="checkbox" id="Casse" value="Casse" v-model="casse">
          <span>Casse</span>
        </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="Vol" id="Vol" value="Vol" v-model="vol">
            <span> Vol</span>
          </label>
        </p>
        <p>
        <label>
          <input type="checkbox" id="Oxydation" value="Oxydation" v-model="oxydation">
          <span> Oxydation </span>
        </label>
        </p>
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
    name:"createContract",
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
            purchasePrice : "",
            purchaseDate: "",
            month_price : 0,
            listWarranted : {},
            file : "",
            panne: false,
            casse: false,
            vol: false,
            oxydation: false
        }
    },
    methods:{
        onSubmit(){
            const contract={
                folder_id : localStorage.getItem('folder_id'),
                object : this.object,
                category : this.category,
                brand: this.brand,
                model : this.model,
                serialNumber : this.serialNumber,
                purchasePrice : this.purchasePrice,
                purchaseDate: this.purchaseDate,
                month_price : 0,
                listWarranted : {},
                panne : this.panne,
                casse: this.casse,
                vol: this.vol,
                oxydation: this.oxydation,
                isSinistered: false
            };
            postService.createContract(contract)
            .then(()=>{
              router.push('/');
            })
        },
        handleFileUpload(){
          if (this.$refs.file.files[0])
          {
            this.file = {file:this.$refs.file.files[0]};
          }
          else
            this.file = null
        }
    },
    created(){
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

input[type="checkbox"]{
  position: static !important;
  -webkit-appearance:checkbox;
}

input{
cursor:pointer;
}

</style>
