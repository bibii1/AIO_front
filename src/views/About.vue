<template>
<body>
    <div>
        <NavBar/>
        <h3>About vue</h3>
    </div>
</body>
</template>

<script>
import NavBar from '../components/Navbar';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';

export default {
    name : 'About',
    components : {
        NavBar
    }
}
</script>