<script setup>      //Por que tengo que importarlos?
const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
    return course.chapters.find(
        (chapter) => chapter.slug === route.params.ChapterSlug
    );
});

const lesson = computed(() => {
    return chapter.value.lessons.find(
        (lesson) => lesson.slug === route.params.LessonSlug
    );
});
</script>

<template>
    <div>
        <h1>{{ course.title }}</h1>
        <p>{{ course.description }}</p>
        <h3>{{ chapter.title }}</h3>
        <p>{{ chapter.description }}</p>
        <div v-if="lesson">
            <h4>{{ lesson.title }}</h4>
            <p>{{ lesson.description }}</p>
            <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" :key="lesson.videoId" />
            <p v-else>No video</p>
        </div>

    </div>
</template>