<template>
  <body>
    <div id="test">
      <img class="relative" alt="Vue logo" src="./assets/aio-white-831x618.png">
    </div>
    <div id="app">
      <h2> My-Aio</h2>
      <h3> Hello Bibii </h3>
      <h3><input v-model="username" name="username" id="rounded" /></h3>
      <h4><input type ="password" name="password" id="rounded"/></h4>
      <login>Login</login>
      <createUser>Create account</createUser>
      <button v-on:click="login" id="login">Login</button>
      <button v-on:click="createUser" id="createUser">Create account</button>
    </div>
  </body>
</template>

<script>
import {login,createUser} from './datab.js'

export default {
  name: 'app',
  components: 
  {
    'login' : {
      data : login({username},{password})
    },
    'createUser' : {
      data : createUser({username},{password})
    }

  }
}

</script>

<style>

h1,h2,h3,h4,h5,h6
{
    font-weight:700;
    font-family:Montserrat,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'
}



body
{
  background-color: blueviolet
}

img.relative{
    position: relative;
    right: 600px;
    top: -50px
}

button
{
    background-color: white;
    border-radius: 8px;
    border-color: white;
    color: aqua;
    font-size: 15px;
}

#rounded
{
  border-radius: 4px;
  background: whitesmoke;
  width: 100px; 
  height: 20px
}

#test
{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
