<template>

  <div class="hello" style="overflow:hidden">
    <NavBarGuest />
    <div class="jumbotron" style="border-bottom:solid 1px red!important; background:white!important">
        <div class="container" style="width:50vh!important; height:50vh!important">
            <h1 style="color:black!important; font-size:50px!important">Change Pasword</h1>
            <br /><br /><br />
            <input type="password" class="form-control" placeholder="New Password" v-model="newPassword">
            <br />
            <input type="password" class="form-control" placeholder="Confirm Password" v-model="newPasswordConf">
            <br />
            <button class="btn btn-success btn-block full-width" style="margin-bottom:25px!important;" v-on:click=changePw>Change Password</button>
        </div>
    </div>
  </div>
</template>

<script>
import NavBarGuest from './layout/NavBarGuest'
import router from "../router"
export default {
  name: 'HelloWorld',
  components:{
    NavBarGuest
  },
  data () {
    return {
      isLogin: true,
      isForgetPassword: false,
      isSignUp: false,
      newPassword: '',
      newPasswordConf: '',
    }
  },
  methods: {
    login: function () {
        this.$router.replace('/LandingGuest')
    },
    changePw (){
      var user = firebase.auth().currentUser;
      user.updatePassword(this.newPassword).then(function() {
        alert('Your password has been updated successfully')
        console.log("Password updated successfully")
        router.push("/guest")   
      }).catch(function(error) {
        alert('Your password has not been updated, please log out and log in to change it')
        console.log(error)
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
