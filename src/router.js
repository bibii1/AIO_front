import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Account from './views/Account.vue';
import CreateUser from './views/CreateUser.vue';
import About from './views/About.vue';
import ErrorVue from './views/Error.vue';

import PostService from './PostService';
const postService = new PostService();
//on stipule que Vue initialisé dans le main va utiliser Router pour naviguer entre les pages
Vue.use(Router);
const router = new Router({
    ifAuth : localStorage.getItem('token') || null,
    mode: 'history', //je crois c'est pas obligatoire mais c'est mieux pour le hashage pendant la navigation
                        //juste ca va marcher à partir Internet Explorer 8 et pas pour les navigateurs antérieurs
    routes : [
        {
            path:'/',
            component : Home //on redirige la connection vers la page d'acceuil quand on tappe la page
        },
        {
            path:'/account',
            component : Account, //on redirige vers la page de l'utilisateur connecté ou l'on 
            beforeEnter: (to,from,next)=>{
                const token  = localStorage.getItem('token')
                console.log(token)
                postService.getCheckToken(token)
                .then(res=>{
                    console.log(res.data)
                    if(res.data==1){
                        next('/account')
                    }
                    else{
                        next('/error')
                    }
                })
            }
        },
        {
            path:'/create',
            component : CreateUser
        },
        {
            path:'/about',
            component : About
        },
        {
            path:'/error',
            component : ErrorVue
        }
    ]    
})

//guard de notre route pour /account



export default router;