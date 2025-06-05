<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Edit Topic</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <USelectMenu
              color="blue"
              v-model="topic.language_id"
              :options="languages"
              placeholder="Select a language"
              :loading="isLanguagesLoading"
          />
        </div>
        <div v-if="currentLanguageCode" class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name ({{ currentLanguageCode || 'Select a language' }}) <span class="text-red-500">*</span>
          </label>
          <input
              v-model="topic.name[currentLanguageCode]"
              class="bg-white text-black w-full placeholder-black p-2 border"
              :class="{'border-red-500': errors['name.' + currentLanguageCode]}"
              :placeholder="'Enter name in ' + (currentLanguageCode || 'language')"
              :disabled="!currentLanguageCode"
              required
          />
          <p
              v-if="currentLanguageCode && errors['source.' + currentLanguageCode]"
              class="text-red-500 text-sm mt-1"
          >
            {{ errors['source.' + currentLanguageCode][0] }}
          </p>
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
import {ref, onMounted, watch} from 'vue';

definePageMeta({
  layout: 'navbar',
});

const router = useRouter();
const route = useRoute();
const toast = useToast();
const isLanguagesLoading = ref(true);
const errors = ref({});
const loading = ref(false);
const currentLanguageCode = ref('');
const languages = ref([]);
const topic = ref({
  language_id: '',
  name: {},
});

const getTopics = async () => {
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

const initializeLanguageFields = () => {
  languages.value.forEach((language) => {
    if (!topic.value.name[language.code]) {
      topic.value.name[language.code] = topic.value.name[language.code] || '';
    }
  });
};


watch(
    () => topic.value.language_id,
    (newLanguageId) => {
      console.log('newLanguageId', newLanguageId)
      console.log('newLanguageIdsddddddd', newLanguageId.value)
      console.log('languages', languages.value)
      const selectedLanguage = languages.value.find((lang) => lang.value === newLanguageId.value);
      console.log('selectedLanguage', selectedLanguage)
      currentLanguageCode.value = selectedLanguage ? selectedLanguage.code : '';
      errors.value = {};

      if (selectedLanguage && !topic.value.name[selectedLanguage.code]) {
        topic.value.name[selectedLanguage.code] = '';
      }
    }
);

const fetchLanguages = async () => {
  try {
    const response = await fetch('/api/languages/');
    if (!response.ok) {
      throw new Error('Failed to fetch languages');
    }
    const result = await response.json();
    languages.value = result.data.map((element) => ({
      label: element.name,
      value: element.id,
      code: element.code,
    }));
    initializeLanguageFields();
  } catch (error) {
    console.error('Error fetching languages:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load languages.',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    isLanguagesLoading.value = false;
  }
};


const cancelEdit = () => {
  router.push('/topics');
};

const saveChanges = async () => {
  try {
    loading.value = true;
    errors.value = {};
    if (!topic.value.language_id) {
      errors.value['language_id'] = ['Language ID is required'];
    }
    const languageCodes = languages.value.map((lang) => lang.code);
    let hasValidLanguage = false;
    languageCodes.forEach((code) => {
      if (topic.value.name[code]) {
        hasValidLanguage = true;
      }
    });
    if (!hasValidLanguage) {
      errors.value['name'] = ['At least one language must have a valid name'];
    }
    if (Object.keys(errors.value).length > 0) {
      toast.add({
        title: 'Validation Error!',
        description: 'Please fill out all required fields.',
        color: 'red',
        timeout: 3000,
      });
      return;
    }
    const response = await fetch(`/api/topics/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language_id: topic.value.language_id,
        name: topic.value.name,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update the topic.');
    }
    toast.add({
      title: 'Success!',
      description: 'Topic updated successfully.',
      color: 'blue',
      timeout: 3000,
    });
    await router.push('/topics');
  } catch (error) {
    console.error('Error saving changes:', error);
    toast.add({
      title: 'Error!',
      description: error.message || 'Failed to update the Topic.',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await nextTick();
  await getTopics();
  await fetchLanguages()
});
</script>
