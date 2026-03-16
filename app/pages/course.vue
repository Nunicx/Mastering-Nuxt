<script setup lang="ts">

</script>

<template>
    <div id="course_wrapper">
        <h3>Course: <strong>Mastering Nuxt</strong></h3>
        <div id="content">
            <div id="chapters">

            </div>
            <div id="lessons">
                <NuxtPage />
            </div>
        </div>

    </div>

</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}

#course_wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    text-align: center;

    h1{
        margin-top:1em;
    }
}

#content {
    display: flex;
    flex-direction: row;
    gap: 2em;
    min-height: 100vh;
    height: fit-content;
    margin-top: 3em;
    padding: 0 2em;

    #chapters {
        background-color: #ededed;
        width: 30%;
        min-height: 80vh;
        height: 100%;
    }

    #lessons {
        background-color: #ededed;
        width: 70%;
        min-height: 80vh;
        height: 100%;
    }
}
</style>