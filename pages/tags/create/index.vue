<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Create Tag</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name  <span class="text-red-500">*</span>
          </label>
          <input
              id="name"
              v-model="tag.name.en"
              class="bg-white text-black w-full p-2 border"
              :class="{'border-red-500': errors['name.en']}"
              required
          />
          <p v-if="errors['name.en']" class="text-red-500 text-sm mt-1">
            {{ errors['name.en'][0] }}
          </p>
        </div>
        <div class="flex justify-center gap-4">
          <button
              @click="router.push('/tags')"
              class="bg-gray-500 p-3 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-sm"
          >
            Cancel
          </button>
          <button
              @click="createTags"
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
const tag = ref({
  name: {
    en: '',
  },
});

const createTags = async () => {
  try {
    loading.value = true;
    errors.value = {};

    const response = await fetch('/api/tags/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: tag.value.name,
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
        description: 'Tag has been created successfully',
        color: 'blue',
        timeout: 3000,
      });
      await router.push('/tags');
    }
  } catch (error) {
    if (!Object.keys(errors.value).length) {
      toast.add({
        title: 'Error!',
        description: 'Failed to create tag. Please try again.',
        color: 'red',
        timeout: 3000,
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>