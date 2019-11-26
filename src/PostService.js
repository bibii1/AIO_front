import axios from 'axios';
const apiBaseUrl = 'http://localhost:3000';
//dans cette classe il faut faire attention au lien de l'api qu'il correspond bien 
//style d'erreur qui arrive :
// '/user' à la place de '/users'
// '/contrat' à la place de '/contract'
//pour voir les resultats de la console il faut faire sur mac pour chrome cmd+option+i 
export default class PostService{
    //on recupere tous les utilisateurs de la collection users
    getAllUser(){
        return axios.get(`${apiBaseUrl}/users`);
    }

    //on renvoie l'utilisateur si authantification
    getCheckLogin(user){
        return axios.get(`${apiBaseUrl}/users/${user.email}/${user.password}`);
    }

    //on crée un nouvel utilisateur
    postUser(user){
        if(user != null){
            //on verifie d'abord qu"il n'y a aucun utilisateur semblable avec le mail
            //la requete retourne uniquement le nombre d'users avec ce mail
            //elle ne retourne pas les infos de l'user
            axios.get(`${apiBaseUrl}/users/${user.email}`)
            .then(function(res){
                if(res.data == 0){
                    axios.post(`${apiBaseUrl}/users/`,user);
                }
            })
            .catch(err=>console.log(err));
        };
    }

    initAccount(user){
        //on verifie d'abord qu'auncun compte n'existe avec ce num de folder
        axios.get(`${apiBaseUrl}/account/${user.folder}`)
        .then(function(res){
            if(res.data == null){
                //alors on peut en créer un en evitant les doublons
                axios.post(`${apiBaseUrl}/account/${user.folder}`);
            }
        });
    }

    


}