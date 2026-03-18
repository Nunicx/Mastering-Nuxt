<script setup>
const user = useSupabaseUser()
const title = "Home"
definePageMeta({
  layout: "default"
})
</script>

<template>
  <div class="welcome_container">
    <h1>{{ title }}</h1>
    <p>Bienvenido a mi página con Nuxt</p>
    <NuxtLink to="/course">Ir al curso</NuxtLink>
    <NuxtLink to="/login" v-if="!user">Iniciar sesión</NuxtLink>
  </div>
</template>

<style scoped>
.welcome_container {
  height: 100%;
  min-height: 60vh;
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ececec;
  align-self: center;
  margin: 0 auto;
  border-radius: 24px;
  transform: translateY(25%);
}

a {
  text-decoration: none;
  color: #000;
  padding: 10px;
  background-color: #ccc;
  border-radius: 12px;

  &:hover {
    background-color: #333;
    color: #fff;
  }
}
</style>