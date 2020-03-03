// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../src/components/App.vue'
import router from './router'
import * as uiv from 'uiv'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueGoogleCharts from 'vue-google-charts'
import firebase from 'firebase'
// import * as admin from 'firebase-admin';
require('firebase/firestore');
 
Vue.use(VueGoogleCharts)
Vue.use(uiv)
Vue.config.productionTip = false
Vue.prototype.$firebase = firebase;

let app

// var serviceAccount = require("../egci427-yoga-firebase-adminsdk-13d2y-6f7de60c6f.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://egci427-yoga.firebaseio.com"
// });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxKEIVj8KHXwTV-PoaKJ5a5SSO9yX-QhI",
  authDomain: "egci427-yoga.firebaseapp.com",
  databaseURL: "https://egci427-yoga.firebaseio.com",
  projectId: "egci427-yoga",
  storageBucket: "egci427-yoga.appspot.com",
  messagingSenderId: "298800884776",
  appId: "1:298800884776:web:0a2329e5a7300618"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

function deferVideo() {
    //defer html5 video loading
  $("video source").each(function() {
    var sourceFile = $(this).attr("data-src");
    $(this).attr("src", sourceFile);
    var video = this.parentElement;
    video.load();
    // uncomment if video is not autoplay
    //video.play();
  });
}
window.onload = deferVideo;
window.firebase = firebase

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})