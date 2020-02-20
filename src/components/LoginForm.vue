<template>
  <mdb-row>
    <mdb-col md="20">
      <ul id="tiles-container" class="table">
        <mdb-card>
          <form class="form" v-on:submit.prevent="onSubmit">
            <mdb-row>
              <div class="input-field col s12">
                <input id="email" type="email" v-model="email" class="validate" />
                <label for="email">Email</label>
              </div>
            </mdb-row>
            <mdb-row>
              <div class="input-field col s12">
                <input id="password" type="password" v-model="password" class="validate" />
                <label for="password">Mot De Passe</label>
              </div>
            </mdb-row>
            <mdb-row>
              <button class="btn waves-effect waves-light" type="submit" name="action">Connection</button>
            </mdb-row>
          </form>
        </mdb-card>
      </ul>
    </mdb-col>
  </mdb-row>
</template>


<script>
import PostService from "../PostService";
const postService = new PostService();
import router from "../router";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      count: "",
      error: false
    };
  },
  methods: {
    onSubmit() {
      postService
        .getCheckLogin({
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.data.userTemp.emailValidation == true) {
            const token = res.data.token;
            const folder_id = res.data.userTemp.folder;
            console.log(res.data);
            localStorage.setItem("acces_token", token);
            localStorage.setItem("folder_id", folder_id);
            localStorage.setItem("isAuth", true);
            router.push("/account");
          } else console.log("l'email n'est pas valide");
        });
    }
  }
};
</script>

<style scoped>
.form-gradient .font-small {
  font-size: 0.8rem;
}

.form-gradient .header {
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}

.form-gradient input[type="text"]:focus:not([readonly]) {
  border-bottom: 1px solid #fd9267;
  -webkit-box-shadow: 0 1px 0 0 #fd9267;
  box-shadow: 0 1px 0 0 #fd9267;
}

.form-gradient input[type="text"]:focus:not([readonly]) + label {
  color: #4f4f4f;
}

.form-gradient input[type="password"]:focus:not([readonly]) {
  border-bottom: 1px solid #fd9267;
  -webkit-box-shadow: 0 1px 0 0 #fd9267;
  box-shadow: 0 1px 0 0 #fd9267;
}

.form-gradient input[type="password"]:focus:not([readonly]) + label {
  color: #4f4f4f;
}
</style>