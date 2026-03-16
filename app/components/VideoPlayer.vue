<template>
    <div class="video-wrapper">
        <iframe :src="`https://player.vimeo.com/video/${videoId}?h=000000`" 
        title="Video Player" 
        frameborder="0"
        webkitallowfullscreen 
        mozallowfullscreen 
        allowfullscreen></iframe>
    </div>
</template>

<script setup lang="ts">
defineProps({
    videoId: { type: String, required: true },
});
</script>

<style scoped>
.video-wrapper {
    width: 100%;
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>