<script setup>
import { useCourseProgress } from '@/stores/courseProgress';
import { SupabaseClient } from '@supabase/supabase-js';
import back from "@/assets/images/back.png";
const course = await useCourse();
const route = useRoute();
const { ChapterSlug, LessonSlug } = route.params;
const lesson = await useLesson(ChapterSlug, LessonSlug);
const store = useCourseProgress();
const user = useSupabaseUser();
const { initialize, toggleComplete} = store;
const isCompleted = store.isCompleted;

initialize();

  const isLessonCompleted = isCompleted(ChapterSlug, LessonSlug);

definePageMeta({
    middleware: [
        async function ({ params }, from) {
            const course = await useCourse();

            const chapter = course.chapters?.find(
                (chapter) => chapter.slug === params.ChapterSlug
            );

            const lesson = chapter?.lessons?.find(
                (lesson) => lesson.slug === params.LessonSlug
            );

            //Esto salta error siempre y no se por que 
            // if (!chapter || !lesson) {
            //     throw createError({
            //         statusCode: 404,
            //         statusMessage: 'Chapter or lesson not found'
            //     });
            // }
        },
        'auth'
    ]
});

const chapter = computed(() => {
    return course.chapters?.find(
        (chapter) => chapter.slug === route.params.ChapterSlug
    );
});

const title = computed(() => {
    return 'Lesson ' + chapter.value?.title + '-' + lesson.value?.slug
})

useHead({
    title: title
})


//Vueuse para localStorage:
// npm i @vueuse/nuxt @vueuse/core

// if(route.params.LessonSlug == '2' && route.params.ChapterSlug == '2') {
//     throw createError({
//          fatal:true,
//          message: 'You have reached the end of the course'
//     });
// }

</script>

<template>
    <div id="lesson_wrapper">
        <p id="courseTitle">
            <NuxtLink to="/course">
                <img :src="back" />{{ course.title }}
            </NuxtLink>
        </p>
        <p id="chapterTitle">{{ chapter?.title }}</p>
        <p id="chapterDescription">{{ chapter?.description }}</p>
        <div v-if="lesson">
            <p id="lessonTitle">{{ lesson?.title }}</p>
            <p id="lessonDescription">{{ lesson?.description }}</p>
            <VideoPlayer v-if="lesson.videoId" :videoId="+lesson.videoId" :key="lesson.videoId" />
            <p v-else>No video</p>
        </div>
        <LessonCompleteButton v-if="user" :model-value="isLessonCompleted" @update:model-value="() => { toggleComplete(ChapterSlug, LessonSlug); }" />

    </div>
</template>

<style scoped>
#lesson_wrapper {
    text-align: left;
    position: relative;
    padding: 1em;

    img {
        filter: opacity(0.5);
        width: 12px;
    }

    #courseTitle {
        font-size: 15px;
        color: #333;
        margin: 0;

        a {
            color: black;
        }
    }

    #chapterTitle {
        font-size: 30px;
        color: #333;
        font-weight: bold;
    }

    #lessonTitle {
        font-size: 20px;
        color: #333;
        font-weight: bold;
    }

    #chapterDescription,
    #lessonDescription {
        font-size: 15px;
        color: #333;
        margin-left: 5%;
    }
}
</style>