<template>
  <div class="fill-height">
    <!--  -->
    <v-card
      class="mx-auto"
      color="grey-lighten-4 fill-height"
      max-width="600"
    >
      <div
        class="text-primary bg-white ma-2 py-1 px-3 rounded text-caption position-discount-percentage">
        -{{ productItem.discountPercentage }}%
      </div>
      <v-img :aspect-ratio="9 / 8" cover :src="productItem.thumbnail" />
      <v-card-text class="pt-3 pb-0">
        <div class="font-weight-light text-primary">
          {{ productItem.brand }}
        </div>
        
        <h3 class="font-weight-light mb-2" :to="`/item/${productItem.id}`">
          {{ productItem.title }}
        </h3>

        <div class="font-weight-light mb-2">
          <span class="text-decoration-line-through text-disabled">
            {{ MoneyFilter(productItem.price) }}</span
          >
          -
          {{
            DiscountPercentage(
              productItem.price,
              productItem.discountPercentage
            )
          }}
        </div>
        <div class="d-flex">
          <v-btn size="small" variant="outlined" class="text-caption" @click="productinterna(productItem.id)" prepend-icon="mdi-plus">
            Mais Detalhes
          </v-btn>
          <v-spacer />
          <v-btn size="small" variant="outlined" class="text-caption" @click="addCart()" prepend-icon="mdi-cart-plus">
            Comprar
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions class="pt-0 pl-4">
        <div class="text-right">
          <v-icon color="yellow-darken-2" size="small" icon="mdi-star" />
          {{ product.rating.toFixed(1) }}
        </div>
        <v-spacer />
        <v-btn
          size="small"
          variant="text"
          icon="mdi-heart"
          :class="productFavorite && 'text-green'"
          @click="productFavoriteDefine(product, productFavorite)"
        />
      </v-card-actions>
    </v-card>
    <!--  -->
  </div>
</template>

<script lang="ts" setup>
import { DiscountPercentage } from "@/filters/DiscountPercentage";
import { MoneyFilter } from "@/filters/money";
import type { IProducts } from "@/interfaces/IProducts";
import router from "@/router";
import store from "@/store/store";
import { ref } from "vue";

const props = defineProps<{ product: IProducts }>();
const productItem = props.product;
let productFavorite = ref<boolean>(false);
const { commit, state } = store;

const listProductFavoriteStorage = state.listProductFavoriteId.filter(
  (value: number) => value === productItem.id
);

if (listProductFavoriteStorage.length) productFavorite.value = true;

const productFavoriteDefine = (products: IProducts, status: boolean) : void => {
  productFavorite.value = !productFavorite.value;
  if (!status) commit("addFavorite",products);
  if (status) commit("removeFavorite", products);
}

const addCart = () : void => {
  store.dispatch('addCart', productItem);
}
const productinterna = (id: number) : void => {
    const routerNext = `/item/${id}`
    router.push(routerNext)
}
</script>
