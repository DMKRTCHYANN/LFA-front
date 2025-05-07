<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Edit Tag</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name <span>*</span>
          </label>
          <input
              id="name"
              v-model="tag.name.en"
              class="bg-white text-black w-full p-2 border"
          />
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
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'navbar',
});

const router = useRouter();
const route = useRoute();
const toast = useToast();
const tag = ref({
  name: "",
});

const getTags = async () => {
  try {
    const response = await $fetch(`/api/tags/${route.params.id}`, {
      method: 'GET',
    });
    if (response.data) {
      tag.value = {
        name: response.data.name || '',
      };
    }
  } catch (err) {
    console.error('Error loading tag:', err);
  }
};


const cancelEdit = () => {
  router.push('/tags');
};

const saveChanges = async () => {
  try {
    const response = await fetch(`/api/tags/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: tag.value.name,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      toast.add({
        title: 'Success!',
        description: 'Tag updated successfully.',
        color: 'blue',
        timeout: 3000,
      });
      await router.push('/tags');
    } else {
      throw new Error(data.message || 'Failed to update tags');
    }
  } catch (error) {
    toast.add({
      title: 'Error!',
      description: error.message || 'Failed to update tags',
      color: 'red',
      timeout: 3000,
    });
  }
};


onMounted(async () => {
  await nextTick();
  await getTags();
});
</script>
