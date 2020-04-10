<template>
<body>
  <div class="navbar">
    <NavBar />
  </div>
  <div class="accountContainer">
    <h5>Nous sommes dans l'account {{folder_id}}</h5>
    <div class="row">
      <div
        class="col s10"
        v-for="(contract,index) in account.listContract"
        v-bind:item="contract"
        v-bind:index="index"
        v-bind:key="contract.contract_id"
      >
        <div class="card small">
          <div class="card-image">Il faut mettre la photo de l'utilisateur ca serait bien</div>
          <div class="card-stacked">
            <div class="card-content">
              <p>Objet : {{contract.object}}</p>
              <p>Catégorie : {{contract.category}}</p>
              <p>Marque : {{contract.brand}}</p>
              <p>Modèle : {{contract.model}}</p>
              <p>Numéro de série : {{contract.serialNumber}}</p>
              <p>Liste de garanties : {{contract.listWarranted}}</p>
              <p>Prix d'achat : {{contract.purchasePrice}}</p>
              <h6>Prix mensuel : {{getMonth_price(index)}} €</h6>
            </div>
            <div class="card-action">
              <a
                v-on:click="deleteContract(contract.contract_id)"
                v-if="contract.isSinistered===false"
              >Supprimer le contrat</a>
              <a
                v-on:click="modifyContract(contract.contract_id)"
                v-if="contract.isSinistered===false"
              >Modifier le contrat</a>
              <a
                v-on:click="checkSinister(contract.contract_id)"
                v-if="contract.isSinistered===true"
              >Suivi du sinistre</a>
            </div>
          </div>
        </div>
        <router-link :to="'/account/contract/create'">
            <button class="btn waves-effect waves-light">Ajouter un appareil à assurer</button>
        </router-link>
        <br/>
        <br/>
        <router-link :to="'/account/contract/sinister/chooseObject'">
            <button class="btn waves-effect waves-light">Déclarer un sinistre</button>
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
  name: "Account",
  data: function() {
    return {
      //on pourra charger tous les dossier ici pour l'instant que le folder_id
      folder_id: localStorage.getItem("folder_id_user"),
      account: {},
      dialog: false
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
    getMonth_price(index) {
      // index correspond a l'index du contrat concerné, il permet d'indiquer
      // quel contrat dans listContract de account (récuprer à chaque création de la vue)
      var totalPrice = 0;
      const contract = this.account.listContract[index];
      const price = contract.purchasePrice;
      if (price < 250) {
        if (contract.listWarranted.panne == true) {
          totalPrice = totalPrice + 1;
        }
        if (contract.listWarranted.casse == true) {
          totalPrice = totalPrice + 3;
        }
        if (contract.listWarranted.vol == true) {
          totalPrice = totalPrice + 1.5;
        }
        if (contract.listWarranted.oxydation == true) {
          totalPrice = totalPrice + 3;
        }
      }
      if (price > 250 && price < 600) {
        if (contract.listWarranted.panne == true) {
          totalPrice = totalPrice + 1;
        }
        if (contract.listWarranted.casse == true) {
          totalPrice = totalPrice + 4.5;
        }
        if (contract.listWarranted.vol == true) {
          totalPrice = totalPrice + 3;
        }
        if (contract.listWarranted.oxydation == true) {
          totalPrice = totalPrice + 4.5;
        }
      }
      if (price > 600) {
        if (contract.listWarranted.panne == true) {
          totalPrice = totalPrice + 1.5;
        }
        if (contract.listWarranted.casse == true) {
          totalPrice = totalPrice + 6;
        }
        if (contract.listWarranted.vol == true) {
          totalPrice = totalPrice + 6;
        }
        if (contract.listWarranted.oxydation == true) {
          totalPrice = totalPrice + 6;
        }
      }
      return totalPrice;
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
.accountContainer {
  text-align: left;
  width: 60%;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
  transition: all 0.4s;
}
</style>