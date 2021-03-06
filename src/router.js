import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Account from './views/Account.vue';
import CreateUser from './views/CreateUser.vue';
import ErrorVue from './views/Error.vue';
import CreateContract from './views/CreateContract.vue';
import SinisterChooseObject from './views/SinisterChooseObject.vue';
import SinisterChooseSinister from './views/SinisterChooseSinister.vue'
import SinisterInfos from './views/SinisterInfos.vue'
import SinisterProgress from './views/SinisterProgress.vue'
import AdminAccount from './views/AdminAccount.vue';
import AdminCheckUser from './views/AdminCheckUser.vue';
import UpdateWarranted from './views/UpdateWarranted.vue';
import AdminCheckContract from './views/AdminCheckContract.vue';
import UpdateUserInfos from './views/UpdateUserInfos.vue';
import UserSettings from './views/UserSettings.vue';
import UpdateUserPassword from './views/UpdateUserPassword.vue';
import UserResetPassword from './views/UserResetPassword.vue'

import axios from 'axios';
const apiBaseUrl = 'http://localhost:3000';
//import PostService from './PostService';
//const postService = new PostService();
//on stipule que Vue initialisé dans le main va utiliser Router pour naviguer entre les pages
Vue.use(Router);
const router = new Router({
    ifAuth: localStorage.getItem('token') || null,
    mode: 'history', //je crois c'est pas obligatoire mais c'est mieux pour le hashage pendant la navigation
    //juste ca va marcher à partir Internet Explorer 8 et pas pour les navigateurs antérieurs
    routes: [{
            path: '/',
            component: Home, //on redirige la connection vers la page d'acceuil quand on tappe la page
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            if (localStorage.getItem('isAdmin') == 'true')
                                next('/adminAccount')
                            else
                                next('/account')
                        } else {
                            next()
                        }
                    })
                next()
            }
        },
        {
            path: '/account',
            component: Account, //on redirige vers la page de l'utilisateur connecté ou l'on 
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next('/account')
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/adminAccount',
            component: AdminAccount,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/superUser/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next('/adminAccount')
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/adminAccount/adminCheckUser',
            component: AdminCheckUser,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/adminAccount/adminCheckContract',
            component: AdminCheckContract,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/users/create',
            component: CreateUser
        },
        {
            path: '/error',
            component: ErrorVue,
        },
        {
            path: '/account/contract/create',
            component: CreateContract,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/account/contract/sinister/chooseObject',
            component: SinisterChooseObject,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/account/contract/sinister/chooseSinister',
            component: SinisterChooseSinister,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/account/contract/sinister/informations',
            component: SinisterInfos,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/account/contract/sinister/progress',
            component: SinisterProgress,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/account/contract/update/warranted',
            component: UpdateWarranted,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/adminAccount/UpdateUserInfos',
            component: UpdateUserInfos,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/users/UpdateUserInfos',
            component: UpdateUserInfos,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        }, {
            path: '/users/settings',
            component: UserSettings,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/users/update/password',
            component: UpdateUserPassword,
            beforeEnter: (to, from, next) => {
                const tokenTemp = localStorage.getItem('acces_token')
                const post = {
                    token: tokenTemp
                }
                //le post est different de mon token initial
                axios.post(`${apiBaseUrl}/users/checkToken/`, post)
                    //res = nombre de fois ou le token est present dans la bdd
                    .then(res => {
                        if (res.data == 1) {
                            next()
                        } else {
                            next('/error')
                        }
                    })
                next()
            }
        },
        {
            path: '/users/page/resetPassword/',
            component: UserResetPassword
        }
    ],
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }
})

//guard de notre route pour /account



export default router;