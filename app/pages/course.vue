<script setup lang="ts">
import { isIgnored } from 'nuxt/kit';

const course = useCourse();
</script>

<template>
    <div id="course_wrapper">
        <h1>Course: <strong>Mastering Nuxt</strong></h1>
        <div id="content">
            <div id="chapters">
                <h2>Chapters</h2>
                <ul>
                    <li v-for="chapter in course.chapters" :key="chapter.slug">
                        <NuxtLink :to="`/course/chapter/${chapter.slug}/lesson/${chapter.lessons[0]?.slug}`">
                            {{ chapter.title }}
                        </NuxtLink>
                        <p>{{ chapter.description }}</p>
                        <ul v-for="lesson in chapter.lessons" :key="lesson.slug">
                            <NuxtLink :to="`/course/chapter/${chapter.slug}/lesson/${lesson.slug}`">
                                {{ lesson.title }}
                            </NuxtLink>
                            <p>{{ lesson.description }}</p>
                        </ul>
                    </li>
                </ul>
            </div>
            <div id="lessons" v-if="$route.params.LessonSlug">
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
    height: 100%;
    text-align: center;

    h1 {
        margin-top: 1em;
    }

    li {
        margin-top: 1em;
    }
}

#content {
    display: flex;
    flex-direction: row;
    gap: 2em;
    margin-top: 3em;
    padding: 0 2em;
}

#chapters,
#lessons {
    background-color: #ededed;
    min-height: 80vh;
    flex-grow: 1;
    padding: 2em;
}

#chapters {
    width: 30%;
    text-align: left;
    a {
        text-decoration: none;
        color: #000;
    }
    p {
        font-size: 0.9em;
        font-weight: normal;
        margin-left: 5%;
    }
    li {
        margin-left: 10%;
        font-weight: bold;
        ul {
            margin-left: 10%;
        }
    }
}

#lessons {
    display: block;
    width: 70%;
    min-height: 80vh;
}
</style>