<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-breadcrumbs :items="breadcrumbsItem" divider="/" class="text-capitalize" />
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <v-carousel hide-delimiter-background delimiter-icon="mdi-square" height="350">
            <v-carousel-item v-for="(img, index) in imgTeste" :key="index" class="bg-black">
              <v-img :src="img" :aspect-ratio="1" cover></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-row>
            <v-col cols="12" class="pb-0">
              <h3 class="font-weight-regular text-capitalize">
                <span>{{ product?.category.replace('-', ' ') }}</span> / {{ product?.brand }}
              </h3>
            </v-col>
            <v-col cols="12" class="py-0">
              <h1>
                {{ product?.title }}
              </h1>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-rating v-model="rating" half-increments readonly color="primary" class="pl-0"></v-rating>
            </v-col>
            <v-col cols="12" class="py-0">
              <h4 class="text-decoration-line-through text-disabled mb-1">
                {{ MoneyFilter(product?.price) }}
              </h4>
            </v-col>
            <v-col cols="12" class="py-0">
              <h2 class="font-weight-regular">
                {{ DiscountPercentage(product?.price, product?.discountPercentage) }}
                <span class="text-red text-h6 font-weight-regular">
                  -{{ product?.discountPercentage }}%
                </span>
              </h2>
            </v-col>
            <v-col cols="12" class="mt-3 py-2 bg-amber-lighten-5 text-center text-blue-grey-lighten-1">
              <v-icon color="white" icon="mdi-alert-octagon-outline" />
              Restam {{ product?.stock }} itens
            </v-col>
            <v-col cols="12">
              <v-btn class="text-center bg-green" prepend-icon="mdi-cart" block @click="addCart()">
                Comprar
              </v-btn>
            </v-col>
            <v-col cols="12" class="pt-1">
              <v-btn class="text-center bg-blue-grey-lighten-1" prepend-icon="mdi-heart" block @click="addCart()">
                Favorito
              </v-btn>
            </v-col>
            <v-col cols="12" class="py-0"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <h6 class="text-h5 font-weight-regular text-capitalize">
            Descrição
          </h6>
          <p>
            {{ product?.description }}
          </p>
        </v-col>
        <v-col cols="12">
          <h6 class="text-h5 font-weight-regular text-capitalize">
            Categoria {{ product?.category }}
          </h6>
          <v-row class="mt-2">
            <v-col cols="12" sm="6" md="4" v-for="product in productCategorie" :key="product.id" >
              <ProductIten :product="product" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import router from "@/router";
import Products from "@/services/Products";
import type { IProducts, breadcrumbs } from "@/interfaces/IProducts";
import { MoneyFilter } from "@/filters/money";
import { DiscountPercentage } from "@/filters/DiscountPercentage";
import store from "@/store/store";
import ProductIten from "@/components/ProductIten.vue";

let product = ref<IProducts>();
let productCategorie = ref<IProducts[]>();
let rating = ref<number>();

const breadcrumbsItem = ref<Array<breadcrumbs>>([
  {
    title: 'Produtos',
    disabled: false,
    href: '/',
  },
  {
    title: '',
    disabled: false,
    href: '',
  },
  {
    title: '',
    disabled: true,
    href: '',
  },
])

const imgTeste = ref(
  ["https://i.dummyjson.com/data/products/1/1.jpg", "https://i.dummyjson.com/data/products/1/2.jpg", "https://i.dummyjson.com/data/products/1/3.jpg", "https://i.dummyjson.com/data/products/1/4.jpg", "https://i.dummyjson.com/data/products/1/thumbnail.jpg"]
)

onMounted(async () => {
  /* Produto */
  const productId = Number(router.currentRoute.value.params.id);
  const reponseApi = await ref<IProducts>(await Products.productsitem(productId));
  product.value = reponseApi.value;
  rating.value = product.value.rating;

  breadcrumbsItem.value[1].title = product.value.category.replace('-', ' ')
  breadcrumbsItem.value[1].href = `/categoria/${product.value.category}`
  breadcrumbsItem.value[2].title = product.value.title;

  /* Produtos Categoria */
  const categorieId = ref<string>(product.value.category);
  const categorieApi = ref<IProducts[]>(await Products.productCategories(categorieId.value));
  productCategorie.value = [...categorieApi.value];
});

function addCart() {
  store.dispatch('addCart', product.value);
}
</script>