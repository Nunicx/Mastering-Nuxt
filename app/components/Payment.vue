<!-- payment.vue -->
<template>
  <div class="payment_wrapper">
    <h1>A pagar, a pagar</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Email" autocomplete="email" v-model="email">
      <div id="card-element"></div>

      <button type="submit" class="pay_btn" :class="processingPayment || email === '' ? 'btn_disabled' : ''">Comprar: 97$</button>
      <button @click="$emit('close')" class="close">X</button>
      <Loading v-if="processingPayment" />
    </form>

  </div>
</template>

<!-- payment.vue -->
<script lang="ts" setup>
import { loadStripe } from "@stripe/stripe-js";
import type { Stripe, StripeCardElement } from "@stripe/stripe-js";

const course = await useCourse();
const config = useRuntimeConfig();
const stripe = ref<Stripe | null>(null);
const card = ref<StripeCardElement | null>(null);
const email = ref('');
const processingPayment = ref(false);
const success = ref(false);

interface PaymentIntentResponse {
  clientSecret: string;
}

const emit = defineEmits(['close']);

const formStyle = {
  base: {
    fontSize: '16px',
    color: '#3d4852',
    '::placeholder': {
      color: '#8795a1',
    }
  }
};

onMounted(() => {
  setupStripe();
});

const setupStripe = async () => {
  console.log('🔄 Inicializando Stripe...');
  
  const stripeInstance = await loadStripe(config.public.stripeKey);
  
  if (stripeInstance) {
    console.log('✅ Stripe cargado');
    stripe.value = stripeInstance;
    
    const elements = stripeInstance.elements();
    const cardElement = elements.create('card', {
      style: formStyle,
    });
    
    card.value = cardElement;
    
    cardElement.mount("#card-element");
    
    console.log('✅ Tarjeta montada');
    
    cardElement.on('change', (event) => {
      if (event.error) {
        console.log('Error en tarjeta:', event.error.message);
      }
    });
  } else {
    console.error('❌ No se pudo cargar Stripe');
  }
}

const handleSubmit = async () => {
  console.log('Email:', email.value);
  console.log('Stripe inicializado?', !!stripe.value);
  console.log('Card inicializado?', !!card.value);
  
  if (email.value == '') {
    console.log('Email vacío');
    return;
  }

  if (!stripe.value || !card.value) {
    console.error('❌ Stripe no inicializado correctamente');
    console.log('stripe.value:', stripe.value);
    console.log('card.value:', card.value);
    return;
  }

  processingPayment.value = true;

  try {
    console.log('📡 Creando payment intent...');
    const response = await $fetch<PaymentIntentResponse>('/api/stripe/paymentIntent', {
      method: 'POST',
      body: {
        email: email.value,
      }
    })

    console.log('✅ Payment intent creado, clientSecret:', response.clientSecret);
    
    const secret = response.clientSecret;

    console.log('💳 Confirmando pago...');
    const result = await stripe.value.confirmCardPayment(secret, {
      payment_method: {
        card: card.value,
      },
      receipt_email: email.value,
    });

    console.log('Resultado completo:', result);

    if (result.error) {
      console.error('❌ Error en pago:', result.error.message);
    } else if (result.paymentIntent?.status === 'succeeded') {
      console.log('✅ Pago exitoso! ID:', result.paymentIntent.id);
      success.value = true;
    } else {
      console.log('Estado del pago:', result?.paymentIntent?.status);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    processingPayment.value = false;
  }
}
</script>

<style scoped>
.payment_wrapper {
  width: 60%;
  height: 30%;
  background-color: #ececec;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

h1 {
  width: 100%;
  background-color: rgb(0, 172, 177);
  margin: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em 0 0 0;
}

.pay_btn {
  width: 100%;
}
.btn_disabled{
  cursor: not-allowed;
  opacity: 0.6;
  background-color: gray;
}

#card-element {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  background-color: #fff;
  min-width: 40vw;
}
</style>