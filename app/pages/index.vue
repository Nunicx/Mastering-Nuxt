<script setup>
const user = useSupabaseUser()
const course = await useCourse();
const title = course.value?.title
definePageMeta({
  layout: "default"
})
const firstLesson = await useFirstLesson();
</script>

<template>
  <div class="welcome_container">
    <h1>{{ title }}</h1>
    <p>Bienvenido a nuestro curso "<strong>{{ title }}</strong>". Aquí no aprenderás gran cosa ya que no pone nada realmente y es el mismo video todo el rato.</p>
    <NuxtLink :to="firstLesson.path">Ir al curso</NuxtLink>
    <NuxtLink to="/login" v-if="!user">Iniciar sesión</NuxtLink>
    <NuxtLink to="/buy">Comprar curso</NuxtLink>
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
  gap: 1em;
}

p{
  max-width: 60%;
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