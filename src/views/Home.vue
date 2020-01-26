<template>
<body>
  <div class="loginContainer">
    <NavBar/>
    <h5>my-AIO page login</h5>
    <LoginForm/>
  </div>
  <div class="createContainer">
    <router-link to="/users/create" >créer un compte</router-link>
  </div>
</body>
</template>

<script>

import LoginForm from '../components/LoginForm';
import NavBar from '../components/Navbar';
export default {
  name: 'home',
  components :{
    NavBar,
    LoginForm
  }
}

</script>

<style>

h1,h2,h3,h4,h5,h6
{
    font-weight:700;
    font-family:Montserrat,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'
}

.loginContainer{
  text-align: center,
}






</style>
