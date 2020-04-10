<template>
<body>
  <div class="navbar">
    <NavBar />
  </div>
  <div class="accountContainer">
    <div class="title">
      <h5>Mes informations</h5>
    </div>
    <div class="col s12 m7">
      <div class="card horizontal">
        <div class="card-image">
          <img
            src="https://www.ecole-tunon.com/sites/default/files/secteur/reception_bleu_0.png"
            alt
            height="250"
            width="100"
          />
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p>Numéro de contrat d'assurance : {{user.folder}}</p>
            <p>Nom : {{user.last_name}}</p>
            <p>Prénom : {{user.first_name}}</p>
            <p>Téléphone : {{user.phone}}</p>
            <p>Email : {{user.email}}</p>
          </div>
          <div class="card-action">
            <a v-on:click="updateUser()">Modifier mes informations</a>
            <a href="/users/update/password">Modifier mon mot de passe</a>
          </div>
        </div>
      </div>
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
  name: "UpdateUserInfos",
  data: function() {
    return {
      user: "",
      items: [],
      fn: "",
      ln: "",
      email: "",
      phone: "",
      exist: -1,
      folder: ""
    };
  },
  methods: {
    onSubmit() {
      const post = {
        first_name: this.fn,
        last_name: this.ln,
        email: this.email,
        phone: this.phone,
        folder: this.user.folder
      };
      if (confirm("Êtes-vous certain de vouloir modifier ces informations ?")) {
        postService.checkExist(this.email).then(res => {
          this.exist = res.data;
          if (this.user.email != this.email) {
            if (this.exist == 0) {
              postService.updateUserInfos(post);
              postService.sendValidationEmail(post);
              alert(
                "Vous avez changer l'email associé à ce compte.\nUn email de validation vous à été envoyé sur cette nouvelle adresse.\nVous allez maintenant être redirigé vers la page d'accueil."
              );
              const token = localStorage.getItem("acces_token");
              postService.unvalidateUser({ folder: this.folder });
              postService.logoutallAccount(token);
              if (this.user.isSuperUser !== undefined) {
                router.push("/adminAccount/AdminCheckUser");
              } else {
                router.push("/");
              }
            } else {
              alert("Un compte est déjà associé à cet email");
            }
          } else {
            postService.updateUserInfos(post);
            alert("Vos informations ont bien été modifiées.");
            if (this.user.isSuperUser !== undefined) {
              router.push("/adminAccount/UpdateUserInfos");
            } else {
              router.push("/users/settings");
            }
          }
        });
      }
    }
  },
  components: {
    NavBar
  },
  created() {
    this.folder = localStorage.getItem("folder_id_user");
    postService.getUser(this.folder).then(res => {
      this.user = res.data;
      this.fn = this.user.first_name;
      this.ln = this.user.last_name;
      this.phone = this.user.phone;
      this.email = this.user.email;
    });
  }
};
</script>

<style scoped>
.b-table {
  cursor: pointer;
}
p {
  margin-left: 10px;
}

.accountContainer {
  text-align: left;
  max-width: 900px;
  width: 100%;
  padding: 0 20px;
  margin: auto;
  transition: all 0.4s;
}

.title {
  text-align: center;
  margin-bottom: 80px;
}

.card-action {
  cursor: pointer;
  max-width: fit-content;
}
</style>
