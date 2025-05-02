<template>
  <div class="relative">
    <input
        :type="isPasswordVisible ? 'text' : 'password'"
        class="w-full p-3 border border-gray-300 rounded-lg mb-[15px] text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
    <button
        type="button"
        @click="togglePassword"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
    >
      <svg
          v-if="isPasswordVisible"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6  mb-[15px] text-gray-600  hover:text-gray-800"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.33a10.477 10.477 0 0116.03 0M20.02 15.67a10.477 10.477 0 01-16.04 0M8.46 12a3.46 3.46 0 116.92 0 3.46 3.46 0 01-6.92 0z"
        />
      </svg>
      <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 mb-[15px] text-gray-600 hover:text-gray-800"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.33a10.477 10.477 0 0116.03 0M20.02 15.67a10.477 10.477 0 01-16.04 0M15.54 12a3.46 3.46 0 11-6.92 0 3.46 3.46 0 016.92 0z"
        />
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5"
        />
      </svg>
    </button>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Enter password',
  },
  error: {
    type: String,
    default: '',
  },
});

const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
