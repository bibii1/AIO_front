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
          <option disabled value="">Sélectionner la catégorie</option>
          <option>Smartphone</option>
          <option>Ordinateur Portable</option>
          <option>Tablette</option>
          <option>Photo et Optique</option>
          <option>Consoles</option>
        </select>
      </div>
      <div class="row">
        <label for="brand">Marque</label>
        <select v-model="brand" v-if=" category === 'Smartphone'" required>
          <option disabled value="">Sélectionner la marque</option>
          <option>Apple</option>
          <option>Samsung</option>
          <option>Huawei</option>
        </select>
        <select v-model="brand" v-else-if=" category === 'Tablette'" required>
          <option disabled value="">Sélectionner la marque</option>
          <option>Apple</option>
          <option>Samsung</option>
        </select>
      </div>
        <div class="row">
          <label for="model">Modèle</label>
          <select v-model="model" v-if=" brand === 'Apple' && category==='Smartphone'" required>
            <option disabled value="">Sélectionner le modèle</option>
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
            <option disabled value="">Sélectionner le modèle</option>
            <option>Galaxy S10+</option>
            <option>Galaxy S10</option>
            <option>Galaxy Fold</option>
            <option>Galaxy Note 10</option>
            <option>Galaxy Note 9</option>
            <option>Galaxy Note 8</option>
         </select>
         <select v-model="model" v-else-if=" brand === 'Huawei'&& category==='Smartphone'" required>
            <option disabled value="">Sélectionner le modèle</option>
            <option>P30 Pro</option>
            <option>P30 Lite</option>
            <option>P20 Pro</option>
            <option>P20 Lite</option>
            <option>Nova 5T</option>
         </select>
         <select v-model="model" v-if=" brand === 'Apple' && category==='Tablette'" required>
            <option disabled value="">Sélectionner le modèle</option>
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
          <input id="purschasePrice" type="number" v-model="purchasePrice" class="validate" min="100" max="1999" required>
          <label for="purchasePrice">Prix d'achat</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="purchaseDate" type="date" v-model="purchaseDate" class="validate" min="2013-01-01" max="2020-12-31" required>
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
        <label>Prix par mois</label>
        <div class="input-field col s12">
          <input disabled type="text" id="month_price" v-model="month_price" class="validate">
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
            casse: false,
            vol: false,
            oxydation: false,
            user:''
        }
    },
    methods:{
        onSubmit(){
            const contract={
                folder_id : localStorage.getItem('folder_id_user'),
                object : this.object,
                category : this.category,
                brand: this.brand,
                model : this.model,
                serialNumber : this.serialNumber,
                purchasePrice : this.purchasePrice,
                purchaseDate: this.purchaseDate,
                month_price : this.month_price,
                listWarranted : {},
                casse: this.casse,
                vol: this.vol,
                oxydation: this.oxydation,
                isSinistered: false,
            };
            postService.sendMailContract(contract,this.user.email,this.user.first_name)
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
        },
        getMonthPrice(casse,vol,oxydation,category,price){
          var month_price = parseFloat(0)
          if(category==='Smartphone'){
            if(casse===true){
              if(price < 499){
                month_price+=3.99
              }
              else if (price<799){
                month_price+=5.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=7.99
              }
            }
            if(oxydation===true){
              month_price+=0.99
            }
            if(vol===true){
              if(price < 499){
                month_price+=0.99
              }
              else if (price<999){
                month_price+=1.99
              }
              else if(price<2000){
                month_price+=2.99
              }
            }
          }

          if(category==='Tablette'){
            if(casse===true){
              if(price < 499){
                month_price+=2.99
              }
              else if (price<799){
                month_price+=4.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=8.99
              }
            }
            if(oxydation===true){
              month_price+=0.99
            }
            if(vol===true){
              if (price<799){
                month_price+=0.99
              }
              else if(price<2000){
                month_price+=1.99
              }
            }
          }

          if(category==='Ordinateur portable'){
            if(casse===true){
              if(price < 499){
                month_price+=2.99
              }
              else if (price<799){
                month_price+=4.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=11.99
              }
              else if(price<2500){
                month_price+=17.99
              }
              else if(price<3000){
                month_price+=21.99
              }
              else if(price<4000){
                month_price+=27.99
              }
            }
            if(oxydation===true){
              if(price<2000){
                month_price+=0.99
              }
              else{
                month_price+=1.99
              }
            }
            if(vol===true){
              if (price<799){
                month_price+=0.99
              }
              else if(price<2000){
                month_price+=1.99
              }
              else if(price<2500){
                month_price+=2.99
              }
              else if(price<3000){
                month_price+=3.99
              }
              else if(price<4000){
                month_price+=4.99
              }
            }
          }

          if(category==='Photo et Optique'){
            if(casse===true){
              if(price < 499){
                month_price+=3.99
              }
              else if (price<799){
                month_price+=5.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=12.99
              }
              else if(price<2500){
                month_price+=18.99
              }
              else if(price<3000){
                month_price+=22.99
              }
              else if(price<4000){
                month_price+=28.99
              }
            }
            if(oxydation===true){
              if(price<2000){
                month_price+=0.99
              }
              else{
                month_price+=1.99
              }
            }
            if(vol===true){
              if (price<799){
                month_price+=0.99
              }
              else if(price<2000){
                month_price+=1.99
              }
              else if(price<2500){
                month_price+=2.99
              }
              else if(price<3000){
                month_price+=3.99
              }
              else if(price<4000){
                month_price+=4.99
              }
            }
          }

          if(category==="Console"){
            if(casse===true){
              if(price < 499){
                month_price+=2.99
              }
              else if (price<799){
                month_price+=4.99
              }
              else if (price<999){
                month_price+=6.99
              }
              else if(price<2000){
                month_price+=10.99
              }
              else if(price<2500){
                month_price+=15.99
              }
            }
            if(oxydation===true){
              if(price<2000){
                month_price+=0.99
              }
              else{
                month_price+=1.99
              }
            }
            if(vol===true){
              if (price<799){
                month_price+=0.99
              }
              else if(price<2000){
                month_price+=1.99
              }
              else{
                month_price+=2.99
              }
            }
          }
          return month_price
        },
    },
    created(){
      postService.getUser(localStorage.getItem('folder_id_user'))
        .then(res=> {
            this.user = res.data
        })
    },
    watch:{
      casse: function(val){
        this.month_price = this.getMonthPrice(val,this.vol,this.oxydation,this.category,this.purchasePrice).toFixed(2)
      },
      oxydation: function(val){
        this.month_price = this.getMonthPrice(this.casse,this.vol,val,this.category,this.purchasePrice).toFixed(2)
      },
      vol: function(val){
        this.month_price = this.getMonthPrice(this.casse,val,this.oxydation,this.category,this.purchasePrice).toFixed(2)
      },
      category: function(val){
        this.month_price = this.getMonthPrice(this.casse,this.vol,this.oxydation,val,this.purchasePrice).toFixed(2)
      },
      purchasePrice: function(val){
        this.month_price = this.getMonthPrice(this.casse,this.vol,this.oxydation,this.category,val).toFixed(2)
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

input[type="checkbox"]{
  position: static !important;
  -webkit-appearance:checkbox;
}

input{
cursor:pointer;
}

</style>
