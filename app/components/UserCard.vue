<template>
    <div v-if="user" id="user_card">
        <img v-if="avatarUrl" :src="avatarUrl" />
        <div class="card_info">
            <p>Nombre: {{ userName }}</p>
            <p>Email: {{ userEmail }}</p>
            <button id="logout" @click="supabase.auth.signOut(); navigateTo('/login')">
                Log out
            </button>
        </div>

    </div>
    <div v-else>
        <p>No hay usuario autenticado</p>
    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const userName = computed(() => {
    return user.value?.user_metadata?.full_name ||
        user.value?.user_metadata?.name ||
        user.value?.name ||
        user.value?.user_metadata?.username ||
        user.value?.preferred_username ||
        user.value?.email?.split('@')[0] ||
        'Sin nombre';
});

const userEmail = computed(() => user.value?.email || 'Sin email');

const avatarUrl = computed(() => {
    return user.value?.user_metadata?.avatar_url ||
        user.value?.user_metadata?.picture ||
        null;
});
</script>

<style>
#user_card {
    position: absolute;
    font-size: 0.8em;
    top: 6px;
    right: -1px;
    display: flex;
    align-items: center;
    gap: 1em;
    background-color: #ececec;
    padding: 5px 10px;
    border: 1px solid #aaa;
    /* no quiero que sus hijos puedan hacerle mas grande:*/
    flex-shrink: 0;
    height: max-content;

    img {
        height: 100%;
        max-height: 6em;
        border-radius: 100%;
        border: 1px solid #888;
    }

    #logout {
        text-decoration: none;
        color: black;
        background-color: #ccc;
        border-radius: 10px;
        padding: 3px;
        border: none;
        margin-left: 20px;
    }
}
</style>