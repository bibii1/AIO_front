<template>
<body>
<div class="navbar"><NavBar/></div>
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
    <router-link to="/users/create">Créer un compte</router-link>
  </div>
</body>
</template>

<script>
import LoginForm from "../components/LoginForm";
import NavBar from "../components/Navbar";
export default {
  name: "Home",
  components: {
    NavBar,
    LoginForm
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
</style>


