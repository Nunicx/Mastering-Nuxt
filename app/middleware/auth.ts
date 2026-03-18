export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();
    if (to.params.ChapterSlug == "1" && to.params.LessonSlug == "1") {
        return;
    }

    if (!user.value) {
        return navigateTo(`/login?redirectTo=${to.path}`);
    }
})