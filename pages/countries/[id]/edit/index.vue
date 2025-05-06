<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Edit Country</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name <span>*</span>
          </label>
          <input
              id="name"
              v-model="country.name.en"
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
const country = ref({
  name: "",
});

const getCountries = async () => {
  try {
    const response = await $fetch(`/api/countries/${route.params.id}`, {
      method: 'GET',
    });
    if (response.data) {
      country.value = {
        name: response.data.name || '',
      };
    }
  } catch (err) {
    console.error('Error loading language:', err);
  }
};


const cancelEdit = () => {
  router.push('/countries');
};

const saveChanges = async () => {
  try {
    const response = await fetch(`/api/countries/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: country.value.name,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      toast.add({
        title: 'Success!',
        description: 'Country updated successfully.',
        color: 'blue',
        timeout: 3000,
      });
      await router.push('/countries');
    } else {
      throw new Error(data.message || 'Failed to update country');
    }
  } catch (error) {
    toast.add({
      title: 'Error!',
      description: error.message || 'Failed to update country',
      color: 'red',
      timeout: 3000,
    });
  }
};


onMounted(async () => {
  await nextTick();
  await getCountries();
});
</script>
