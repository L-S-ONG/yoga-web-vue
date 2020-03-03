<template>

  <div class="hello" style="overflow:hidden">
    <NavBarAdmin />
    <div class="jumbotron" style="border-bottom:solid 1px red; background:white!important">
        <div class="row" style="width:95%!important; margin-left:auto!important; margin-right:auto!important">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <h3 class="panel-title">Students</h3>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                              <!-- <div v-for="user in users" v-bind:key=user.key> -->
                                <tr class="text-left" v-for="user in users" v-bind:key=user.key>
                                    <td scope="row">{{user[1].firstName}}</td>
                                    <td>{{user[1].lastName}}</td>
                                    <td>{{user[1].email}}</td>
                                    <td><button class="btn btn-danger" role="button" data-toggle="modal" data-target="#myModal" @click="selectUser(user)">Delete</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Delete Student</h4>
          </div>
          <div class="modal-body">
            Do you want to delete this user?
            <br /><br />
            <b>{{this.selectedUser[1].firstName + " " + this.selectedUser[1].lastName}}</b>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" v-on:click="deleteUser(selectedUser)" data-dismiss="modal">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of Modal -->
  </div>
</template>

<script>
import NavBarAdmin from './layout/NavBarAdmin'
export default {
  name: 'HelloWorld',
  components:{
    NavBarAdmin
  },
  data () {
    return {
      users: [],
      selectedUser: [
        [1,''],
        [2,'name']
      ]
    }
  },
   mounted() {
    // var userId = firebase.auth().currentUser.uid;
    const db = this.$firebase.firestore();
    db
      .collection('users')
      .get()
      .then(snap => {
        const users = snap.docs.map(doc => [doc.id, doc.data()]);
        this.users = users;
      });
  },
  methods: {
    selectUser(user) {
      this.selectedUser = user;
    },
    deleteUser(user) {
      const db = this.$firebase.firestore();

      admin.auth().deleteUser(user[0])
      .then(function() {
        db.collection("users").doc(user[0]).delete().then(function() {
        alert('The user has been deleted!')
        console.log("User successfully deleted!");
        window.location.reload()
        }).catch(function(error) {
        console.error("Error removing user: ", error);
        });
      })
      .catch(function(error) {
        console.log('Error deleting user:', error);
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
