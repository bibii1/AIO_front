<template>
<body>
  <div class="createContainer">
    <NavBar/>
  </div>
  <div class="row">
        <div class="card small horizontal">
            <div class="card-image">
                <router-link v-show="!isAuth" :to="'/account/contract/create2/Apple'">
                <!-- Changer la taille des images et centrer
                l'idéal serait d'avoir des rectangles avec le logo dedans comme sur les e-commerce -->
                    <img src="../assets/img/Apple/Apple-Logo.png">
                </router-link>
            </div>
            <div class="card-image">
                <router-link v-show="!isAuth" :to="'/account/contract/create2/Samsung'">
                    <img src="../assets/img/Samsung/Samsung-Logo.png">
                </router-link>
            </div>
      </div>
  </div>
</body>
</template>

<script>
import router from '../router.js';
import NavBar from '../components/Navbar';

import PostService from '../PostService';
const postService = new PostService();
export default {
    name:"create2",
    components : {
      NavBar
    },
    data(){
        return{
            object : "",
            brand: "",
            model :"",
            purschasePrice : "",
            purschaseDate: "",
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
                purschasePrice : this.purschasePrice,
                purschaseDate: this.purschaseDate,
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