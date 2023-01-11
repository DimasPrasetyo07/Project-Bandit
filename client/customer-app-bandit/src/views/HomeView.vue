<script>
import { mapActions, mapState, mapStores } from "pinia";
import { useIndexStore } from "../stores";
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "HomeView",
  components: {
    ProductCard,
  },
  data() {
    return {
      searchBar: "",
    };
  },
  methods: {
    ...mapActions(useIndexStore, ["fetchAllProducts", "checkLogin"]),
    getProducts() {
      this.fetchAllProducts(this.currentPage, this.searchBar);
    },
    clearButton() {
      this.searchBar = "";
      this.fetchAllProducts(this.currentPage);
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState(useIndexStore, ["allProducts", "totalPage", "currentPage"]),
  },
  created() {
    this.fetchAllProducts(this.currentPage, this.searchBar);
    this.checkLogin();
  },
};
</script>

<template>
  <div class="d-flex justify-content-center mx-3 my-3">
    <h1>Welcome To Bandit Exclusive Store</h1>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-3">
        <form class="search-form" @submit.prevent="getProducts">
          <div class="form-group has-feedback">
            <input
              type="text"
              class="form-control"
              name="search"
              id="search"
              placeholder="Seach with Gundam name"
              v-model="searchBar"
            />
            <span
              class="glyphicon glyphicon-search form-control-feedback"
            ></span>
            <button
              type="submit"
              class="btn btn-success my-2"
              style="width: 100px"
            >
              Search
            </button>
            <button
              type="button"
              class="btn btn-secondary mx-2 my-2"
              style="width: 100px"
              @click.prevent="clearButton"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container text-center mt-5">
    <div class="row">
      <ProductCard
        v-for="product in allProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <nav aria-label="..." class="mt-5 justify-content-center">
      <ul class="pagination">
        <!-- Looping total page pake index -->
        <li v-for="index in totalPage" class="page-item">
          <a
            @click.prevent="fetchAllProducts(index)"
            href=""
            class="page-link"
            >{{ index }}</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>
