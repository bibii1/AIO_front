import axios from 'axios';
const apiBaseUrl = 'http://localhost:3000';

//dans cette classe il faut faire attention au lien de l'api qu'il correspond bien 
//style d'erreur qui arrive :
// '/user' à la place de '/users'
// '/contrat' à la place de '/contract'
//pour voir les resultats de la console il faut faire sur mac pour chrome cmd+option+i 
export default class PostService {

    //__________________________________________________________________________________
    //METHODES QUI AGISSENT SUR LA COLLECTION USERS
    //__________________________________________________________________________________

    //on recupere tous les utilisateurs de la collection users
    getAllUser(){
        return axios.get(`${apiBaseUrl}/users/all`);
    }

    getUser(folder_id){
        return axios.post(`${apiBaseUrl}/users/getUser`,{folder_id : folder_id})
    }

    getSuperUser(folder_id){
        return axios.post(`${apiBaseUrl}/superUser/getUser`,{folder_id : folder_id})
    }

    //on renvoie l'utilisateur si authentification
    getCheckLogin(user){
        if(user.email.includes('@aio.fr'))
        {
            return axios.post(`${apiBaseUrl}/superUser/login`,user)
        }
        else
        {
            return axios.post(`${apiBaseUrl}/users/login`,user)
        }
    }

    //verifie que le token existe bien dans la bdd pour l'user en question
    getCheckToken(token){
        return axios.post(`${apiBaseUrl}/users/checkToken`,token)
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
                else
                {
                    alert("Un compte existe déjà avec cet email.")
                }
            })
        }
    }

    checkExist(email){
        return axios.get(`${apiBaseUrl}/users/checkEmail/${email}`)
    }

    postSuperUser(user){
        if(user != null){
            //on verifie d'abord qu"il n'y a aucun utilisateur semblable avec le mail
            //la requete retourne uniquement le nombre d'users avec ce mail
            //elle ne retourne pas les infos de l'user
            axios.get(`${apiBaseUrl}/superUser/checkEmail/${user.email}`)
            .then(function(res){
                if(res.data == 0){
                    axios.post(`${apiBaseUrl}/superUser`,user);
                }
                else
                {
                    alert("Un compte existe déjà avec cet email.")
                }
            })
        }
    }

    logoutAccount(token){
        const config = { headers :
            {'Authorization' : 'Bearer ' +token}
        }
        return axios.get(`${apiBaseUrl}/users/me/logout`,config)
    }

    logoutallAccount(token){
        const config = { headers :
            {'Authorization' : 'Bearer '+token}
        }
        return axios.get(`${apiBaseUrl}/users/me/logoutall`,config)
    }


    unvalidateUser(post){
        axios.post(`${apiBaseUrl}/users/unvalidateUser`,post);
    }

    changePassword(post){
        return axios.post(`${apiBaseUrl}/users/update/password`,post);
    }

    getSinister(folder_id,contract_id){
        return axios.post(`${apiBaseUrl}/users/contract/getsinister`,{folder_id,contract_id})
    }

    updateSinister(sinister,folder_id){
        return axios.post(`${apiBaseUrl}/users/contract/updatesinister`,{sinister,folder_id})
    }

    getUserByEmail(email){
        return axios.post(`${apiBaseUrl}/users/getUserByEmail`,email)
    }

    updateUserInfos(user){
        return axios.post(`${apiBaseUrl}/users/updateUserInfos`,user)
    }

    createSinister(sinister){
        return axios.post(`${apiBaseUrl}/users/contract/sinister/informations`,sinister)
    }
    updateTempPassword(tempPassword,email){
        return axios.post(`${apiBaseUrl}/users/update/tempPassword`,{tempPassword,email})
    }

    updateResetPassword(tempPassword,new_password){
        return axios.post(`${apiBaseUrl}/users/update/resetPassword`,{tempPassword,new_password})
    }

     //__________________________________________________________________________________
    //METHODES QUI AGISSENT SUR LA COLLECTION ACCOUNT
    //__________________________________________________________________________________
    deleteAll(folder){
        //supp l'user
        axios.delete(`${apiBaseUrl}/users/${folder}`)
        //supp son account
        axios.delete(`${apiBaseUrl}/account/${folder}`)
    }

    initAccount(folder_id){
        //on verifie d'abord qu'auncun compte n'existe avec ce num de folder
        axios.post(`${apiBaseUrl}/account/init`,{folder_id : folder_id})
        .then(function(res){
            if(res.data == null){
                //alors on peut en créer un en evitant les doublons
                axios.post(`${apiBaseUrl}/account/init`,{folder_id});
            }
        });
    }

    getAccount(folder_id){
        return axios.post(`${apiBaseUrl}/account/`,{folder_id : folder_id})
    }

    //crée un nouveau contrat, le parametre contient egalement le folder_id !!!
    createContract(contract){
        return axios.post(`${apiBaseUrl}/account/contract/create`,contract)
    }

    deleteContract(folder_id,contract_id){
        const post = {
            folder_id : folder_id,
            contract_id : contract_id
        }
        return axios.post(`${apiBaseUrl}/account/contract/delete`,post);
    }

    updateWarrented(post){
        return axios.post(`${apiBaseUrl}/account/contract/update/warranted`,post)
    }

     //__________________________________________________________________________________
    //METHODES QUI AGISSENT SUR L'ENVOIE DE MAIL
    //__________________________________________________________________________________

    sendValidationEmail(post){
        axios.post(`${apiBaseUrl}/mail/send/validationLink`,post);
    }

    sendMailUpdateWarranted(contract){
        return axios.post(`${apiBaseUrl}/mail/send/updateWarranted`,contract)
    }

    sendMailPasswordModification(first_name,email){
        return axios.post(`${apiBaseUrl}/mail/send/updatePassword`,{first_name,email})
    }

    sendMailContract(contract,email,name){
        return axios.post(`${apiBaseUrl}/mail/send/createContract`,{contract,email,name})
    }

    sendMailResetPassword(email,tempPassword){
        return axios.post(`${apiBaseUrl}/mail/send/resetLink`,{email,tempPassword})
    }

    sendMailSinister(sinister,email){
        return axios.post(`${apiBaseUrl}/mail/send/sinister`,{sinister,email})
    }
}