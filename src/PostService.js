import axios from 'axios';
const apiBaseUrl = 'http://localhost:3000';

//dans cette classe il faut faire attention au lien de l'api qu'il correspond bien 
//style d'erreur qui arrive :
// '/user' à la place de '/users'
// '/contrat' à la place de '/contract'
//pour voir les resultats de la console il faut faire sur mac pour chrome cmd+option+i 
export default class PostService {
    //on recupere tous les utilisateurs de la collection users
    getAllUser(){
        return axios.get(`${apiBaseUrl}/users/all`);
    }

    //on renvoie l'utilisateur si authantification
    getCheckLogin(user){
        return axios.post(`${apiBaseUrl}/users/login`,user)
    }

    //verifie que le token existe bien dans la bdd pour l'user en question
    getCheckToken(token){
        return axios.get(`${apiBaseUrl}/users/checkToken`,token)
    }

    //on crée un nouvel utilisateur
    postUser(user){
        if(user != null){
            //on verifie d'abord qu"il n'y a aucun utilisateur semblable avec le mail
            //la requete retourne uniquement le nombre d'users avec ce mail
            //elle ne retourne pas les infos de l'user
            axios.get(`${apiBaseUrl}/users/checkEmail/${user.email}`)
            .then(function(res){
                if(res.data == 0){
                    axios.post(`${apiBaseUrl}/users`,user);
                }
            })
        }
    }

    initAccount(folder){
        //on verifie d'abord qu'auncun compte n'existe avec ce num de folder
        console.log(folder)
        axios.get(`${apiBaseUrl}/account/${folder}`)
        .then(function(res){
            if(res.data == null){
                //alors on peut en créer un en evitant les doublons
                axios.post(`${apiBaseUrl}/account/${folder}`);
            }
        });
    }

    logoutAccount(token){
        const config = { headers :
            {'Authorization' : token}
        }
        console.log(config)
        return axios.post(`${apiBaseUrl}/users/me/logout`,{},config)
    
    }

    logoutallAccount(token){
        const config = { headers :
            {'Authorization' : token}
        }
        console.log(config)
        return axios.post(`${apiBaseUrl}/users/me/logoutall`,{},config)
    }

    deleteAll(folder){
        //supp l'user
        axios.delete(`${apiBaseUrl}/users/${folder}`)
        //supp son account
        axios.delete(`${apiBaseUrl}/account/${folder}`)
    }



    


}