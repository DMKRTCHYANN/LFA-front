<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Create Tag</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <USelectMenu
              color="blue"
              v-model="tag.language_id"
              :options="languages"
              option-attribute="label"
              value-attribute="value"
              placeholder="Select a language"
              :loading="isLanguagesLoading"
          />
          <p v-if="errors['language_id']" class="text-red-500 text-sm mt-1">
            {{ errors['language_id'][0] }}
          </p>
          <div v-if="!isLanguagesLoading && languages.length === 0" class="text-red-500 text-sm mt-1">
            No languages available. Please try again later.
          </div>
        </div>
        <div v-if="currentLanguageCode" class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name ({{ currentLanguageCode }}) <span class="text-red-500">*</span>
          </label>
          <input
              v-model="tag.name[currentLanguageCode]"
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg"
              :class="{'border-red-500': errors['name.' + currentLanguageCode]}"
              :placeholder="'Enter name in ' + currentLanguageCode"
              required
              maxlength="255"
          />
          <p v-if="errors['name.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
            {{ errors['name.' + currentLanguageCode][0] }}
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
import {onMounted, ref, watch} from 'vue';
import {useRouter} from 'vue-router';

definePageMeta({
  layout: 'navbar',
});

const toast = useToast();
const router = useRouter();
const loading = ref(false);
const isLanguagesLoading = ref(true);
const languages = ref([]);
const currentLanguageCode = ref('');
const errors = ref({});
const tag = ref({
  language_id: '',
  name: {},
});

const fetchLanguages = async () => {
  try {
    const response = await fetch('/api/languages');
    if (!response.ok) {
      throw new Error('Failed to fetch languages');
    }
    const result = await response.json();
    languages.value = result.data.map((element) => ({
      label: element.name,
      value: element.id,
      code: element.code,
    }));
  } catch (error) {
    console.error('Error fetching languages:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load languages.',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    isLanguagesLoading.value = false
  }
}

watch(() => tag.value.language_id, (newLanguageId) => {
  const selectedLanguage = languages.value.find(lang => lang.value === newLanguageId);
  currentLanguageCode.value = selectedLanguage ? selectedLanguage.code : null;

  if (selectedLanguage && !tag.value.name[selectedLanguage.code]) {
    tag.value.name[selectedLanguage.code] = '';
  }
});

const createTags = async () => {
  try {
    loading.value = true;
    errors.value = {};
    const newErrors = {};
    if (!tag.value.language_id) {
      newErrors.language_id = ['Language ID is required'];
    }
    const languageCodes = languages.value.map(lang => lang.code);
    let hasValidLanguage = false;
    for (const code of languageCodes) {
      if (tag.value.name[code]) {
        if (tag.value.name[code].length > 255) {
          newErrors[`name.${code}`] = ['Name must not exceed 255 characters'];
        } else {
          hasValidLanguage = true;
        }
      }
    }
    if (!hasValidLanguage) {
      newErrors.name = ['At least one language must have a name filled.'];
    }
    if (Object.keys(newErrors).length > 0) {
      errors.value = newErrors;
      toast.add({
        title: 'Error!',
        description: 'Please correct the errors in the form.',
        color: 'red',
        timeout: 3000,
      });
      return;
    }
    const payload = {
      language_id: tag.value.language_id,
      name: tag.value.name,
    };
    const response = await fetch('/api/tags/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const data = await response.json();
      if (data.errors) {
        errors.value = data.errors;
        toast.add({
          title: 'Error!',
          description: 'Validation failed. Please check the form.',
          color: 'red',
          timeout: 3000,
        });
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
    console.error('Error creating tag:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to create tag. Please try again.',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchLanguages();
});
</script>