<template>
<body>
  <div class="navbar"><NavBar/></div>
  <div class="createContainer">
  <div class="row">
    <form class="form" v-on:submit.prevent="onSubmit">
      <div class="row">
        <div class="input-field col s12">
          <input id="sinisterDate" type="date" v-model="sinisterDate" class="validate" min="2013-01-01" max="2020-12-31" required>
        <!-- Faire en sorte que max soit < a la date du jour dans la validation-->
          <label for="sinisterDate">Date du sinistre *</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="sinisterTime" type="time" v-model="sinisterTime" class="validate" required>
          <label for="sinisterTime">Heure du sinistre *</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <label for="sinisterCircumstances">Circonstances du sinistre *</label>
          <br><br>
          <textarea id="sinisterCircumstances" v-model="sinisterCircumstances" class="form-control" rows="3" required/>

        </div>
      </div>
      <div class="rowContinue">
        <button class="btn waves-effect waves-light" type="submit" name="action">Je continue</button>
      </div>
    </form>
  </div>
  </div>
</body>
</template>

<script>
import router from '../router.js';
import NavBar from '../components/Navbar';

import PostService from '../PostService';
const postService = new PostService();
      

export default {
    name:"sinisterInfos",
    components : {
      NavBar
    },
    data(){
        return{
            folder_id_user: localStorage.getItem('folder_id_user'),
            index: localStorage.getItem("index"),
            sinisterDate: "",
            sinisterTime:"",
            sinisterCircumstances:"",
            sinisterType: localStorage.getItem('sinisterType'),
            account: {},
            user: ""
        }
    },
    methods:{
      //Transferer les infos a la base de données
        onSubmit(){
            const sinister={
                folder_id : this.folder_id_user,
                contract_id: this.account.listContract[this.index].contract_id,
                sinisterDate: this.sinisterDate,
                sinisterTime: this.sinisterTime,
                sinisterCircumstances:this.sinisterCircumstances,
                sinisterType: this.sinisterType
            };
            const infosToforward = {
              object: this.account.listContract[this.index].object,
              sinisterDate: this.sinisterDate,
              sinisterTime: this.sinisterTime,
              sinisterCircumstances:this.sinisterCircumstances,
              sinisterType: this.sinisterType
            }
            postService.sendMailSinister(infosToforward,this.user.email)
            .then(()=>{
              console.log('Email sent')
            })
            postService.createSinister(sinister)
            .then(()=>{
              router.push('/');
            })
        }
    },
    created(){
        postService.getAccount(this.folder_id_user)
        .then(res=>{
          this.account = res.data
        })
        postService.getUser(this.folder_id_user)
        .then(res=>{
          this.user = res.data
        })
    }
  }

</script>

<style scoped>
.input-field col s12{
  color: aliceblue
}

.sinisterCircumstances{
  max-width: 500px;
  width: 100%;
}

.createContainer {
  text-align: left;
  width: 60%;
  max-width: 730px;
  padding: 0 20px;
  margin: auto;
  margin-top: 40px;
  transition: all 0.4s;
}

.rowContinue{
  text-align: center;
}
</style>
