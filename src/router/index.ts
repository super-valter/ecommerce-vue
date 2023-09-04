// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  {
    path: '/',
        name: 'Todos os Produtos',
        component: () => import( '@/views/Products/Products.vue'),
  },
  {
    path: '/item/:id',
    name: 'Produtos interno',
    component: () => import( '@/views/Products/Internal.vue'),
  },
  {
    path: '/categoria/:categoria',
    name: 'Produtos Categoria: ',
    component: () => import( '@/views/Products/Products.vue'),
  },
  {
    path: '/search/:serach',
        name: 'Busca Produto: ',
        component: () => import( '@/views/Products/Products.vue'),
  },
  {
   path: '/checkout',
   name: 'Sacola de Comprar',
   component: () => import('@/views/Products/Checkout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
