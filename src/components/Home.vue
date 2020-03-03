<template>

  <div class="hello" style="overflow:hidden">
    <NavBarNoCredential />
    <div class="jumbotron jumbotron-fluid vertical-center" style="border-bottom:solid 1px red!important">
      <video autoplay muted loop>    
        <source src="../../static/home-vid.mp4" data-src="../../static/home-vid.mp4" type="video/mp4">
      </video>
      <div class="container text-white containerAlignment" style="height:-webkit-fill-avaialble!important; display:block!important; align-items:center!important">
        <div class="col-md-8">
            <h1 class="display-4" style="font-size:60px!important">Welcome to Lolagayo Yoga</h1>
            <p class="lead" style="font-size:20px!important">Modern Lifestyle Evolution</p>
        </div>
        <div class="col-md-4" style="background:#00000057!important; z-index:0.1!important">
          <div style="padding:15px; z-index:1; color:white;" v-show="isLogin">
            <h2><b>Login</b></h2><br />
            <div>
              <input type="email" v-model="email" class="form-control" placeholder="Email">
              <br>
              <input type="password" v-model="password" class="form-control" placeholder="Password">
              <br />
              <span class="pull-left">Don't have an account? <a href="#" v-on:click="isLogin = false; isForgetPassword = false; isSignUp = true">Sign up here!</a></span>
              <span class="pull-right"><a href="#" style="color:darkorange!important" v-on:click="isLogin = false; isSignUp = false; isForgetPassword = true">Forget Password?</a></span>
              <br /><br />
              <button class="btn btn-success btn-block full-width" style="margin-bottom:25px!important;" @click="login">Login</button>
            </div>
          </div>
          <div style="padding:15px!important; z-index:1!important; color:white!important;" v-show="isSignUp">
            <h2><b><span class="fas fa-arrow-left" style="float:left!important; cursor: pointer!important;" v-on:click="isLogin = true; isSignUp = false; isForgetPassword = false"></span>Sign Up</b></h2><br />
            <div> 
              <input type="text" v-model="firstName" class="form-control" placeholder="First Name">
              <br />
              <input type="text" v-model="lastName" class="form-control" placeholder="Last Name">
              <br />
              <input type="email" v-model="email" class="form-control" placeholder="Email">
              <br>
              <input type="password" v-model="password" class="form-control" placeholder="Password">
              <br />
              <input type="password" v-model="confirmPassword" class="form-control" placeholder="Confirm Password">
              <br />
              <button class="btn btn-success btn-block full-width" style="margin-bottom:25px;" @click="signUp">Sign Up</button>
            </div>
          </div>
          <div style="padding:15px!important; z-index:1!important; color:white!important;" v-show="isForgetPassword">
            <h2><b><span class="fas fa-arrow-left" style="float:left; cursor: pointer;" v-on:click="isForgetPassword = !isForgetPassword; isLogin = true; isSignUp = false"></span>Forget Password</b></h2><br />
            <div> 
              <input type="email" v-model="email" class="form-control" placeholder="Email">
              <br />
              <button class="btn btn-success btn-block full-width" style="margin-bottom:25px!important;" v-on:click="forgotPw">Reset Password</button>
            </div>
          </div>
        </div>
      
        
      </div>
      <!-- /.container -->
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import NavBarNoCredential from './layout/NavBarNoCredential'

export default {
  name: 'HelloWorld',
  components:{
    NavBarNoCredential
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isLogin: true,
      isForgetPassword: false,
      isSignUp: false,
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    login: function () {
        if(this.email == "admin" && this.password == "admin"){
          this.$router.replace('/admin')
        }else{
          firebase.auth().signInWithEmailAndPassword(this.email, this.password) 
          .then(
              (user) => {
                  console.log('login success')
                  this.$router.replace('/guest')
              },
              (err) => {
                  alert('Oops: ' + err.message)
              }
          )
        }
    },
    signUp: function() {
      if(this.password != this.confirmPassword){
        alert("Password do not match")
      }else{
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
            (user) => {
              const db = this.$firebase.firestore();
                db.collection('users').doc(user.user.uid).set({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  email: this.email
                })
                alert('Your account has been created! Please sign in')
            },
            (err) => {
                alert('Opps! ' + err.message)
            }
        );
      }
    },
    forgotPw (){
      var auth = firebase.auth();
      var emailAddress = this.email;

      auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert('Please check your email inbox')
        window.location.reload()
      }).catch(function(error) {
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
