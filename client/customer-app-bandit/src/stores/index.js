import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'
// const baseUrl = 'https://projek-bandit.herokuapp.com'
const deployUrl = 'https://bandit-on-vue-partii.web.app'
const baseUrl = 'http://localhost:3000'

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      allProducts: [],
      allWishlist: [],
      totalPage: 0,
      isLogin: false,
      currentPage: 1,
      singleProduct: {},
      // customerName: ''
      qrCode : {},
    }
  },
  getters: {

  },
  actions: {
    async handleLogin(customer) {
      try {
        let { data } = await axios({
          method: 'post',
          url: `${baseUrl}/pub/login`,
          data: {
            email: customer.email,
            password: customer.password
          }
        })
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('id', data.id)
        localStorage.setItem('name', data.username)
        localStorage.setItem('role', data.role)
        await this.fetchAllProducts(1)
        // this.customerName = data.username
        this.checkLogin()
        Swal.fire({
          icon: "success",
          text: "Login Success",
        });
        this.router.push('/')
      } catch (error) {
        // console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
        });
      }
    },
    async handleRegister(customer) {
      try {
        let data = await axios({
          method: 'post',
          url: `${baseUrl}/pub/customers`,
          data: {
            username: customer.username,
            email: customer.email,
            password: customer.password,
            phoneNumber: customer.phoneNumber,
            address: customer.address
          }
        })
        Swal.fire({
          icon: "success",
          text: "Register Success",
        });
        this.router.push('/login')
      } catch (error) {
        // console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
        });
      }
    },
    checkLogin() {
      if(localStorage.getItem('access_token')) {
        this.isLogin = true
      }
    },
    handleLogout() {
      // localStorage.clear()
      // this.isLogin = false
      // this.router.push('/')
      Swal.fire({
        title: "Are you sure want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Success Log out!");
          localStorage.clear()
          this.isLogin = false
          this.router.push('/')
        }
      });
    },
    async fetchAllProducts(page, search) {
      // console.log(page, '<<<<<<')
      let query
      if (page) {
        query = `?page=${page}`
      }
      if (search) {
        query = `?search=${search}`
      }
      if (page && search) {
        query = `?page=${page}&search=${search}`
      }
      // console.log(query, '<<<<<')
      let urlBar = `${baseUrl}/pub/products${query}`
      try {
        let {data} = await axios({
          method: 'get',
          // url: `${baseUrl}/pub/products`
          url: urlBar
        })
        // console.log(data)
        this.allProducts = data.rows
        this.totalPage = Math.ceil(data.count / 8)
        this.router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    async fetchProductDetail(productId) {
      try {
          let {data} = await axios({
            method: 'get',
            url: `${baseUrl}/pub/products/${productId}`
          })
          // console.log('uji coba', '========')
          this.singleProduct = data
          // console.log(this.singleProduct, '======')
      } catch (error) {
        console.log(error)
      }
    },
    async fetchAllWishlist() {

      try {
        let {data} = await axios({
          method: 'get',
          url: `${baseUrl}/pub/wishlist`,
          headers: {
            access_token: localStorage.access_token
        }
        })
        // console.log(data)
        this.allWishlist = data
      } catch (error) {
        console.log(error)
      }
    },
    async addWishlist(productId) {
      try {
        let {data} = await axios({
          method: 'post',
          url: `${baseUrl}/pub/wishlist/${productId}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        // console.log('sukses add favorit')
        Swal.fire({
          icon: "success",
          text: "Success add this product to Wish List",
        });
        this.router.push('/wishlist')
      } catch (error) {
        // console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
        });
      }
    },
    async handleCredentialResponse(response) {
      try {
        const dataGoogle = await axios({
          url: `${baseUrl}/pub/google-login`,
          method: "POST",
          headers: {
            google_token: response.credential,
          },
        });
        localStorage.setItem("access_token", dataGoogle.data.access_token);
        localStorage.setItem("name", dataGoogle.data.username);
        localStorage.setItem("role", dataGoogle.data.role);
        localStorage.setItem("id", dataGoogle.data.id);
        Swal.fire({
          icon: "success",
          text: "Login Success",
        });
        this.checkLogin()
        this.fetchAllProducts(1)
        this.router.push('/')
      } catch (error) {
        // console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
        });
      }
    },
    async getQrCode (productId) {
      try {
        const {data} = await axios({
          method: 'get',
          url: `https://api.happi.dev/v1/qrcode?data=https://bandit-on-vue-partii.web.app/pub/products/${productId}`,
          headers: {
            "x-happi-key": "e80974u6CbvTotfvwZBzbqYjp833lMoFcoihp9mx1ifvxi3oR45uAUks"
          }
        })
        this.qrCode = data
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
        });
      }
    },
  }
  

})
