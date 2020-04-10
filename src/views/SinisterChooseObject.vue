<template>
<body>
  <div class="navbar">
    <NavBar />
  </div>
  <div class="sinisterContainer">
    <div class="title">
      <h5>Veuillez choisir l'objet sinistré</h5>
    </div>
    <v-row class="row">
      <v-col
        class="cols10"
        v-for="(contract,index) in account.listContract"
        v-bind:item="contract"
        v-bind:index="index"
        v-bind:key="contract.contract_id"
      >
        <a v-on:click="declareSinister(index)">
          <v-card v-if="contract.isSinistered ===false">
            <div class="card-image">
              <img
                src="../assets/img/Apple/Smartphone/Iphone-X.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone X'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-11.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 11'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-11-Pro.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 11 Pro'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-11-Pro-Max.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 11 Pro Max'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-8.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 8'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-8-plus.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 8 Plus'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-7.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 7'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-7-plus.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone 7 PLus'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-XS.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone XS'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-XR.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone XR'"
              />
              <img
                src="../assets/img/Apple/Smartphone/Iphone-XS-Max.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Iphone XS Max'"
              />
              <img
                src="../assets/img/Samsung/Smartphone/Galaxy-S10.png"
                v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy S10'"
              />
              <img
                src="../assets/img/Samsung/Smartphone/Galaxy-S10.png"
                v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy S10+'"
              />
              <img
                src="../assets/img/Samsung/Smartphone/Galaxy-Fold.png"
                v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy Fold'"
              />
              <img
                src="../assets/img/Samsung/Smartphone/Galaxy-Note-10.png"
                v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy Note 10'"
              />
              <img
                src="../assets/img/Samsung/Smartphone/Galaxy-Note-9.png"
                v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy Note 9'"
              />
              <img
                src="../assets/img/Samsung/Smartphone/Galaxy-Note-8.png"
                v-else-if="contract.brand === 'Samsung' && contract.model == 'Galaxy Note 8'"
              />
              <img
                src="../assets/img/Huawei/Smartphone/P30-Pro.png"
                v-else-if="contract.brand === 'Huawei' && contract.model == 'P30 Pro'"
              />
              <img
                src="../assets/img/Huawei/Smartphone/P20-Pro.png"
                v-else-if="contract.brand === 'Huawei' && contract.model == 'P20 Pro'"
              />
              <img
                src="../assets/img/Huawei/Smartphone/P30-Lite.png"
                v-else-if="contract.brand === 'Huawei' && contract.model == 'P30 Lite'"
              />
              <img
                src="../assets/img/Huawei/Smartphone/P20-Lite.png"
                v-else-if="contract.brand === 'Huawei' && contract.model == 'P20 Lite'"
              />
              <img
                src="../assets/img/Huawei/Smartphone/Nova-5T.png"
                v-else-if="contract.brand === 'Huawei' && contract.model == 'Nova 5T'"
              />
              <img
                src="../assets/img/Apple/Tablette/Ipad-Pro.png"
                v-if=" contract.brand === 'Apple' && contract.model == 'Ipad Pro'"
              />
              <!-- <img src="../assets/img/Apple/Phones/iphone-X.png" v-if=" contract.brand === 'Apple'">
              <img src="../assets/img/Samsung/Phones/636x900-vue-1-samsung-galaxy-s10-5g-argent-160694.png" v-else-if="contract.brand === 'Samsung'" >-->
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <v-card-title class="cardTitle">{{contract.object}}</v-card-title>
                <v-card-text class="text--primary">
                  <div class="model">Modèle : {{contract.model}}</div>
                  <div class="brand">Marque : {{contract.brand}}</div>
                  <h6>Prix mensuel : {{contract.month_price}} €</h6>
                </v-card-text>
              </div>
            </div>
          </v-card>
        </a>
      </v-col>
    </v-row>
    <div class="declare">
      <router-link :to="'/'">
        <button class="btn waves-effect waves-light">Mon compte</button>
      </router-link>
    </div>
  </div>
</body>
</template>


<script>
import "../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../node_modules/materialize-css/dist/js/materialize.min.js";
//dans cette vue
//pour acceder au numero de folder il suffit de faire
//localStorage.getItem('folder_id')
//on peut se servir de cette variable pour ensuite charger notre page etc
//pour acceder au token de l'utilisateur
//localStorage.getItem('acces_token')
//on utilisera ce token pour faire logout de la session ou logout total
import NavBar from "../components/Navbar";
import PostService from "../PostService";
const postService = new PostService();
import router from "../router";

export default {
  name: "ChooseObject",
  data: function() {
    return {
      //on pourra charger tous les dossier ici pour l'instant que le folder_id
      folder_id: localStorage.getItem("folder_id_user"),
      contract_id: localStorage.getItem("contract_id"),
      account: {}
    };
  },
  methods: {
    declareSinister(index) {
      //on utilisera l'index de la card pour identifier le contrat sur lequel agir
      localStorage.setItem("index", index);
      router.push("/account/contract/sinister/chooseSinister");
    }
  },
  components: {
    NavBar
  },
  created() {
    postService.getAccount(this.folder_id).then(res => {
      this.account = res.data;
    });
  }
};
</script>

<style scoped>
.v-card {
  display: ruby-text-container;
  max-width: 570px;
  max-height: fit-content;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  overflow-wrap: break-word;
  position: relative;
  white-space: normal;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: auto;
  box-shadow: 0px 3px 1px -1px rgba(0, 0, 0, 0.1),
    0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
}


.v-card__title {
  font-size: 1.25rem;
  font-weight: 750;
  letter-spacing: 0.0125em;
  padding: 16px 24px 10px;
  background-color: #45a1d9;
  color: white;
  max-width: 100%;
  text-align: center;
  margin: 10px;
  border-radius: 30px;
  opacity: 0.7;
}

.v-card__text {
  padding: 15px 15px;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  max-width: 100%;
  text-align: center;
  margin: 20px;
}

.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 30px;
}

.title {
  text-align: center;
}

.card-stacked {
  text-align: center;
  text-anchor: center;
  margin: 20px;
  cursor: pointer;
}

.model {
  text-align: left;
  font-weight: 600;
  cursor: pointer;
}

.brand {
  text-align: left;
  font-weight: 600;
  cursor: pointer;
}

.cols10 {
  text-align: center;
  width: 60%;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
  transition: all 0.4s;
}

.row {
  text-align: justify;
  text-anchor: middle;
  margin: 20px;
}

.card-image {
  margin: 20px;
  padding: 10px;
  text-anchor: middle;
  cursor: pointer;
}

.card-content {
  text-anchor: middle;
  font-weight: 500;
  cursor: pointer;
}

.sinisterContainer{
    padding: 10 30px;
    margin: auto;
    text-align: center;
}

.declare{
    margin-top: 70px;
    margin-bottom: 150px;
}
</style>