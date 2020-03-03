<template>

  <div class="hello" style="overflow:hidden">
    <NavBarGuest />
    <div class="jumbotron" style="border-bottom:solid 1px red!important; background:white!important">
      <div class="jumbotron" style="border-bottom:solid 1px red!important; background:white!important">
        <div class="container" style="width:50vh!important; height:50vh!important">
            <h1 style="color:black!important; font-size:50px!important">About {{this.firstName}}</h1>
            <br /><br /><br />
            <input type="text" v-model="firstName" class="form-control" placeholder="First Name" :disabled="!isEdit">
            <br />
            <input type="text" v-model="lastName" class="form-control" placeholder="Last Name" :disabled="!isEdit">
            <br />
            <input type="email" v-model="email" class="form-control" placeholder="Email" :disabled="!isEdit">
            <br />
            <button class="btn btn-primary btn-block" style="margin-bottom:25px!important;" v-show="!isEdit" @click="isEdit = true">Edit</button>
             <button class="btn btn-success btn-block" style="margin-bottom:25px!important;" v-on:click=update v-show="isEdit" @click="isEdit = false">Update</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import NavBarGuest from './layout/NavBarGuest'
export default {
  name: 'ViewProfile',
  components:{
    NavBarGuest
  },
  data () {
    return {
      isEdit: false,
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      profilePic: '',
      uid: '',
    }
  },
  mounted () {
    const db = this.$firebase.firestore();
    var userId = firebase.auth().currentUser.uid;

    if (userId != null) {
      db
      .collection('users').doc(userId)
      .get()
      .then(snap => {
        if (snap.exists) {
          this.firstName = snap.data().firstName
          this.lastName = snap.data().lastName
          this.email = snap.data().email
          this.profilePic = snap.data().profilePic
        }else {
          console.log("Not Found")
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  },
  methods: {
    update() {
      const db = this.$firebase.firestore();
      var userId = firebase.auth().currentUser.uid;

      if (userId != null) {
        db.collection('users').doc(userId).set({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email
        }).then(() =>{
          window.location.reload()
        }).catch(function(error) {
          console.log("Error updating user:", error);
        });
      }else {
        console.log("Error userId not found");
      }
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
