import courseData from "~~/server/courseData";
import type { Chapter, Lesson, Course, LessonWithPath } from "~~/types/course";
courseData as Course;


export default defineEventHandler((event): LessonWithPath => {
    const { ChapterSlug, LessonSlug } = (event.context.params as { ChapterSlug: string, LessonSlug: string });

    const chapter = courseData.chapters.find(
        (chapter) => chapter.slug === ChapterSlug
    );
    const lesson = chapter?.lessons.find(
        (lesson) => lesson.slug === LessonSlug
    );
    if (!chapter || !lesson) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Chapter or lesson not found'
        })
    }
    return { ...lesson, path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}` }
})
