<template>
    <div>
        <v-carousel hide-delimiter-background delimiter-icon="mdi-square" height="350">
            <v-carousel-item v-for="(img, index) in imagesCarousel" :key="index" class="bg-black">
                <v-img :src="img" :aspect-ratio="1" cover></v-img>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

const props = defineProps<{ imagesCarousel: string[] | undefined }>();
const imagesCarousel2 = ref();

onMounted(async () : Promise<void> => {
    imagesCarousel2.value = props.imagesCarousel
});
</script>