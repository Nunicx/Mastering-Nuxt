<script setup>
const firstLesson = await useFirstLesson();
const course = await useCourse();
import back from '@/assets/images/back.png';
// definePageMeta({
//     layout: 'default',
// })

const resetError = async (error) => {
    await navigateTo(firstLesson.path);
    error.value = null
    clearError();
}
</script>

<template>

    <div class="all_course_wrapper">
        <UserCard />
        <NuxtLink to="/" id="go_back">
            <img :src="back" />{{ course.title }}
        </NuxtLink>
        <h1>Course: <strong>{{ course.title }}</strong></h1>
        <div id="content">
            <div id="chapters">
                <h2>Chapters</h2>
                <ul>
                    <li v-for="chapter in course.chapters" :key="chapter.slug">
                        {{ chapter.title }}
                        <p>{{ chapter.description }}</p>
                        <ul v-for="lesson in chapter.lessons" :key="lesson.slug">
                            <NuxtLink :to="lesson.path">
                                {{ lesson.title }}
                            </NuxtLink>
                            <p>{{ lesson.description }}</p>
                        </ul>
                    </li>
                </ul>
            </div>
            <div id="lessons">
                <NuxtErrorBoundary>
                    <NuxtPage />
                    <template #error="{ error }">
                        <p>Something went wrong: {{ error }}</p>
                        <button @click="resetError(error)">Retry</button>
                    </template>
                </NuxtErrorBoundary>

            </div>
        </div>
    </div>

</template>

<style scoped>
.router-link-active {
    text-decoration: underline !important;
    color: #30309f !important;

}

#course_wrapper {

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
    max-width: 25%;
    text-align: left;

    a {
        text-decoration: none;
        color: #000;
    }

    p {
        font-size: 0.9em;
        font-weight: normal;
        margin-left: 5%;
        position: relative;
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

#go_back {
    position: absolute;
    top: 0;
    left: 0;
    margin: 1em;
    display: flex;
    align-items: center;
    gap: 0.5em;
    text-decoration: none !important;
    color: #000 !important;

    img {
        width: 24px;
        filter: opacity(0.5);
    }
}
</style>