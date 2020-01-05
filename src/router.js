import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Account from './views/Account.vue';
import CreateUser from './views/CreateUser.vue';
import About from './views/About.vue';
import ErrorVue from './views/Error.vue';
import CreateContract from './views/CreateContract.vue';
import SinisterChoseObject from './views/SinisterChoseObject.vue';
import SinisterChoseSinister from './views/SinisterChoseSinister.vue'

import axios from 'axios';
const apiBaseUrl = 'http://localhost:3000';
//import PostService from './PostService';
//const postService = new PostService();
//on stipule que Vue initialisé dans le main va utiliser Router pour naviguer entre les pages
Vue.use(Router);
const router = new Router({
    ifAuth : localStorage.getItem('token') || null,
    mode: 'history', //je crois c'est pas obligatoire mais c'est mieux pour le hashage pendant la navigation
                        //juste ca va marcher à partir Internet Explorer 8 et pas pour les navigateurs antérieurs
    routes : [
        {
            path:'/',
            component : Home, //on redirige la connection vers la page d'acceuil quand on tappe la page
            beforeEnter: (to,from,next)=>{
                const tokenTemp  = localStorage.getItem('acces_token')
                const post  =  {
                    token: tokenTemp
                }
              //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`,post)
                //res = nombre de fois ou le token est present dans la bdd
                .then(res=>{
                    if(res.data==1){
                        next('/account')
                    }
                    else{
                        next()
                    }
                })
                next()
            }
        },
        {
            path:'/account',
            component : Account, //on redirige vers la page de l'utilisateur connecté ou l'on 
            beforeEnter: (to,from,next)=>{
                const tokenTemp  = localStorage.getItem('acces_token')
                const post  =  {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`,post)
                //res = nombre de fois ou le token est present dans la bdd
                .then(res=>{
                    if(res.data==1){
                        next('/account')
                    }
                    else{
                        next('/error')
                    }
                })
                next()
            }
        },
        {
            path:'/users/create',
            component : CreateUser
        },
        {
            path:'/about',
            component : About
        },
        {
            path:'/error',
            component : ErrorVue
        },
        {
            path:'/account/contract/create',
            component : CreateContract
        },
        {
            path:'/account/contract/sinister/choseObject',
            component : SinisterChoseObject
        },
        {
            path:'/account/contract/sinister/choseSinister',
            component : SinisterChoseSinister
        }
    ]    
})

//guard de notre route pour /account



export default router;