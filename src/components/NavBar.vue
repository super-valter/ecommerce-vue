<template>
    <v-toolbar color="primary">
        <v-container class="my-6">
            <v-row>
                <v-col cols="2">
                    <v-btn class="text-none" stacked to="/">
                        <v-icon>mdi-home</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="10" md="4">
                    <v-form ref="formSearch" @submit.prevent="validate" v-model="form">
                        <v-text-field autocomplete="off" prepend-icon="mdi-magnify" hint="minimo de 4 caracteres" outlined
                            dense validate-on-blur label="o que você procura" v-model="searchProducts"
                            :rules="[(v: any) => !!v || 'Campo obrigatório', (v: any) => (v || '').length >= 4 || 'Min 4 characters']" />
                    </v-form>
                </v-col>
                <v-col class="d-flex align-center text-right">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props">
                                Categorias
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in categories" :key="index" :value="index"
                                :to="`/categoria/${item}`">
                                <v-list-item-title class="text-capitalize">{{ item.replace('-', ' ') }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
                <v-col class="text-right">
                    <v-btn class="text-none" stacked @click.stop="favoriteDrawer" :disabled="totalFavorite.length === 0">
                        <v-badge :content="totalFavorite.length" color="error">
                            <v-icon>mdi-heart</v-icon>
                        </v-badge>
                    </v-btn>

                    <v-btn class="text-none" stacked @click="cartDrawer" :disabled="totalCart.length === 0">
                        <v-badge :content="totalCart.length" color="error">
                            <v-icon>mdi-cart</v-icon>
                        </v-badge>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-toolbar>
</template>

<script lang="ts" setup>

import { computed } from 'vue';

import store from '@/store/store';
import { ref } from 'vue';
import Products from '@/services/Products';
import { onMounted } from 'vue';
import router from '@/router';


const { commit, getters } = store;
const categories = ref<[string]>();

const totalCart = ref(computed(() => getters['searchCartProducts']));
const totalFavorite = ref(computed(() => getters['searchLProductFavoriteId']));
let drawerCart = ref(computed(() => getters['drawerCart']));
let drawerFavoritos = ref(computed(() => getters['drawerFavoritos']));
let form = false;
let searchProducts = ref<string>('')

onMounted(async () : Promise<void> => {
    const reponseApi = await Products.categories();
    categories.value = reponseApi
});

const cartDrawer = () =>  {
    let drawerTemp = !drawerCart.value
    commit('drawerCart', drawerTemp);
}

const favoriteDrawer = () : void => {    
    if (totalFavorite.value.length === 0) return
    let drawerTemp = !drawerFavoritos.value
    commit('drawerFavoritos', drawerTemp);
}

const validate = () : void => {
    if (searchProducts.value.length > 4) {
        let routerNext = `/search/${searchProducts.value}`;
        router.push({ path: routerNext, query: { serach: searchProducts.value } })
    }
}

</script>