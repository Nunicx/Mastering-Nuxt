
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    prerender: {
      routes: ['/landing']
    }
  },
  runtimeConfig: {
    stripeSecret: process.env.NUXT_STRIPE_SECRET,
    public: {
      stripeKey: process.env.NUXT_PUBLIC_STRIPE_KEY
    }
  },
  modules: ['@nuxt/image', '@vueuse/nuxt', '@nuxtjs/supabase', '@pinia/nuxt'],
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  }
})
