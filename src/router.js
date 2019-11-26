import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Account from './views/Account.vue';
import CreateUser from './views/CreateUser.vue';

//on stipule que Vue initialisé dans le main va utiliser Router pour naviguer entre les pages
Vue.use(Router);

export default new Router({
    mode: 'history', //je crois c'est pas obligatoire mais c'est mieux pour le hashage pendant la navigation
                        //juste ca va marcher à partir Internet Explorer 8 et pas pour les navigateurs antérieurs
    routes : [
        {
            path:'/',
            component : Home //on redirige la connection vers la page d'acceuil quand on tappe la page
        },
        {
            path:'/account',
            component : Account //on redirige vers la page de l'utilisateur connecté ou l'on 
        },
        {
            path:'/create',
            component : CreateUser
        }
    ]    
})