import Stripe from 'stripe';

const config = useRuntimeConfig();

if (!config.stripeSecret) {
    throw new Error('NUXT_STRIPE_SECRET no está configurada en .env');
}

console.log('✅ Inicializando Stripe con clave secreta...');

const stripe = new Stripe(config.stripeSecret, {
    apiVersion: '2026-02-25.clover',
});

export default stripe;