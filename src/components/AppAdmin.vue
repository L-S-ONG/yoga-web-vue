<template>

  <div class="hello" style="overflow:hidden">
    <NavBarAdmin />
    <div class="jumbotron" style="border-bottom:solid 1px red!important; background:white!important">
      <GChart
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
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
      msg: 'Welcome to Your Vue.js App',
      isLogin: true,
      isForgetPassword: false,
      isSignUp: false,
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Year', 'New Users', 'Classes', 'Bookings'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }
    }
  },
  methods: {
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
