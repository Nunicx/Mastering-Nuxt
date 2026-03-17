<script setup>
const route = useRoute()
const layoutName = computed(() => {
  return route.meta.layout || 'default'
})
</script>

<template>
  <div>
    <NuxtLayout :name="layoutName">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
