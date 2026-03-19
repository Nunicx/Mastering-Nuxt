import courseData from "~~/server/courseData";
import type { Chapter, Course, CourseMeta, OutlineChapter, OutlineLesson } from "~~/types/course";
courseData as Course;

export default defineEventHandler((event): CourseMeta => {
    const outline: OutlineChapter[] = courseData.chapters.reduce(
        (prev: OutlineChapter[], next: Chapter) => {
            const lessons: OutlineLesson[] = next.lessons.map(
                (lesson) => ({
                    title: lesson.title,
                    slug: lesson.slug,
                    description: lesson.description,
                    path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`,
                })
            );
            const chapter: OutlineChapter = {
                title: next.title,
                slug: next.slug,
                description: next.description,
                lessons,
            };
            return [...prev, chapter];
        },
        []
    );
    return {
        title: courseData.title,
        chapters: outline,
    }

})