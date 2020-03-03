<template>

  <div class="hello" style="overflow:hidden">
    <NavBarGuest />
    <div class="jumbotron" style="border-bottom:solid 1px red!important; background:white!important">
      <div class="row" style="width:95%!important; margin-left:auto!important; margin-right:auto!important">
        <div class="panel panel-primary">
          <div class="panel-heading">
              <h3 class="panel-title">Upcoming Yoga Classes</h3>
          </div>
          <div class="panel-body" style="padding-left:0px!important;padding-right:0px!important">
              <!-- Nav tabs -->
              <ul class="nav nav-tabs full-width" role="tablist">
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
                    <div class="row">
                      <div class="col-sm-6 col-md-4" v-for="eachClass in chosenDay" v-bind:key=eachClass.key>
                          <div class="thumbnail">
                            <div class="caption">
                              <p><b>{{eachClass[1].name}}</b></p>
                              <br />
                              <img v-bind:src="'https://loremflickr.com/g/320/240/yoga?random='+eachClass[1].timeStart"  />
                              <br />
                              <h3><span class="fas fa-clock"></span> {{eachClass[1].timeStart}} - {{eachClass[1].timeEnd}}</h3>
                              <h3 style="font-weight:100!important">{{eachClass[1].description}}</h3>
                              <br />
                              <button class="btn btn-danger" role="button" data-toggle="modal" data-target="#myModal" @click="selectClass(eachClass)">Withdraw</button>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"/>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Withdraw from {{this.selectedClass[1].name}}</h4>
          </div>
          <div class="modal-body">
            Do you want to withdraw from 
            <br /><br />
            <b>{{this.selectedClass[1].name}}</b>
            <br />
            {{this.selectedClass[1].day}}
            <br />
            {{this.selectedClass[1].timeStart}} - {{this.selectedClass[1].timeEnd}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" v-on:click="withdrawClass(selectedClass)" data-dismiss="modal">Withdraw</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of Modal -->
  </div>
</template>

<script>
import NavBarGuest from './layout/NavBarGuest'
export default {
  name: 'HelloWorld',
  components:{
    NavBarGuest
  },
  data () {
    return {
      eachClass: [],
      classes: [],
      dayFilter: 'monday',
      filteredClasses: [],
      bookedClasses: [],
      results: [],
      selectedClass: [
        [1,''],
        [2,'name']
      ]
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
  mounted() {
    var userId = firebase.auth().currentUser.uid;
    const db = this.$firebase.firestore();
    db
      .collection('bookings')
      .where('userId', '==', userId)
      .get()
      .then(snap => {
        const bookedClasses = snap.docs.map(doc => [doc.id, doc.data()]);
        this.bookedClasses = bookedClasses;
      });
  },
  computed:{
    chosenDay: function(){
      return this.bookedClasses.filter((eachClass)=>{
        this.filteredClasses = eachClass[1].day.toLowerCase().match(this.dayFilter.toLowerCase())
        console.log(eachClass[1].day.toLowerCase().match(this.dayFilter.toLowerCase()))
        return eachClass[1].day.toLowerCase().match(this.dayFilter.toLowerCase())
      })
    },
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
    withdrawClass(clss) {
      const db = this.$firebase.firestore();

      db.collection("bookings").doc(clss[0]).delete().then(function() {
        alert('The booking has been deleted!')
        console.log("Booking successfully deleted!");
        window.location.reload()
      }).catch(function(error) {
        console.error("Error removing booking: ", error);
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
