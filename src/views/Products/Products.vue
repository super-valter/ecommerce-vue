<template>
  <div>
    <v-container class="my-6" id="topPage">
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
      <v-pagination v-if="totalProduct > 20" v-model="pagination" :length="qtdPagination" rounded="circle"
        @click="paginationState" />
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { IProducts, IReponseApiProdutos } from "@/interfaces/IProducts";
import ProductIten from "@/components/ProductIten.vue"
import router from '@/router';
import Products from '@/services/Products';

let products = ref<IProducts[]>();
const routerSite = ref(router);
let categorieProduct = ref<string[] | string>();
let isLoding = ref<boolean>(true);
let pagination = ref<number>(1);
let totalProduct = ref(0);
let qtdPagination = ref(computed(() => totalProduct.value / 20));
const currentRoute = computed(() => {
  searchListProducts();
  return routerSite.value.currentRoute.name
})

const paginationState = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  let pagePagination = ref(computed(() => (pagination.value - 1) * 20));
  searchListProducts(pagePagination.value);
}

const searchListProducts = async (pagePagination: number = 0): Promise<void> => {
  isLoding.value = true
  let productCategory = ref<string[] | string>(routerSite.value.currentRoute.params['categoria']);
  let productSearch = ref<string[] | string>(routerSite.value.currentRoute.params['serach']);

  try {

    if (productCategory.value != undefined) {
      const reponseApi = ref<IReponseApiProdutos>(await Products.productAllCategories(productCategory.value.toString(), pagePagination));
      totalProduct.value = reponseApi.value.total
      products.value = [...reponseApi.value.products];
      defineNameCategorie(productCategory.value)
      isLoding.value = false
      return
    }

    if (productSearch.value != undefined) {
      const reponseApi = ref<IReponseApiProdutos>(await Products.productAllSearch(productSearch.value.toString(), pagePagination));
      totalProduct.value = reponseApi.value.total
      products.value = [...reponseApi.value.products];
      defineNameCategorie(productSearch.value)
      isLoding.value = false
      return
    }

    if (productCategory.value == undefined) {
      const reponseApi = ref<IReponseApiProdutos>(await Products.productsAll(pagePagination));
      totalProduct.value = reponseApi.value.total
      products.value = [...reponseApi.value.products];
      defineNameCategorie()
      isLoding.value = false
      return
    }
  } catch (error) {
    console.log(error);

  }
}

const defineNameCategorie = (nameCategorie: string[] | string = ''): void => {
  categorieProduct.value = nameCategorie.toString().replace('-', ' ');
}

</script>