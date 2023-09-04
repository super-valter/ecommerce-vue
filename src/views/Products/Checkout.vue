<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="8">
                    <v-row>
                        <v-col>
                            SACOLA DE COMPRAS<br />
                            {{ productsListCart.length }} ITENS
                        </v-col>
                        <v-col v-if="productsListCart.length <= 0" cols="12">
                            Sua sacola está vazia
                        </v-col>
                        <template v-if="productsListCart.length <= 1">
                        <v-col cols="12" v-for="product in productsListCart" :key="product.id" >
                            <ProductCheckout :product="product" />
                        </v-col>
                        </template>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-row>
                        <v-col cols="12" class="pb-0">
                            <h2>Resumo</h2>
                        </v-col>
                        <v-col cols="12" class="d-flex">
                            Subtotal({{ totalCartItens }} itens)
                            <v-spacer class="ma-0" />
                            {{ MoneyFilter(totalCart) }}
                        </v-col>
                        <v-col cols="12" class="d-flex align-center">
                            Total
                            <v-spacer />
                            <div class="text-right">
                                {{ MoneyFilter(totalCartDiscount) }}<br />
                                deconto de {{ MoneyFilter(valueDiscount) }}
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <v-btn class="text-center bg-green" prepend-icon="mdi-cart" block>
                                Finalizar pedido
                            </v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-btn class="text-center" color="green" variant="outlined" to="/" block>
                                Continuar comprando
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script lang="ts" setup>
import { MoneyFilter } from '@/filters/money';
import store from '@/store/store';
import { computed } from 'vue';
import { ref } from 'vue';
import ProductCheckout from '@/components/ProductCheckout.vue';


const productsListCart = ref(computed(() => store.state['cartProducts']));
let totalCart = ref(computed(() => store.getters['totalCart']));
let totalCartDiscount = ref(computed(() => store.getters['totalCartdiscount']));
let totalCartdiscount = ref(computed(() => store.getters['totalCartdiscount']));
let totalCartItens = ref(computed(() => store.getters['totalCartitens']));
let valueDiscount = ref(computed(() => totalCart.value - totalCartdiscount.value));

</script>