<template>

  <div class="hello" style="overflow:hidden">
    <NavBarAdmin />
    <div class="jumbotron" style="border-bottom:solid 1px red!important; background:white!important">
        <div class="row" style="width:95%!important; margin-left:auto!important; margin-right:auto!important">
            <div class="panel panel-warning">
                <div class="panel-heading">
                    <h3 class="panel-title">Classes</h3>
                </div>
                <div class="panel-body">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs full-width" role="tablist">
                        <button class="btn btn-primary pull-left" role="button" data-toggle="modal" data-target="#addClass">Add Class</button>
                        <li role="presentation" class="active" v-on:click="dayFilterSet('monday')"><a href="#Monday" aria-controls="Monday" role="tab" data-toggle="tab">Monday</a></li>
                        <li role="presentation" v-on:click="dayFilterSet('tuesday')"><a href="#Tuesday" aria-controls="Tuesday" role="tab" data-toggle="tab">Tuesday</a></li>
                        <li role="presentation" v-on:click="dayFilterSet('wednesday')"><a href="#Wednesday" aria-controls="Wednesday" role="tab" data-toggle="tab">Wednesday</a></li>
                        <li role="presentation" v-on:click="dayFilterSet('thursday')"><a href="#Thursday" aria-controls="Thursday" role="tab" data-toggle="tab">Thursday</a></li>
                        <li role="presentation" v-on:click="dayFilterSet('friday')"><a href="#Friday" aria-controls="Friday" role="tab" data-toggle="tab">Friday</a></li>
                        <li role="presentation" v-on:click="dayFilterSet('saturday')"><a href="#Saturday" aria-controls="Saturday" role="tab" data-toggle="tab">Saturday</a></li>
                        <li role="presentation" v-on:click="dayFilterSet('sunday')"><a href="#Sunday" aria-controls="Sunday" role="tab" data-toggle="tab">Sunday</a></li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content" style="padding:15px!important">
                        <div role="tabpanel" class="tab-pane active" :id=this.dayFilter>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <caption></caption>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Description</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-left" v-for="eachClass in chosenDay" v-bind:key=eachClass.key>
                                            <td scope="row">{{eachClass[1].name}}</td>
                                            <td>{{eachClass[1].timeStart}}</td>
                                            <td>{{eachClass[1].timeEnd}}</td>
                                            <td style="width:40%!important">{{eachClass[1].description}}</td>
                                            <td>
                                                <button class="btn btn-success" role="button" data-toggle="modal" data-target="#editClass"  @click="selectClass(eachClass)">Edit</button>
                                                <button class="btn btn-danger" role="button" data-toggle="modal" data-target="#deleteClass" @click="selectClass(eachClass)">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    <!-- Modal for Add Class -->
    <div class="modal fade" id="addClass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Add Class</h4>
          </div>
          <div class="modal-body">
            <br /><br />
            <div> 
                <table style="width:-webkit-fill-available">
                    <tbody>
                        <tr>
                            <td class="text-left" style="width:33%; vertical-align:top"><b>Class Information</b></td>
                            <td style="width:6%">
                                 <input type="text" v-model="newName" class="form-control" placeholder="Name">
                                 <br />
                                <textarea class="form-control" rows="3" placeholder="Description" v-model="newDescription"></textarea>
                                <br />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-left" style="width:33%;"><b>Day</b></td>
                            <td style="width:66%">
                                <select class="form-control" v-model="newDay">
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                    <option>Saturday</option>
                                    <option>Sunday</option>
                                </select>
                                <br />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-left" style="width:33%;"><b>Start Time</b></td>
                            <!-- <td><time-picker v-model="newTimeStart"/></td> -->
                            <td><input type="number" v-model="newTimeStart" class="form-control" placeholder="HHMM" min="0" max="2359"></td>
                            <br /><br />
                        </tr>
                         <tr>
                            <td class="text-left" style="width:33%; "><b>End Time</b></td>
                            <td><input type="number" v-model="newTimeEnd" class="form-control" placeholder="HHMM" min="0" max="2359"></td>
                            <br />
                        </tr>
                    </tbody>
                </table>
                <br /><br />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" v-on:click="addClass" data-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of Modal -->
    <!-- Modal for Edit Class-->
    <div class="modal fade" id="editClass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Edit Class</h4>
          </div>
          <div class="modal-body">
            <br /><br />
            <div> 
                <table style="width:-webkit-fill-available">
                    <tbody>
                        <tr>
                            <td class="text-left" style="width:33%; vertical-align:top"><b>Class Information</b></td>
                            <td style="width:6%">
                                 <input type="text" v-model="selectedClass[1].name" class="form-control" placeholder="Name" >
                                 <br />
                                <textarea class="form-control" rows="3" placeholder="Description" v-model="selectedClass[1].description"></textarea>
                                <br />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-left" style="width:33%;"><b>Day</b></td>
                            <td style="width:66%">
                                <select class="form-control" v-model="selectedClass[1].day">
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                </select>
                                <br />
                            </td>
                        </tr>
                        <tr>
                            <td class="text-left" style="width:33%;"><b>Start Time</b></td>
                            <!-- <td><time-picker v-model="selectedClass[1].timeStart"/></td> -->
                            <td><input type="number" v-model="selectedClass[1].timeStart" class="form-control" min="0" max="2359"></td>
                            <br /><br />
                        </tr>
                         <tr>
                            <td class="text-left" style="width:33%; "><b>End Time</b></td>
                            <!-- <td><time-picker v-model="selectedClass[1].timeEnd"/></td> -->
                            <td><input type="number" v-model="selectedClass[1].timeEnd" class="form-control" min="0" max="2359"></td>
                            <br />
                        </tr>
                    </tbody>
                </table>
               
                <br /><br />
                
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" v-on:click="update(selectedClass[0])" data-dismiss="modal">Update</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of Modal -->
    <!-- Modal for Delete Class-->
    <div class="modal fade" id="deleteClass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Delete Class</h4>
          </div>
          <div class="modal-body">
            Do you want to delete 
            <br /><br />
            <b>{{selectedClass[1].name}}</b>
            <br />
            {{selectedClass[1].day}}
            <br />
            {{selectedClass[1].timeStart}} - {{selectedClass[1].timeEnd}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" v-on:click="deleteClass(selectedClass)" data-dismiss="modal">Delete</button>
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
      eachClass: [],
      classes: [],
      dayFilter: 'monday',
      selectedClass: [
        [1,''],
        [2,'name']
      ],
      name: '',
      description: '',
      day: '',
      timeStart: '',
      timeEnd: '',
      newName: '',
      newDescription: '',
      newDay: '',
      newTimeStart: '',
      newTimeEnd: ''
    }
  },
  created () {
    const db = this.$firebase.firestore();
    db
      .collection('classes')
      .get()
      .then(snap => {
        const classes = snap.docs.map(doc => [doc.id, doc.data()]);
        // const classes = snap.docs.map(doc =>  doc.data());
        this.classes = classes;
      });
  },
  computed:{
    chosenDay: function(){
      return this.classes.filter((eachClass)=>{
        return eachClass[1].day.toLowerCase().match(this.dayFilter.toLowerCase())
      })
    }
  },
  methods: {
    login: function () {
        this.$router.replace('/LandingGuest')
    },
    dayFilterSet(day) {
        this.dayFilter = day
    },
    selectClass(clss) {
      this.selectedClass = clss;
    },
    update(classId) {
      const db = this.$firebase.firestore();

    db.collection('classes').doc(classId).set({
        name: this.selectedClass[1].name,
        description: this.selectedClass[1].description,
        day: this.selectedClass[1].day.toLowerCase(),
        timeEnd: this.selectedClass[1].timeEnd,
        timeStart: this.selectedClass[1].timeStart
    }).then(() =>{
        alert('The class has been updated successfully')
        window.location.reload()
    }).catch(function(error) {
        console.log("Error updating class:", error);
    });
    },
    deleteClass(clss) {
        console.log(clss[0])
        const db = this.$firebase.firestore();

        db.collection("classes").doc(clss[0]).delete().then(function() {
            alert('The booking has been deleted!')
            console.log("Booking successfully deleted!");
            window.location.reload()
        }).catch(function(error) {
            console.error("Error removing booking: ", error);
        });
    },
    addClass() {
      const db = this.$firebase.firestore();

      db.collection('classes').add({
          day: this.newDay.toLowerCase(),
          description: this.newDescription,
          name: this.newName,
          timeEnd: this.newTimeEnd,
          timeStart: this.newTimeStart
        }).then(() =>{
          alert('The class has been added!')
          window.location.reload()
        }).catch(function(error) {
          console.log("Error adding class:", error);
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
