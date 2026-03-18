<template>
    <div class="app_wrapper">
        <slot></slot>
    </div>
</template>

<style>
body,
html {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

.app_wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    text-align: center;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}
</style>