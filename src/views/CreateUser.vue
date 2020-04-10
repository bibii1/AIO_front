<template>
<body>
  <div class="navbar">
    <NavBar />
  </div>
  <div class="createContainer">
    <h5>Veuillez indiquer vos coordonnées</h5>
    <div class="row">
      <form class="form" v-on:submit.prevent="onSubmit">
        <div class="row">
          <div class="input-field col s12">
            <input id="fn" type="text" v-model="fn" class="validate" required />
            <label for="fn">Prénom</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="ln" type="text" v-model="ln" class="validate" required />
            <label for="ln">Nom</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="phone" type="text" v-model="phone" class="validate" required />
            <label for="phone">Téléphone portable</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" v-model="email" class="validate" required />
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password1" type="password" v-model="password1" class="validate" required />
            <label for="password1">Mot de passe</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password2" type="password" v-model="password2" class="validate" required />
            <label for="password2">Confirmez votre mot de passe</label>
          </div>
        </div>
        <div class="rowRegister">
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
          >S'inscrire</button>
        </div>
      </form>
    </div>
  </div>
</body>
</template>


<script>
import router from "../router.js";
const uuidv4 = require("uuid/v4");
import NavBar from "../components/Navbar";

import PostService from "../PostService";
const postService = new PostService();

//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var request = require('request');
//var xhr = new XMLHttpRequest();

export default {
  name: "createUser",
  components: {
    NavBar
  },
  data() {
    return {
      fn: "",
      ln: "",
      email: "",
      password1: "",
      password2: "",
      phone: "",
      count: ""
    };
  },
  methods: {
    onSubmit() {
      if (this.password1 != this.password2) {
        alert("Les mots de passes ne sont pas identiques, veuillez réessayer");
        return;
      }
      const post = {
        first_name: this.fn,
        last_name: this.ln,
        password: this.password1,
        email: this.email.toLowerCase(),
        phone: this.phone,
        folder: uuidv4()
      };
      if (this.email.includes("@aio.fr")) {
        postService.postSuperUser(post);
      } else {
        postService.initAccount(post.folder);
        postService.postUser(post);
      }
      localStorage.removeItem("acces_token");
      localStorage.removeItem("folder_id_user");
      postService.sendValidationEmail(post);
      //lorsque l'on crée un nouvel utilisateur on remove de localStorage les anciennes données
      //num dossier + ancien acces_token
      router.push("/");
    }
  }
};
</script>

<style scoped>
.input-field col s12 {
  color: aliceblue;
}

.createContainer {
  text-align: center;
  width: 60%;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
  transition: all 0.4s;
}

.rowRegister {
  margin-bottom: 100px;
  margin-top: 50px;
  text-align: center;
  text-anchor: center;
}
</style>