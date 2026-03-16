<script setup>
import { useCourse } from '~~/app/pages/composable/useCourse';
const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
    return course.chapters.find(
        (chapter) => chapter.slug === route.params.ChapterSlug
    );
});

const lesson = computed(() => {
    return chapter.value?.lessons.find(
        (lesson) => lesson.slug === route.params.LessonSlug
    );
});
</script>

<template>
    <div>
        <h1>{{ course.title }}</h1>
        <h3>{{ chapter.title }}</h3>
        <h5>{{ lesson.title }}</h5>
    </div>
</template>