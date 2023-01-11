<script>
import { RouterLink, RouterView } from "vue-router";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useIndexStore } from "../stores";
export default{
    name: 'Navbar',
    data() {
      return {
        customerName: localStorage.getItem('name')
      }
    },
    methods: {
      ...mapActions(useIndexStore, ['handleLogout', 'checkLogin']),
      logout() {
        this.handleLogout()
      }
    },
    computed: {
      ...mapState(useIndexStore, ['isLogin'])
    },
    created () {
      this.checkLogin()
    }

}

</script>

<template>
<nav class="navbar navbar-expand-lg bg-danger bg-opacity-25 mx-3 my-3 py-2 px-2 rounded-pill">
    <div class="container-fluid position-sticky">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/logo_bandit-removebg-preview.png"
          width="55"
          height="55"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page"><router-link to='/'>Home</router-link></a>
          </li>
          <li class="nav-item" v-if="isLogin == true">
            <a class="nav-link">
                <router-link to="/wishlist">
                    Wish List        
                </router-link>
            </a>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav" >
          <li class="nav-item" v-if="isLogin == true" >
            <a class="nav-link" href="" @click.prevent="logout" >
                Logout
            </a>
          </li>
          <li class="nav-item" v-if="isLogin == false" >
            <router-link to="/login">
                Have an account? Login now
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>