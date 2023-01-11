<script>
import { RouterLink, RouterView } from "vue-router";
import { mapActions } from "pinia";
import { useIndexStore } from "../stores";

export default {
    name: 'LoginView',
    data () {
      return {
        loginCustomer : {
          email:'',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions(useIndexStore, ["handleLogin", "handleCredentialResponse"]),
      login() {
        // console.log('uji coba sebelom fungsi')
        this.handleLogin(this.loginCustomer)
        // console.log('test setelah fungsi')
      },
      callback(response) {
        this.handleCredentialResponse(response)
      }
    }

}

</script>

<template>

<section class="container text-center mt-3">
    <div class="row d-flex justify-content-center">
      <h3>Login to Bandit</h3>
      <br /><br /><br />
      <form @submit.prevent="login">
        <div class="row d-flex justify-content-center">
          <div class="form-control mb-4" style="width: 500px">
            <!-- Email input -->
            <label class="form-label" for="form2Example1">Email address</label>
            <input
              type="email"
              id="loginEmail-form"
              class="form-control"
              placeholder="Input your email address"
              v-model="loginCustomer.email"
            />
            <!-- Password Input -->
            <label class="form-label" for="form2Example2">Password</label>
            <input
              type="password"
              id="loginPassword-form"
              class="form-control"
              placeholder="Input your password"
              v-model="loginCustomer.password"
            />
          </div>
          <div class="row justify-content-center">
            <button
              type="submit"
              class="btn btn-primary btn-block mb-4"
              style="width: 100px"
            >
              Sign in
            </button>
          </div>

          <div class="text-center">
            <p>Not a member? <Router-link to="/register">Register</Router-link> </p>
            <p>or sign up with:</p>
            <!-- JANGAN LUPA TAMBAHIN TOMBOL GUGEL LOGIN -->
            <GoogleLogin :callback="callback"/>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>