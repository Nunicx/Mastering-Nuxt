export type Lesson = {
    title: string;
    slug: string;
    description: string;
    videoId: string;
};

export type LessonWithPath = Lesson & {
    path: string;
}

export type Chapter = {
    title: string;
    description: string;
    slug: string;
    lessons: Lesson[] | LessonWithPath[];
}

export type Course = {
    title: string;
    description: string;
    slug: string;
    chapters: Chapter[]
}

export type CourseMeta = {
    title: string;
    chapters: OutlineChapter[];
}

export type OutlineChapter = OutlineBase & {
    lessons: OutlineLesson[];
}
export type OutlineLesson = OutlineBase & {
    path: string;
}

export type OutlineBase = {
    title: string;
    slug: string;
    description: string;
}