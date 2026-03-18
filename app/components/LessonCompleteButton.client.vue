<template>
    <div class="lesson-complete" :style="{ backgroundColor: colorState }"
        @click="$emit('update:modelValue', !modelValue)">
        {{ modelValue ? 'Complete' : 'Incomplete' }}
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)

const colorState = computed(() => modelValue.value ? '#285c4f' : '#bd2020')
</script>

<style scoped>
.lesson-complete {
    position: absolute;
    right: -20px;
    top: 0;
    padding: 10px;
    border-radius: 12px;
    cursor: pointer;
    color: white;
}

p {
    margin: 0;
    padding: 0;
}
</style>