<template>
  <div class="fill-height">
    <v-row>
      <v-col cols="4">
        <v-img :aspect-ratio="1 / 1" borde="1" width="120" height="120" cover :src="productItem.thumbnail" />
      </v-col>
      <v-col cols="8" class="position-relative">
        <v-btn class="mx-2 position-absolute position-btn-deletar" variant="text" icon="mdi-trash-can-outline" color="red-lighten-2" @click="cartProductRemove" />
        <v-row>
          <v-col cols="12" class="py-0 d-flex">
            {{ productItem.brand }}
            <v-spacer class="ma-0" />

          </v-col>
          <v-col cols="12" class="pb-0">
            {{ productItem.title }} - {{ MoneyFilter(productItem.price) }}
          </v-col>
          <v-col>
            <span class="text-decoration-line-through text-disabled">
              {{ MoneyFilter(totalCart) }}</span>
            -
            {{
              DiscountPercentage(
                totalCart,
                productItem.discountPercentage
              )
            }}
          </v-col>
          <v-col cols="12" class="py-0">
            <v-btn class="mx-2" variant="text" v-if="product.qtd > 1" icon="mdi-minus" color="red-lighten-2"
              @click="qtdCartMinus" />
            <v-btn class="mx-2" variant="text" v-if="product.qtd <= 1" icon="mdi-minus" color="red-lighten-2"
              @click="cartProductRemove" />
            {{ product.qtd }}
            <v-btn class="mx-2" variant="text" icon="mdi-plus" color="green-lighten-2" @click="qtdCartPlus" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <hr class="my-5">
  </div>
</template>
  
<script lang="ts" setup>
import { DiscountPercentage } from "@/filters/DiscountPercentage";
import { MoneyFilter } from "@/filters/money";
import type { IProductsCart } from "@/interfaces/IProducts";
import store from "@/store/store";
import { computed } from "vue";
import { ref } from "vue";

const props = defineProps<{ product: IProductsCart }>();
const productItem = props.product;
const { dispatch } = store;
let totalCart = ref(computed(() => productItem.price * productItem.qtd));

function qtdCartMinus() {
  dispatch("altQtdCartMinus", productItem.id);
}

function qtdCartPlus() {
  dispatch("altQtdCartPlus", productItem.id);
}

function cartProductRemove() {
  dispatch('cartProductRemove', productItem.id);
}

</script>
  