<template>
  <div id="app">
    <nav class="navbar navbar-inverse" style="margin-bottom:0px; border-top: solid 1px red; background: black; border-radius:0px">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
         
          <a class="navbar-brand" href="#" style="margin-top:-5px">
            <img src="https://www.nicepng.com/png/full/225-2254829_icon-yoga.png" width="30px" height="30px" style="display:inline" />
            <span style="margin-left:10px; color:white"> Lolagayo Yoga</span>
            </a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li class="nav-item">
                    <a class="nav-link" href="#"><span class="fas fa-sign-out-alt"></span> Logout</a>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AppAdmin'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
