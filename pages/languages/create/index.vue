<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Create Language</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name <span class="text-red-500">*</span>
          </label>
          <input
              v-model="languages.name"
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              :class="{'border-red-500': !languages.name && errors.name}"
              required
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="code" class="block text-sm font-medium text-gray-700 mb-2">
            Code <span class="text-red-500">*</span>
          </label>
          <input
              v-model="languages.code"
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              :class="{'border-red-500': !languages.code && errors.name}"
              required
          />
          <p v-if="errors.code" class="text-red-500 text-sm mt-1">{{ errors.code[0] }}</p>
        </div>
        <div class="mb-6">
          <label for="file" class="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <div
              class="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <input
                type="file"
                accept="image/*"
                @change="handleFileChange"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div v-if="!imagePreview && !languages.image" class="text-gray-500 text-sm text-center">
              Drag and drop an image or click to select
            </div>
            <img
                v-if="imagePreview"
                :src="imagePreview"
                alt="Image Preview"
                class="max-h-40 object-contain mt-4"
            />
          </div>
          <p class="text-black p-[10px]">Use only JPEG, PNG, JPG, GIF</p>
          <p v-if="errors.image" class="text-red-500 text-sm mt-1">{{ errors.image[0] }}</p>
        </div>
        <div class="flex justify-center gap-4">
          <button
              @click="router.push('/languages')"
              class="bg-gray-500 p-3 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-sm"
          >
            Cancel
          </button>
          <button
              @click="createLanguages"
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
import {ref} from 'vue';
import {useRouter} from 'vue-router';

definePageMeta({
  layout: 'navbar',
});

const toast = useToast();
const router = useRouter();
const imagePreview = ref(null);
const loading = ref(false);
const errors = ref({});
const languages = ref({
  name: '',
  code: '',
  image: null,
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    languages.value.image = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const createLanguages = async () => {
  try {
    loading.value = true;
    errors.value = {};
    const formData = new FormData();
    formData.append('name', languages.value.name);
    formData.append('code', languages.value.code);
    if (languages.value.image) {
      formData.append('image', languages.value.image);
    }
    const response = await fetch('/api/languages/', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
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
        description: 'Language has been created successfully',
        color: 'blue',
        timeout: 3000,
      });
      await router.push('/languages');
    }
  } catch (error) {
    if (!Object.keys(errors.value).length) {
      toast.add({
        title: 'Error!',
        description: 'Failed to create language. Please try again.',
        color: 'red',
        timeout: 3000,
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>
