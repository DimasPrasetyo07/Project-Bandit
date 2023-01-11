<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar
  },
};
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/testing"></RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- NAVBAR SECTION -->
  <Navbar />
  <!-- END OF NAVBAR -->

  <!-- LOGIN SECTION -->
  <!-- END OF LOGIN SECTION -->

  <!-- REGISTER SECTION -->
  <!--END OF REGISTER SECTION  -->

  <!-- SIDEBAR SECTION -->
  <!-- <Sidebar /> -->
  <!-- END OF SIDEBAR SECTION -->

 
  
  <RouterView />
</template>
