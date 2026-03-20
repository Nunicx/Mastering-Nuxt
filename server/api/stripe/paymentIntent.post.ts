import stripe from "./stripe";

export default defineEventHandler(async (event) => {
    try {
        const {email} = await readBody(event);
        
        console.log('📡 Creando payment intent para:', email);
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 9700,
            currency: 'usd',
            receipt_email: email, 
            metadata: { email }
        });
        
        console.log('✅ Payment intent creado:', paymentIntent.id);
        console.log('🔑 Client secret:', paymentIntent.client_secret);
        
        return { 
            clientSecret: paymentIntent.client_secret 
        };
        
    } catch (error) {
        console.error('❌ Error creando payment intent:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Error al crear el intent de pago'
        });
    }
});