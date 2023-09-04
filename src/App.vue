<template>
  <v-app>
    <DrawerCart />
    <DrawerFavorite />
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import NavBar from '@/components/NavBar.vue'
  import DrawerCart from '@/components/DrawerCart.vue'
  import DrawerFavorite from '@/components/DrawerFavorite.vue'
</script>