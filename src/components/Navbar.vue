<template>
     <nav>
    <div class="nav-wrapper">

      <router-link to="/" class="brand-logo left">AIO</router-link>
      <ul id="nav-mobile" class="right">
        <li><router-link :to="'/'">Log in</router-link></li>
        <li><router-link :to="'/create'">Create</router-link></li>
        <li><router-link to="/account">Account</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
  </nav>
</template> 

<style scoped>
.nav-wrapper{
  background-color: #45A1D9;
}
</style>