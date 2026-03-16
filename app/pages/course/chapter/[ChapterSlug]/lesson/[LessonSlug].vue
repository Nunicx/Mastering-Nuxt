<script setup>//Por que tengo que importarlos?
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

/*const title= computed(() => {
    return 'Lesson '+chapter.value?.title+'-'+lesson.value?.slug
})*/

useHead({
    title: 'Lesson ' + chapter.value?.title + '-' + lesson.value?.slug + ' | ' + lesson.value?.description
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

</script>

<template>
    <div id="lesson_wrapper">
        <p id="courseTitle">
            <NuxtLink to="/course">
                <NuxtImg src="/img/back.png" />{{ course.title }}
            </NuxtLink>
        </p>
        <p id="chapterTitle">{{ chapter.title }}</p>
        <p id="chapterDescription">{{ chapter.description }}</p>
        <div v-if="lesson">
            <p id="lessonTitle">{{ lesson.title }}</p>
            <p id="lessonDescription">{{ lesson.description }}</p>
            <VideoPlayer v-if="lesson.videoId" :videoId="+lesson.videoId" :key="lesson.videoId" />
            <p v-else>No video</p>
        </div>
            <LessonCompleteButton :model-value="isLessonComplete" @update:model-value="toggleComplete" />

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