<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';

export default {
    name: 'ProductCard',
    props: ['product'],
    methods: {
        ...mapActions(useIndexStore, ['addWishlist']),
        addToWishlist(productId) {
            this.addWishlist(productId)
        }
    },  
    computed: {
        ...mapState(useIndexStore, ['isLogin'])
    }
}
</script>

<template>

<div class="card mx-3 my-3" style="width: 18rem; background-color: honeydew;">
  <img class="card-img-top mt-4" :src="product.imgUrl" alt="Card image cap" style="height:150px">
  <div class="row justify-content-end mt-2" v-if="isLogin">
    <div class="col-2">
        <a href="" @click.prevent="addToWishlist(product.id)"><i class="fa-regular fa-star"></i></a>
    </div>
  </div>
  <div class="card-body">
    <h5 class="card-title">{{product.name}}</h5>
    <p class="card-text">{{product.description}}</p>
    <a class="btn btn-primary" @click.prevent="$router.push(`/pub/products/${product.id}`)">Detail</a><br>
    <!-- <a href="" @click.prevent="addToWishlist(product.id)">bukmark</a> -->
    
  </div>
</div>




</template>