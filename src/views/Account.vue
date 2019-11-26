<template>
    <div class="row">
        <Navbar/>
        <h5>nous sommes dans l'account</h5>
    </div>
</template>


<script>
const Navbar = require('../components/Navbar');
export default {
    name : "Account",
    components : {
        Navbar
    }
}
</script>