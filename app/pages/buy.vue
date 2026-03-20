<!-- buy.vue -->
<template>
    <div class="buy_wrapper">
      <div class="buy_hero">
        <h1>{{ course.title }}</h1>
        <img :src="preview" alt="preview">
      </div>
      <button @click="open()">Comprar</button>
      <div class="buy_desc">
        <h1>¿Qué vas a aprender?</h1>
        <ul>
          <li>Nada</li>
          <li>Poca cosa</li>
          <li>Absolutamente nada</li>
          <li>Nada de nada</li>
          <li>Enserio, nada</li>
          <li>Puede incluso que desaprendas</li>
        </ul>
      </div>
    </div>
    <div class="show_payment" v-if="showPayment">
      <LazyPayment @close="close()" />
    </div>
</template>

<script lang="ts" setup>
import preview from "@/assets/images/image.png";

const course = await useCourse();
const showPayment = ref(false);

const open = () => {
  showPayment.value = true;
  if (process.client) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed'; 
    document.body.style.width = '100%'; 
  }
};

const close = () => {
  showPayment.value = false;
  if (process.client) {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
};
</script>

<style scoped>
.buy_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    background-color: #ececec;
}
button{
  width:15em;
  height: 3em;
  align-self: center;
  background-color: rgb(0, 172, 177);
  border:none;
  border-radius: 12px;
  color:white;
  font-size: 1em;
  cursor:pointer;
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.5);
  &:hover{
    transform: translateY(-5px);
    box-shadow: 0px 10px 5px -2px rgba(0, 0, 0, 0.5);
  }
}
.buy_hero{
    display: flex;
    flex-direction: column;
    gap: 0;

    text-align: left;
    color:rgb(0, 172, 177);
    margin-left:0;
    padding: 2em 0;
    h1{
      align-self: center;
    }
    img{
      width:70%;
      border-radius:30px;
      align-self: center;
      box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5), -5px -5px 10px 0 rgb(255, 255, 255);
    }
}

.buy_desc{
    display: flex;
    flex-direction: column;
    gap: 0;
    width:100%;
    background-color: rgb(0, 172, 177);;
    text-align: left;
    color:#fff;
    margin-left:0;
    padding: 2em 0;
    h1{
      margin-left: 25%;
      font-size: 3em;
      margin: 0 0 0 25%;
    }
    ul{
      margin-left: 30%;
      li{
        margin-top: 0.5em;
        font-family: 'Courier New', Courier, monospace;
        font-size: 1.2em;
      }
    }

}
.show_payment{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  backdrop-filter: blur(10px);
}
</style>