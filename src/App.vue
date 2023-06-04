<template>
    <NavBar/>
    <router-view/>

  </template>
  
  <script>
  import NavBar from './components/NavBar.vue'
import HomeView from './views/HomeView.vue';
  export default {
    name: 'App', 
    components: { NavBar, HomeView }
  }
  </script>