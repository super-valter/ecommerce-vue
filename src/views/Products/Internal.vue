<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-breadcrumbs :items="breadcrumbsItem" divider="/" class="text-capitalize" />
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <Carousel v-if="product?.images" :imagesCarousel="product?.images" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-row>
            <v-col cols="12" class="pb-0">
              <h3 class="font-weight-regular text-capitalize"> {{ productId }}
                <span>{{ product?.category.replace('-', ' ') }}</span> / {{ product?.brand }}
              </h3>
            </v-col>
            <v-col cols="12" class="py-0">
              <h1>
                {{ product?.title }}
              </h1>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-rating v-model="productRating" half-increments readonly color="primary" class="pl-0"></v-rating>
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
              <v-btn class="text-center bg-green" prepend-icon="mdi-cart" block @click="cartProductAdd()">
                Comprar
              </v-btn>
            </v-col>
            <v-col cols="12" class="pt-1">
              <v-btn class="text-center" prepend-icon="mdi-heart" block elevation="0"
                @click="productFavoriteDefine(productFavorite)" :class="productFavorite ? 'text-green' : 'bg-blue-grey-lighten-1'">
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
            <v-col cols="12" sm="6" md="4" v-for="product in productsCategorie" :key="product.id">
              <ProductIten :product="product" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router";
import Products from "@/services/Products";
import type { IProducts, breadcrumbs } from "@/interfaces/IProducts";
import { MoneyFilter } from "@/filters/money";
import { DiscountPercentage } from "@/filters/DiscountPercentage";
import store from "@/store/store";
import ProductIten from "@/components/ProductIten.vue";
import Carousel from "@/components/Carousel.vue"
import { computed } from "vue";

const { commit, state } = store;
let product = ref<IProducts>();
//  ref({} as IProducts);
let productsCategorie = ref<IProducts[]>();
let productRating = ref<number>();
let productFavorite = ref<boolean>(false);
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
]);


const productId =  ref(computed(() => {
  const idProduct = Number(router.currentRoute.value.params.id)
  setProducts(idProduct)  
  return idProduct
}));

const setProducts = async (idProduct: number) : Promise<void> => {
  const reponseApi = await ref<IProducts>(await Products.productsitem(idProduct));
  product.value = reponseApi.value;
  productRating.value = product.value.rating;
  defineBreadCrumbs(product.value.category, product.value.title)
  checkFavorite()
  setProductsCategory(product.value.category)
}

const setProductsCategory = async (category : string) : Promise<void> => {
  const categorieApi = ref<IProducts[]>(await Products.productsCategories(category));  
  filterRemoveProduct(categorieApi.value)
}

const cartProductAdd = () : void => {
  store.dispatch('cartProductAdd', product.value);
}

const productFavoriteDefine = (status: boolean) : void => {
  productFavorite.value = !productFavorite.value; 
  if (!status) commit("addFavorite", product.value);
  if (status) commit("removeFavorite", product.value);
}

const filterRemoveProduct = (produtcts: IProducts[]) : void => {
  const checkProduto = produtcts.filter((productFilter: IProducts) => productFilter.id != product.value?.id)
  if(checkProduto.length === 4){
    productsCategorie.value = checkProduto.slice(0, -1)
    return
  } 
  productsCategorie.value = checkProduto
}

const defineBreadCrumbs = (category: string, title: string) : void => {
  breadcrumbsItem.value[1].title = category.replace('-', ' ')
  breadcrumbsItem.value[1].href = `/categoria/${category}`
  breadcrumbsItem.value[2].title = title;
}
const checkFavorite = () : void => {
  productFavorite.value = false;
  const listProductFavoriteStorage = state.listProductFavoriteId.filter((value: number) => value === product.value?.id)
  if (listProductFavoriteStorage.length) productFavorite.value = true;
}
</script>