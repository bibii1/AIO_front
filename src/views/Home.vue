<template>
<body>
  <NavBar/>
  <div class="loginContainer">
    <h5>My-AIO login page</h5>
    <LoginForm/>
  </div>
  <div class="createContainer">
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
  text-align: center;
  width: 100%;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
}

</style>
