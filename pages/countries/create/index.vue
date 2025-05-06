<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Create Country</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name (EN) <span class="text-red-500">*</span>
          </label>
          <input
              v-model="country.name.en"
              class="bg-white text-black w-full p-2 border"
              :class="{'border-red-500': !country.name.en && errors.name_en}"
              required
          />
          <p v-if="errors.name_en" class="text-red-500 text-sm mt-1">{{ errors.name_en[0] }}</p>
        </div>
        <div class="flex justify-center gap-4">
          <button
              @click="router.push('/countries')"
              class="bg-gray-500 p-3 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-sm"
          >
            Cancel
          </button>
          <button
              @click="createCountry"
              class="bg-blue-500 p-3 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-sm"
              :disabled="loading"
          >
            <span v-if="loading">Saving...</span>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'navbar',
});

const toast = useToast();
const router = useRouter();
const loading = ref(false);
const errors = ref({});
const country = ref({
  name: {
    en: '',
  },
});

const createCountry = async () => {
  try {
    loading.value = true;
    errors.value = {};

    const response = await fetch('/api/countries/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: country.value.name,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      if (data.errors) {
        errors.value = data.errors;
      } else {
        throw new Error('Unknown error occurred');
      }
    } else {
      toast.add({
        title: 'Success!',
        description: 'Country has been created successfully',
        color: 'blue',
        timeout: 3000,
      });
      await router.push('/countries');
    }
  } catch (error) {
    if (!Object.keys(errors.value).length) {
      toast.add({
        title: 'Error!',
        description: 'Failed to create country. Please try again.',
        color: 'red',
        timeout: 3000,
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>
