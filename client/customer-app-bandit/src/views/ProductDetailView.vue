<script>
import { mapActions, mapState, mapStores } from "pinia";
import { useIndexStore } from "../stores";

export default {
  name: "ProductDetailView",
  data() {
    return {
      productId: this.$route.params.id,
      
    };
  },
  methods: {
    ...mapActions(useIndexStore, ["fetchProductDetail", "getQrCode"]),
  },
  computed: {
    ...mapState(useIndexStore, ["singleProduct", "qrCode"]),
    formatIdr() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(this.singleProduct.price);
    },
  },
  created() {
    this.fetchProductDetail(this.productId);
    this.getQrCode(this.$route.params.id);
  },
};
</script>

<template>
  <div class="container mt-5 mb-5 pt-2 pb-2">
    <div class="border bg-danger bg-opacity-25 rounded">
      <div class="row mt-3">
        <div class="col-6">
          <div class="mx-5 my-5">
            <img :src="singleProduct.imgUrl" style="width: 500px" />
          </div>
        </div>

        <div class="col-6 mt-5">
          <h2>
            {{ singleProduct.name }}
          </h2>
          <p>{{ singleProduct.description }}</p>
          <ul>
            <li>
              <p>
                <strong>Price:</strong><br />
                {{ formatIdr }}
              </p>
            </li>
            <li>
              <p>
                <strong>Stock:</strong><br />
                {{ singleProduct.stock }}
              </p>
            </li>
            <li>
              <p>
                <strong>Status:</strong><br />
                {{ singleProduct.status }}
              </p>
            </li>
          </ul>
          <br />
          <div class="row justify-content-end" >
            <div class="card qr mx-5 my-5 bg-danger bg-opacity-25 rounded" style="width:200px">
              <p class="m-2" style="text-align: center" >Share QR Code</p>
              <img :src="qrCode.qrcode" alt="" class="mb-3 ms-3 me-3" />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
