<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const props = defineProps({
  error: Object
})

const route = useRoute()
const router = useRouter()

onMounted(() => {
    router.replace('/product') 
})
</script>

<template>
<div class="flex justify-center items-center h-screen">
    <ProgressSpinner style="width: 300px; height: 300px" />

</div>
</template>