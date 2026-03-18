<template>
    <div>
        <h1 v-if="!user">Login to {{ title }}</h1>
        <button v-if="!user" @click="login" :disabled="loading">
            {{ loading ? 'Cargando...' : 'Log in with Github' }}
        </button>
        <div v-else>
            <p>Logged in as {{ user.email }}</p>

            <NuxtLink to="/course">Ir al curso</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { title } = useCourse();
const supabase = useSupabaseClient();
const loading = ref(false);
const router = useRouter();
const query = useRoute();
const user = useSupabaseUser();

watchEffect(async () => {
    if (user.value) {
        await navigateTo(query.query?.redirectTo as string, {
            replace: true
        })
    }
})

const login = async () => {
    loading.value = true;
    const redirectTo = `${window.location.origin}${query.query?.redirectTo}`;
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo
            }
        })

        if (error) throw error;
    } catch (error) {
        console.error('Error login:', error);
        loading.value = false;
    }
}
</script>