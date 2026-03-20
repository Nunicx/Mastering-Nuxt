// stores/courseProgress.ts
import { defineStore } from 'pinia'

export const useCourseProgress = defineStore('courseProgress', () => {
  const progress = ref({});
  const initialized = ref(false);

  onMounted(() => {
    const saved = localStorage.getItem('progress');
    if (saved) {
      progress.value = JSON.parse(saved);
    }
  });

  watch(progress, (newProgress) => {
    if (process.client) {
      localStorage.setItem('progress', JSON.stringify(newProgress));
    }
  }, { deep: true });

  async function initialize() {
    if (initialized.value) return;
    initialized.value = true;
  }

  const toggleComplete = async (chapter, lesson) => {
    const user = useSupabaseUser();
    if (!user.value) return;

    if (!chapter || !lesson) {
      const { params: { ChapterSlug, LessonSlug } } = useRoute();
      chapter = ChapterSlug;
      lesson = LessonSlug;
    }

    const currentProgress = progress.value[chapter]?.[lesson];

    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress
    }
  };

  const isCompleted = (chapterSlug, lessonSlug) => {
    return computed(() => {
      return progress.value[chapterSlug]?.[lessonSlug] || false;
    });
  };

  return {
    initialize,
    progress,
    toggleComplete,
    isCompleted 
  };
});