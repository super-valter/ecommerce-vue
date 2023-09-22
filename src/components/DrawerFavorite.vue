<template>
    <v-navigation-drawer v-model="drawer" location="right" width="500" class="pa-5"  disable-resize-watcher temporary>
        <v-btn @click="favoritosDrawer" prepend-icon="mdi-close" elevation="0" class="mb-2">
            Fechar
        </v-btn>
        <v-row>
            <v-col v-for="product in productsFavorite" :key="product" cols="12" class="mb-5">
                <v-row class="position-relative">
                    <v-btn @click="removeFavorite(product)" variant="text" icon="mdi-trash-can-outline" color="red-lighten-2" elevation="0" class="mb-2 position-absolute position-btn-deletar" />
                    <v-col>
                        <v-img :src="product.thumbnail" :width="200" :height="120" aspect-ratio="1/1" class="pointer" @click="productinterna(product.id)"></v-img>
                    </v-col>
                    <v-col>
                        <div class="font-weight-light text-primary">
                            {{ product.brand }}
                        </div>

                        <h3 class="font-weight-light mb-2 pointer" @click="productinterna(product.id)">
                            {{ product.title }}
                        </h3>

                        <div class="font-weight-light mb-2">
                            <span class="text-decoration-line-through text-disabled">
                                {{ MoneyFilter(product.price) }}</span>
                            -
                            {{
                                (DiscountPercentage(
                                    product.price,
                                    product.discountPercentage
                                ))
                            }}
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <br />
    </v-navigation-drawer>
</template>
  
<script lang="ts" setup>
import { DiscountPercentage } from '@/filters/DiscountPercentage';
import { MoneyFilter } from '@/filters/money';
import { IProducts } from '@/interfaces/IProducts';
import router from '@/router';
import store from '@/store/store';
import { ref } from 'vue';
import { computed } from 'vue';

const { commit, state } = store;
let drawer = computed({
    get() {
        return state['drawerFavoritos'];
    },
    set(value) {
        commit('drawerFavoritos', value);
    }
});
let productsFavorite = ref(computed(() => store.getters['searchLProductFavorite']));

const favoritosDrawer = () : void => {
    let drawerTemp = !drawer.value
    commit('drawerFavoritos', drawerTemp);
}
const productinterna = (id: number) : void => {
    const routerNext = `/item/${id}`
    router.push(routerNext)
}
const removeFavorite = ( product: IProducts ) : void =>{
    commit("removeFavorite", product);
}
</script>