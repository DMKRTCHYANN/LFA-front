<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Edit Language</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name <span>*</span>
          </label>
          <input
              id="name"
              v-model="language.name"
              class="bg-white text-black w-full p-2 border"
          />
        </div>
        <div class="mb-4">
          <label for="code" class="block text-sm font-medium text-gray-700 mb-2">
            Code
          </label>
          <input
              id="code"
              v-model="language.code"
              class="bg-white text-black w-full p-2 border"
          />
        </div>
        <div class="mb-6">
          <label for="file" class="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <div
              class="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            <input
                id="file"
                type="file"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
                @change="onFileChange"
            />
            <div class="text-gray-500 text-sm text-center">
              Drag and drop an image or click to select
            </div>
            <img
                v-if="previewImage || language.image"
                :src="previewImage || `http://localhost:8000/storage/${language.image}`"
                alt="Language Image"
                class="max-h-40 object-contain mt-4"
            />
          </div>
          <p class="text-black p-[10px]">Use only JPEG, PNG, JPG, GIF</p>
        </div>
        <div class="flex justify-center gap-4">
          <button
              class="bg-gray-500 p-3 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-sm"
              @click="cancelEdit"
          >
            Cancel
          </button>
          <button
              class="bg-blue-500 p-3 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-sm"
              @click="saveChanges"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup type="module">
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'navbar',
});


const selectedFile = ref(null);
const previewImage = ref(null);
const router = useRouter();
const route = useRoute();
const toast = useToast();
const language = ref({
  name: '',
  code: '',
  image: '',
});


const getLanguages = async () => {
  try {
    const response = await $fetch(`/api/languages/${route.params.id}`, {
      method: 'GET',
    });
    if (response.data) {
      language.value = {
        name: response.data.name || '',
        code: response.data.code || '',
        image: response.data.image || '',
      };
    }
  } catch (err) {
    console.error('Error loading language:', err);
  }
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    selectedFile.value = null;
    previewImage.value = null;
  }
};

const cancelEdit = () => {
  router.push('/languages');
};

const saveChanges = async () => {
  try {
    const formData = new FormData();
    formData.append('name', language.value.name);
    formData.append('code', language.value.code);
    if (selectedFile.value) {
      formData.append('image', selectedFile.value);
    }
    formData.append('_method', 'PUT');
    const response = await useFetch(`/api/languages/${route.params.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });
      toast.add({
        title: 'Success!',
        description: 'Language updated successfully.',
        color: 'green',
        timeout: 3000,
      });
      await router.push('/languages');
  } catch (error) {
    toast.add({
      title: 'Error!',
      description: 'Failed to update language',
      color: 'red',
      timeout: 3000,
    });
  }
};


onMounted(async () => {
  await getLanguages();
});
</script>
