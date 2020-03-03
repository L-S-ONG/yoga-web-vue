<template>

  <div class="hello" style="overflow:hidden">
    <NavBarGuest />
    <div class="jumbotron" style="border-bottom:solid 1px red!important; background:white!important">
      <div class="row" style="width:95%!important; margin-left:auto!important; margin-right:auto!important">
        <div class="panel panel-primary">
          <div class="panel-heading">
              <h3 class="panel-title">Yoga Classes</h3>
          </div>
          <div class="panel-body" style="padding-left:0px;padding-right:0px">
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
                              <button class="btn btn-success" role="button" data-toggle="modal" data-target="#myModal" @click="selectClass(eachClass)">Book</button>
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
            <h4 class="modal-title" id="myModalLabel">Book {{this.selectedClass[1].name}}</h4>
          </div>
          <div class="modal-body">
            Do you want to book 
            <br /><br />
            <b>{{this.selectedClass[1].name}}</b>
            <br />
            {{this.selectedClass[1].day}}
            <br />
            {{this.selectedClass[1].timeStart}} - {{this.selectedClass[1].timeEnd}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="bookClass(selectedClass)" data-dismiss="modal">Book</button>
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
  components:{
    NavBarGuest
  },
  data () {
    return {
      eachClass: [],
      classes: [],
      dayFilter: 'monday',
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
    bookClass(clss) {
      const db = this.$firebase.firestore();
      var userId = firebase.auth().currentUser.uid;

      db.collection('bookings').add({
          userId: userId,
          classId: clss[0],
          day: clss[1].day,
          description: clss[1].description,
          name: clss[1].name,
          timeEnd: clss[1].timeEnd,
          timeStart: clss[1].timeStart
        }).then(() =>{
          alert('The class has been booked!')
        }).catch(function(error) {
          console.log("Error booking class:", error);
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
