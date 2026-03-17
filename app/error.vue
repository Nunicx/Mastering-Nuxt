<template>
    <NuxtLayout >
        <div>
            <h1>Oh, dang it!</h1>
            <p v-if="error.status == '404'">It look like that page doesn't exist</p>
            <p v-if="error.status == '500'">Something went wrong</p>
            <p>Status Code: {{ error.status }}</p>
            <p>Error: {{ error.message }}</p>
            <p v-if="error.status == '404'">What you're looking for is probably around here:</p>
            <NuxtLink to="/">Go back home</NuxtLink>
        </div>
    </NuxtLayout>
</template>

<script setup>
const error = useError();
</script>

<style scoped>
    a{
        border-radius: 12px;
        background-color: red;
        color: white;
        padding: 10px;
        text-decoration: none;
    }
</style>