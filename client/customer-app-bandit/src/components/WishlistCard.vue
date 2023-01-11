<script>

export default{
    name: 'WishlistCard',
    props: ['wishlist']
}

</script>

<template>

<!-- <h1>GAK ADA WISHLIST NGAB, TAMBAHIN GIH</h1> -->

<div class="card mx-3 my-3" style="width: 18rem;">
  <img class="card-img-top mt-4" :src="wishlist.Product.imgUrl" alt="Card image cap" style="height:150px">
  <div class="card-body">
    <h5 class="card-title">{{wishlist.Product.name}}</h5>
    <p class="card-text">{{wishlist.Product.description}}</p>
    <a class="btn btn-primary" @click.prevent="$router.push(`/pub/products/${wishlist.Product.id}`)">Detail</a>
  </div>
</div>

</template>