<template>
<body>
  <div class="navbar">
    <NavBar />
  </div>
  <div class="title">
    <h5>Bienvenue chez AIO !</h5>
    <p>Veuillez vous connecter pour accéder à votre compte</p>
  </div>
  <div class="loginContainer">
    <v-container :elevation="3">
      <LoginForm />
    </v-container>
  </div>
  <div class="createContainer">
    <a class="waves-effect waves-light btn-very-small" href="/users/create">Créer un compte</a>
    <br />
    <br />
    <v-btn v-on:click="resetPassword()">Mot de passe oublié</v-btn>
  </div>
  <div v-show="resetPwd===true" class="input-field col s12">
    <div class="recupPwd">
      <p>Nous ne vous demanderons jamais votre mot de passe par mail</p>
      <p>Veuillez indiquer votre mail, vous recevrez un lien pour réinitialiser votre mot de passe</p>

      <form class="form" v-on:submit.prevent="onSubmit">
        <div class="row">
          <div class="input-field col s12">
            <input id="emailRecup" type="email" v-model="emailRecup" class="validate" required />
            <label for="emailRecup">Saisir votre adresse email</label>
          </div>
        </div>
        <div class="row">
          <button class="btn waves-effect waves-light" type="submit" name="action">Envoyer</button>
        </div>
      </form>
    </div>
  </div>
</body>
</template>

<script>
import LoginForm from "../components/LoginForm";
import NavBar from "../components/Navbar";
import PostService from "../PostService";
// import router from '../router';
const postService = new PostService();
let generator = require("generate-password");

export default {
  data() {
    return {
      emailRecup: "",
      resetPwd: false
    };
  },
  name: "Home",
  components: {
    NavBar,
    LoginForm
  },
  methods: {
    resetPassword() {
      this.resetPwd = true;
    },
    onSubmit() {
      var tempPassword = generator.generate({
        length: 10,
        numbers: true
      });
      const email = this.emailRecup;
      postService.updateTempPassword(tempPassword, email).then(() => {
        postService
          .sendMailResetPassword(email, tempPassword)
          .then(() => {
            alert("un email a été envoyé sur votre boite mail");
          })
          .catch(() => {
            alert("un email a été envoyé sur votre boite mail");
          });
      });
    }
  }
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
}

.navbar {
  width: 100%;
  padding: 0px;
  margin: auto;
  text-align: justify;
}

.title {
  text-align: center;
  width: 40%;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
}

.loginContainer {
  text-align: center;
  width: 60%;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
  transition: all 0.4s;
}

.createContainer {
  text-align: center;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
}

.v-btn {
  border: 0;
  color: #45a1d9;
  background-color: white;
  cursor: pointer;
}

.recupPwd {
  text-align: center;
  width: 60%;
  max-width: 500px;
  padding: 0 20px;
  margin: auto;
  transition: all 0.4s;
}
</style>


