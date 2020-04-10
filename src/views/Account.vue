<template>
<body>
  <div class="navbar">
    <NavBar />
  </div>
  <div class="title">
    <h5>Bienvenue {{user.first_name}}</h5>
  </div>
  <div class="accountContainer">
    <div class="row">
      <v-col
        class="cols10"
        v-for="(contract,index) in account.listContract"
        v-bind:item="contract"
        v-bind:index="index"
        v-bind:key="contract.contract_id"
      >
        <v-card>
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
          </div>
          <div class="card-stacked">
            <v-card-title class="cardTitle">{{contract.object}}</v-card-title>
            <v-card-text class="text--primary">
              <div class="model">Modèle : {{contract.model}}</div>
              <div class="brand">Marque : {{contract.brand}}</div>
            </v-card-text>
            <v-card>
              <div class="card2">
                <v-card-subtitle>Vos garanties</v-card-subtitle>
                <div class="card-content">
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        id="Casse"
                        disabled="disabled"
                        value="Casse"
                        v-model="contract.listWarranted.casse"
                      />
                      <span>Casse</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        name="Vol"
                        id="Vol"
                        disabled="disabled"
                        value="Vol"
                        v-model="contract.listWarranted.vol"
                      />
                      <span>Vol</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        id="Oxydation"
                        disabled="disabled"
                        value="Oxydation"
                        v-model="contract.listWarranted.oxydation"
                      />
                      <span>Oxydation</span>
                    </label>
                  </p>
                  <div class="tarifs">
                    <v-card-text>Prix de l'appareil : {{contract.purchasePrice}}</v-card-text>
                    <h5>Prix mensuel : {{contract.month_price}} €</h5>
                  </div>
                </div>
              </div>
            </v-card>

            <div class="card-action">
              <v-btn
                v-on:click="deleteContract(contract.contract_id)"
                v-if="contract.isSinistered===false"
              >Supprimer le contrat</v-btn>
              <v-btn
                v-on:click="updateContract(index)"
                v-if="contract.isSinistered===false"
              >Modifier mes garanties</v-btn>
              <v-btn
                v-on:click="checkSinister(contract.contract_id)"
                v-if="contract.isSinistered===true"
              >Suivi du sinistre</v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </div>
  </div>
  <div class="createAndDeclare">
    <router-link :to="'/account/contract/create'">
      <button class="btn waves-effect waves-light">Ajouter un appareil à assurer</button>
    </router-link>
    <br />
    <br />
    <router-link :to="'/account/contract/sinister/chooseObject'">
      <button class="btn waves-effect waves-light">Déclarer un sinistre</button>
    </router-link>
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
  name: "Account",
  data: function() {
    return {
      //on pourra charger tous les dossier ici pour l'instant que le folder_id
      folder_id: localStorage.getItem("folder_id_user"),
      account: {},
      dialog: false,
      user: ""
    };
  },
  methods: {
    deleteContract(contrat_id) {
      var text = "Êtes-vous certain de vouloir supprimer ce contract ?\n\n";
      text +=
        "Votre contrat pour cet appareil ne sera pas reconduis le mois prochain et vous perdrez vos garanties.";
      if (confirm(text))
        postService.deleteContract(this.folder_id, contrat_id).then(() => {
          router.push("/");
        });
    },
    declareSinister(contrat_id) {
      localStorage.setItem("contract_id", contrat_id);
      router.push("/account/contract/sinister/chooseObject");
    },
    checkSinister(contrat_id) {
      localStorage.setItem("contract_id", contrat_id);
      router.push("/account/contract/sinister/progress");
    },
    updateContract(index) {
      localStorage.setItem("index", index);
      router.push("/account/contract/update/warranted");
    }
  },
  components: {
    NavBar
  },
  created() {
    postService.getAccount(this.folder_id).then(res => {
      this.account = res.data;
    });
    postService.getUser(this.folder_id).then(res => {
      this.user = res.data;
    });
  }
};
</script>

<style scoped>
.v-card {
  display: ruby-text-container;
  max-width: 100%;
  height: 100%;
  max-height: fit-content;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  overflow-wrap: break-word;
  position: sticky;
  white-space: normal;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: auto;
  box-shadow: 1px 3px 1px -1px rgba(0, 0, 0, 0.1),
    0px 1px 1px 0px rgba(0, 0, 0, 0.1), 1px 1px 1px 0px rgba(0, 0, 0, 0.1);
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
  margin: 20px;
  border-radius: 30px;
  opacity: 0.7;
}

.v-card__subtitle {
  padding: 0 24px 20px;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.0125em;
  padding: 16px 24px 10px;
  background-color: #45a1d9;
  color: white;
  max-width: 100%;
  text-align: center;
  margin: 20px;
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

.accountContainer {
  text-align: justify;
  text-anchor: center;
}

.createAndDeclare {
  text-align: center;
  padding: 20px;
  margin-bottom: 50px;
}

.card-stacked {
  text-align: center;
  text-anchor: center;
  margin: 20px;
}

.model {
  text-align: left;
  font-weight: 600;
}

.brand {
  text-align: left;
  font-weight: 600;
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
}

.card-action {
  padding: 20px;
  text-align: center;
  text-anchor: middle;
  margin: 5px;
}

.card-content {
  text-anchor: middle;
  font-weight: 500;
}

.card2 {
  text-align: center;
  margin: 25px;
}

.tarifs {
  margin: 30px;
}

.v-btn {
  border-radius: 5px;
  margin: 10px;
  width: 40%;
  height: 20px;
  color: white;
  background-color: rgb(81, 164, 154);
  border-color: rgb(81, 164, 154);
  cursor: pointer;
  block-size: 40px;
}
</style>