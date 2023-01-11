<script>
import { RouterLink, RouterView } from "vue-router"
import { mapActions } from "pinia";
import { useIndexStore } from "../stores";


export default {
  name: "RegisterView",
  data() {
    return {
      newCustomer : {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
      }
    }
  },
  methods: {
    ...mapActions(useIndexStore, ["handleRegister"]),
    register() {
      this.handleRegister(this.newCustomer)
    }
  }
};
</script>

<template>
  <section class="container text-center mt-3">
    <div class="row d-flex justify-content-center">
      <h3>Register to Bandit</h3>
      <br /><br /><br />
      <form @submit.prevent="register">
        <div class="row d-flex justify-content-center">
          <div class="form-control mb-4" style="width: 500px">
            <!-- Username input -->
            <label class="form-label" for="form2Example1">Username</label>
            <input
              type="text"
              id="loginUsername-form"
              class="form-control"
              placeholder="Input your username"
              v-model="newCustomer.username"
            />
            <!-- Email input -->
            <label class="form-label" for="form2Example1">Email</label>
            <input
              type="email"
              id="loginEmail-form"
              class="form-control"
              placeholder="Input your email"
              v-model="newCustomer.email"
            />
            <!-- Password Input -->
            <label class="form-label" for="form2Example2">Password</label>
            <input
              type="password"
              id="loginPassword-form"
              class="form-control"
              placeholder="Input your password"
              v-model="newCustomer.password"
            />
            <!-- Input Phone Number -->
            <label class="form-label" for="form2Example1">Phone Number</label>
            <input
              type="text"
              id="loginPhoneNumber-form"
              class="form-control"
              placeholder="Input your phone number"
              v-model="newCustomer.phoneNumber"
            />
            <!-- Input address -->
            <label class="form-label" for="form2Example1">Address</label>
            <input
              type="text"
              id="loginAddress-form"
              class="form-control"
              placeholder="Input your address"
              v-model="newCustomer.address"
            />
          </div>
          <div class="row justify-content-center">
            <button
              type="submit"
              class="btn btn-primary btn-block mb-4"
              style="width: 100px"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
