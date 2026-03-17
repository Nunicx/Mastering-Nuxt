import courseData from "./courseData";

type Lesson = {
    title: string;
    slug: string;
    description: string;
    videoId: string;
    path: string
};

type Chapter = {
    title: string;
    description: string;
    slug: string;
    lessons: Lesson[];
}

type Course = {
    title: string;
    description: string;
    chapters: Chapter[]
}

export const useCourse = () => {
    const chapters: Chapter[] = courseData.chapters.map((chapter) => {
        const lessons: Lesson[] = chapter.lessons.map((lesson) => ({
            ...lesson,
            path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
        }));
        return {
            ...chapter,
            lessons,
        };
    }
    );
    return {
        ...courseData,
        chapters,
    }
}