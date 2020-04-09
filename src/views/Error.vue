<template>
<body>
    <div class="navbar"><NavBar/></div>
    <div class="errorContainer">
        <h5>Accès refusé, veuillez vous identifier ou créer un compte</h5>
    </div>
</body>
</template>

<script>
import NavBar from '../components/Navbar';

export default {
    name : 'Error',
    components : {
        NavBar
    }
    
}
</script>