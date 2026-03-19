<script setup>
const course = await useCourse();
const route = useRoute();
const { ChapterSlug, LessonSlug } = route.params;
const lesson = await useLesson(ChapterSlug, LessonSlug);

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


// El curso lo explicaba con un array y no me salía, asi que lo hice con un objeto:
const progress = useLocalStorage('progress', {});                       //Almacenamos en localStorage el progreso en un objeto

const lessonKey = computed(() => {
    return `${chapter.value?.slug}-${lesson.value?.slug}`;      //Almacenamos la llave de la leccion como chapter-slug - lesson-slug 
});

const isLessonComplete = computed(() => {
    return progress.value[lessonKey.value] || false;            //Comprobamos si la leccion está completa
});

const toggleComplete = () => {
    progress.value = {
        ...progress.value,
        [lessonKey.value]: !isLessonComplete.value              //Actualizamos el progreso de la leccion
    };
};

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
                <NuxtImg src="/img/back.png" />{{ course.title }}
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
        <LessonCompleteButton :model-value="isLessonComplete" @update:model-value="() => { toggleComplete; }" />

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