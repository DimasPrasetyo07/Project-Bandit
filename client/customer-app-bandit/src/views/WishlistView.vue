<script>
import { mapActions, mapState} from 'pinia';
import WishlistCard from '../components/WishlistCard.vue';
import { useIndexStore } from '../stores';


export default {
    name: "WishlistView",
    data() {
        return {

        };
    },
    components: {
        WishlistCard
    },
    methods: {
        ...mapActions(useIndexStore, ['fetchAllWishlist', 'checkLogin']),
        anyWishlist() {
          if(this.allWishlist.length > 0) {
            this.checkWishlist = true
          } else {
            this.checkWishlist = false
          }
        }
    },
    computed: {
        ...mapState(useIndexStore, ['allWishlist']),
    },
    created() {
        this.checkLogin()
        this.fetchAllWishlist()
    },

}
</script>

<template>
      <div class="container text-center mt-5">
    <div class="row">
      <WishlistCard 
      v-for="wishlist in allWishlist" :key="wishlist.id" :wishlist="wishlist"
      />
    </div>

  </div>
</template>