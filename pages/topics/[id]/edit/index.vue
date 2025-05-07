<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Edit Topic</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name <span>*</span>
          </label>
          <input
              id="name"
              v-model="topic.name.en"
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
const topic = ref({
  name: "",
});

const getTopcis = async () => {
  try {
    const response = await $fetch(`/api/topics/${route.params.id}`, {
      method: 'GET',
    });
    if (response.data) {
      topic.value = {
        name: response.data.name || '',
      };
    }
  } catch (err) {
    console.error('Error loading topic:', err);
  }
};


const cancelEdit = () => {
  router.push('/topics');
};

const saveChanges = async () => {
  try {
    const response = await fetch(`/api/topics/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: topic.value.name,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      toast.add({
        title: 'Success!',
        description: 'Topic updated successfully.',
        color: 'blue',
        timeout: 3000,
      });
      await router.push('/topics');
    } else {
      throw new Error(data.message || 'Failed to update topic');
    }
  } catch (error) {
    toast.add({
      title: 'Error!',
      description: error.message || 'Failed to update topic',
      color: 'red',
      timeout: 3000,
    });
  }
};


onMounted(async () => {
  await nextTick();
  await getTopcis();
});
</script>
