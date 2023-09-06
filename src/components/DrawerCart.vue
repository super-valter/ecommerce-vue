<template>
    <v-navigation-drawer v-model="drawer" location="right" width="500" class="pa-5" temporary disable-resize-watcher>
        <v-btn @click="cartDrawer" prepend-icon="mdi-close" elevation="0" class="mb-2">
            Fechar
        </v-btn>
        <v-row>
            <v-col v-for="product in productsListCart" :key="product" cols="12" class="mb-5">
                <v-row>
                    <v-col>
                        <v-img :src="product.thumbnail" :width="200" :height="120" aspect-ratio="1/1" @click="productinterna(product.id)" class="pointer"></v-img>
                    </v-col>
                    <v-col>
                        <div class="font-weight-light text-primary">
                            {{ product.brand }}
                        </div>

                        <h3 class="font-weight-light pointer" @click="productinterna(product.id)">
                            {{ product.title }}
                        </h3>
                        Valor: {{ MoneyFilter(product.price) }}
                        <div class="font-weight-light">
                            Quantidade: {{ product.qtd }}
                        </div>
                        <div class="font-weight-light pt-0 mb-2">
                            <span class="text-decoration-line-through text-disabled">
                                {{ MoneyFilter(product.price * product.qtd) }}</span>
                            -
                            {{
                                (DiscountPercentage(
                                    product.price * product.qtd,
                                    product.discountPercentage
                                ))
                            }}
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" class="pb-0 text-decoration-line-through text-disabled">Total: {{ MoneyFilter(totalCart) }}</v-col>
            <v-col class="text-h6 font-weight-regular pt-0" cols="12">
                Total com desconto: {{ MoneyFilter(totalCartDiscount) }}
            </v-col>
            <v-col>
            <v-btn class="text-center bg-green" prepend-icon="mdi-cart" to="/checkout" block >
                Ir para a Sacola
              </v-btn>
            </v-col>
        </v-row>
        <br />
    </v-navigation-drawer>
</template>
  
  
<script lang="ts" setup>
import { DiscountPercentage } from '@/filters/DiscountPercentage';
import { MoneyFilter } from '@/filters/money';
import router from '@/router';
import store from '@/store/store';
import { ref } from 'vue';
import { computed } from 'vue';

const { commit, state } = store;
let drawer = computed({
    get(): boolean {
        return state['drawerCart'];
    },
    set(value) {
        commit('drawerCart', value);
    }
})

const productsListCart = ref(computed(() => store.state['cartProducts']));
let totalCart = ref(computed((): number => store.getters['totalCart']));
let totalCartDiscount = ref(computed((): number => store.getters['totalCartdiscount']));

function cartDrawer() {
    let drawerTemp = !drawer.value
    commit('drawerCart', drawerTemp);
}

function productinterna(id: number) {
    const routerNext = `/item/${id}`
    router.push(routerNext)
}
</script>