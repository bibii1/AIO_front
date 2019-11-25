import axios from 'axios';
const apiBaseUrl = 'http://localhost:3000';
export default class PostService{
    getAllPosts(){
        return axios.get(`${apiBaseUrl}/user`);
    }

    getCheckLogin(user){
        console.log(axios.get(`${apiBaseUrl}/user/${user.email}/${user.password}`));
        return axios.get(`${apiBaseUrl}/user/${user.email}/${user.password}`);
    }

    postUsers(user){
        if(user.id){
            return axios.put(`${apiBaseUrl}/user/${user.id}`,user);
        } else return axios.post(`${apiBaseUrl}/user/${user.email}/${user.password}`,user);
    }
}