<template>
  <div>
    <v-container class="my-6">
      <v-row class="mb-2">
        <v-col cols="12">
          <h1>{{ currentRoute }} <span class="text-capitalize">{{ categorieProduct }}</span></h1>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-progress-linear :active="isLoding" indeterminate color="primary" />
        </v-col>
        <v-col cols="12" class="py-0" v-if="!(products?.length != 0 && !isLoding)">
          <span :class="!isLoding">Nenhum produto encontrado</span>
        </v-col>
        <v-col cols="12" sm="6" md="4" v-for="product in products" :key="product.id" :loading="true">
          <ProductIten :product="product" />
        </v-col>
      </v-row>
      <v-pagination v-if="totalProduct > 20" v-model="pagination" :length="qtdPagination" rounded="circle" @click="next" />
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { IProducts } from "@/interfaces/IProducts";
import ProductIten from "@/components/ProductIten.vue"
import store from "@/store/store";
import router from '@/router';

let products = ref<IProducts[]>();
const routerSite = ref(router);
let categorieProduct = ref<string[] | string>();
let isLoding = ref<boolean>(true);
let pagination = ref<number>(1);
let totalProduct = ref(computed(() => store.getters['totalProdutos']));
let qtdPagination = ref(computed(() => totalProduct.value / 20));
const currentRoute = computed(() => {
  searchCartProducts();
  return routerSite.value.currentRoute.name
})

const next = () : void => {
    let pagePagination = ref(computed(() => (pagination.value - 1) * 20));
    searchCartProducts(pagePagination.value);
}

 const searchCartProducts = async (pagePagination: number = 0) : Promise<void> => {
  isLoding.value = true
  let productCategory = ref<string[] | string>(routerSite.value.currentRoute.params['categoria']);
  let productSearch = ref<string[] | string>(routerSite.value.currentRoute.params['serach']);

  if (productCategory.value != undefined) {
    await store.dispatch('setProductsCategory', productCategory.value);
    isLoding.value = false
    defineNameCategorie(productCategory.value)
    defineProducts()
    return
  }

  if (productSearch.value != undefined) {
    await store.dispatch('setProductsSearch', productSearch.value);
    isLoding.value = false
    defineNameCategorie(productSearch.value)
    defineProducts()
    return
  }

  if (productCategory.value == undefined) {
    await store.dispatch('setProducts', pagePagination);
    isLoding.value = false
    defineNameCategorie()
    defineProducts()
    return
  }
}

const defineNameCategorie = (nameCategorie: string[] | string = '') : void => {
  categorieProduct.value = nameCategorie.toString().replace('-', ' ');
}

const defineProducts = () : void => {  
  const productsList = computed(() => store.state['products']);
  products.value = [...productsList.value];
}

</script>