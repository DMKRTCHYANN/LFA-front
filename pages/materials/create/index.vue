<template>
  <div class="flex">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Create Material</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label for="language" class="block text-sm font-medium text-gray-700 mb-2">
            Language ID <span class="text-red-500">*</span>
          </label>
          <select
              v-model="material.language_id"
              class="bg-white text-black w-full p-2 border"
              :class="{'border-red-500': errors['language_id']}"
              required
              :disabled="isLanguagesLoading"
          >
            <option value="" disabled>
              {{ isLanguagesLoading ? 'Loading languages...' : 'Select a language' }}
            </option>
            <option
                v-for="language in languages"
                :key="language.id"
                :value="language.id"
            >
              {{ language.name }}
            </option>
          </select>
          <p v-if="errors['language_id']" class="text-red-500 text-sm mt-1">
            {{ errors['language_id'][0] }}
          </p>
          <div v-if="!isLanguagesLoading && languages.length === 0" class="text-red-500 text-sm mt-1">
            No languages available. Please try again later.
          </div>
        </div>
        <div class="mb-4">
          <button
              @click="submitLanguage"
              class="bg-green-500 p-2 text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-sm"
              :disabled="!material.language_id || loading"
          >
            <span v-if="loading">Submitting...</span>
            <span v-else>Submit Language</span>
          </button>
        </div>
        <div class="mb-4">
          <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">
            Topic ID <span class="text-red-500">*</span>
          </label>
          <select
              v-model="material.topic_id"
              class="bg-white text-black w-full p-2 border"
              :class="{'border-red-500': errors['topic_id']}"
              required
              :disabled="isTopicsLoading"
          >
            <option value="" disabled>
              {{ isTopicsLoading ? 'Loading topics...' : 'Select a topic' }}
            </option>
            <option
                v-for="topic in topics"
                :key="topic.id"
                :value="topic.id"
            >
              {{ topic.name.en }}
            </option>
          </select>
          <p v-if="errors['topic_id']" class="text-red-500 text-sm mt-1">
            {{ errors['topic_id'][0] }}
          </p>
          <div v-if="!isTopicsLoading && topics.length === 0" class="text-red-500 text-sm mt-1">
            No topics available. Please try again later.
          </div>
        </div>
        <div class="mb-4">
          <label for="country" class="block text-sm font-medium text-gray-700 mb-2">
            Country <span class="text-red-500">*</span>
          </label>
          <select
              v-model="material.country_id"
              class="bg-white text-black w-full p-2 border"
              :class="{'border-red-500': errors['country_id']}"
              required
              :disabled="isCountriesLoading"
          >
            <option value="" disabled>
              {{ isCountriesLoading ? 'Loading country...' : 'Select a country' }}
            </option>
            <option
                v-for="country in countries"
                :key="country.id"
                :value="country.id"
            >
              {{ country.name.en }}
            </option>
          </select>
          <p v-if="errors['country_id']" class="text-red-500 text-sm mt-1">
            {{ errors['country_id'][0] }}
          </p>
          <div v-if="!isCountriesLoading && countries.length === 0" class="text-red-500 text-sm mt-1">
            No countries available. Please try again later.
          </div>
        </div>
        <div class="mb-4">
          <label for="poster" class="block text-sm font-medium text-gray-700 mb-2">
            Poster <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.poster"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.poster && errors.poster}"
              placeholder="Enter poster"
              required
          />
          <p v-if="errors.poster" class="text-red-500 text-sm mt-1">{{ errors.poster[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Title ({{ currentLanguageCode || 'Select a language' }}) <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.title[currentLanguageCode]"
              class="bg-white text-black w-full placeholder-black p-2 border"
              :class="{'border-red-500': errors['title.' + currentLanguageCode]}"
              :placeholder="'Enter title in ' + (currentLanguageCode || 'language')"
              :disabled="!currentLanguageCode"
              required
          />
          <p v-if="errors['title.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
            {{ errors['title.' + currentLanguageCode][0] }}
          </p>
        </div>
        <div class="mb-4">
          <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
            Author ({{ currentLanguageCode || 'Select a language' }}) <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.author[currentLanguageCode]"
              class="bg-white text-black w-full placeholder-black p-2 border"
              :class="{'border-red-500': errors['author.' + currentLanguageCode]}"
              :placeholder="'Enter author in ' + (currentLanguageCode || 'language')"
              :disabled="!currentLanguageCode"
              required
          />
          <p v-if="errors['author.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
            {{ errors['author.' + currentLanguageCode][0] }}
          </p>
        </div>
        <div class="mb-4">
          <label for="short_description" class="block text-sm font-medium text-gray-700 mb-2">
            Short Description ({{ currentLanguageCode || 'Select a language' }}) <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.short_description[currentLanguageCode]"
              class="bg-white text-black w-full placeholder-black p-2 border"
              :class="{'border-red-500': errors['short_description.' + currentLanguageCode]}"
              :placeholder="'Enter short description in ' + (currentLanguageCode || 'language')"
              :disabled="!currentLanguageCode"
              required
          />
          <p v-if="errors['short_description.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
            {{ errors['short_description.' + currentLanguageCode][0] }}
          </p>
        </div>
        <div class="mb-4">
          <label for="full_text" class="block text-sm font-medium text-gray-700 mb-2">
            Full Text ({{ currentLanguageCode || 'Select a language' }}) <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.full_text[currentLanguageCode]"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': errors['full_text.' + currentLanguageCode]}"
              :placeholder="'Enter full text in ' + (currentLanguageCode || 'language')"
              :disabled="!currentLanguageCode"
              required
          />
          <p v-if="errors['full_text.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
            {{ errors['full_text.' + currentLanguageCode][0] }}
          </p>
        </div>
        <div class="mb-4">
          <label for="source" class="block text-sm font-medium text-gray-700 mb-2">
            Source ({{ currentLanguageCode || 'Select a language' }}) <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.source[currentLanguageCode]"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': errors['source.' + currentLanguageCode]}"
              :placeholder="'Enter source in ' + (currentLanguageCode || 'language')"
              :disabled="!currentLanguageCode"
              required
          />
          <p v-if="errors['source.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
            {{ errors['source.' + currentLanguageCode][0] }}
          </p>
        </div>
        <div class="mb-4">
          <label for="start_year" class="block text-sm font-medium text-gray-700 mb-2">
            Start Year <span class="text-red-500">*</span>
          </label>
          <input
              type="number"
              v-model="material.start_year"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.start_year && errors.start_year}"
              placeholder="Enter start year"
              required
          />
          <p v-if="errors.start_year" class="text-red-500 text-sm mt-1">{{ errors.start_year[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="end_year" class="block text-sm font-medium text-gray-700 mb-2">
            End Year <span class="text-red-500">*</span>
          </label>
          <input
              type="number"
              v-model="material.end_year"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.end_year && errors.end_year}"
              placeholder="Enter end year"
              required
          />
          <p v-if="errors.end_year" class="text-red-500 text-sm mt-1">{{ errors.end_year[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="medium" class="block text-sm font-medium text-gray-700 mb-2">
            Medium <span class="text-red-500">*</span>
          </label>
          <select
              v-model="material.medium"
              class="bg-white text-black w-full p-2 border"
              :class="{'border-red-500': errors['medium']}"
              required
              :disabled="isMediumsLoading"
          >
            <option value="" disabled>
              {{ isMediumsLoading ? 'Loading mediums...' : 'Select a medium' }}
            </option>
            <option
                v-for="medium in mediums"
                :key="medium.value"
                :value="medium.value"
            >
              {{ medium.label }}
            </option>
          </select>
          <p v-if="errors['medium']" class="text-red-500 text-sm mt-1">
            {{ errors['medium'][0] }}
          </p>
        </div>
        <div class="mb-4">
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
            Tags ID <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
                v-model="material.tags"
                multiple
                class="form-multiselect block w-full pl-3 pr-10 py-2 text-base rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
                :class="{
                  'border-red-500 ring-red-500': errors['tags'],
                  'border-gray-300': !errors['tags'],
                  'opacity-50 bg-gray-100': isTagsLoading
                }"
                :disabled="isTagsLoading"
                style="min-height: 120px;"
            >
              <option
                  v-if="isTagsLoading"
                  disabled
                  class="text-gray-500"
              >
                Loading tags...
              </option>
              <template v-else>
                <option
                    disabled
                    class="text-gray-400"
                    :selected="material.tags.length === 0"
                >
                  Select tags (use Ctrl/Cmd for multiple)
                </option>
                <option
                    v-for="tag in tags"
                    :key="tag.id"
                    :value="tag.id"
                    class="px-3 py-2 hover:bg-blue-50 transition-colors"
                >
                  {{ tag.name.en }}
                </option>
              </template>
            </select>
            <div
                v-if="!isTagsLoading && tags.length === 0"
                class="absolute inset-0 bg-white flex items-center justify-center rounded-lg border border-dashed border-gray-200"
            >
              <span class="text-red-400 text-sm">
                No tags available
              </span>
            </div>
          </div>
          <p
              v-if="errors['tags']"
              class="text-red-500 text-sm mt-1 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"/>
            </svg>
            {{ errors['tags'][0] }}
          </p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Select Location <span class="text-red-500">*</span>
          </label>
          <client-only>
            <LocationSelector
                :api-key="$config.public.googleMapsApiKey"
                v-model="location"
                style="height: 500px; width: 100%; position: relative"
            />
          </client-only>
        </div>
        <div class="mb-4">
          <label for="book_url" class="block text-sm font-medium text-gray-700 mb-2">
            Book URL <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.book_url"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.book_url && errors.book_url}"
              placeholder="Enter book url"
              required
          />
        </div>
        <div class="mb-4">
          <label for="video" class="block text-sm font-medium text-gray-700 mb-2">
            Video <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.video"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.video && errors.video}"
              placeholder="Enter video"
              required
          />
        </div>
        <div class="mb-4">
          <label for="source_url" class="block text-sm font-medium text-gray-700 mb-2">
            Source URL <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.source_url"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.source_url && errors.source_url}"
              placeholder="Enter source url"
              required
          />
        </div>
        <div class="mb-4">
          <label for="author_url" class="block text-sm font-medium text-gray-700 mb-2">
            Author URL <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.author_url"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.author_url && errors.author_url}"
              placeholder="Enter author url"
              required
          />
        </div>
        <div class="flex justify-center gap-4">
          <button
              @click="router.push('/countries')"
              class="bg-gray-500 p-3 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-sm"
          >
            Cancel
          </button>
          <button
              @click="createMaterial"
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
import { ref, onMounted, watch, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import LocationSelector from "~/components/LocationSelector.vue";

definePageMeta({
  layout: 'navbar',
});

const toast = useToast();
const router = useRouter();
const loading = ref(false);
const isLanguagesLoading = ref(true);
const isTopicsLoading = ref(true);
const isTagsLoading = ref(true);
const isCountriesLoading = ref(true);
const isMediumsLoading = ref(true);
const errors = ref({});
const languages = ref([]);
const topics = ref([]);
const tags = ref([]);
const countries = ref([]);
const mediums = ref([]);
const currentLanguageCode = ref('');

const material = ref({
  language_id: '',
  topic_id: '',
  country_id: '',
  poster: '',
  title: {},
  author: {},
  short_description: {},
  full_text: {},
  source: {},
  start_year: '',
  end_year: '',
  medium: '',
  tags: [],
  book_url: '',
  video: '',
  source_url: '',
  author_url: '',
  location: { coordinates: [40.180438, 44.488690] },
});

const markerPosition = ref({
  lat: material.value.location.coordinates[0],
  lng: material.value.location.coordinates[1],
});

const markerOptions = ref({
  position: markerPosition.value,
  draggable: true,
});

const location = computed({
  get: () => ({
    lat: material.value.location.coordinates[0],
    lng: material.value.location.coordinates[1],
  }),
  set: (newLocation) => {
    material.value.location.coordinates = [newLocation.lat, newLocation.lng];
  },
});

// Initialize language-specific fields when languages are fetched
const initializeLanguageFields = () => {
  languages.value.forEach((language) => {
    if (!material.value.title[language.code]) {
      material.value.title[language.code] = '';
      material.value.author[language.code] = '';
      material.value.short_description[language.code] = '';
      material.value.full_text[language.code] = '';
      material.value.source[language.code] = '';
    }
  });
};

// Watch for language_id changes to set currentLanguageCode
watch(() => material.value.language_id, (newLanguageId) => {
  const selectedLanguage = languages.value.find(lang => lang.id === newLanguageId);
  currentLanguageCode.value = selectedLanguage ? selectedLanguage.code : '';
});

const fetchLanguages = async () => {
  try {
    const response = await fetch('/api/languages/');
    if (!response.ok) {
      throw new Error('Failed to fetch languages');
    }
    const result = await response.json();
    languages.value = result.data;
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

const fetchMediums = async () => {
  try {
    const response = await fetch('/api/mediums/');
    if (!response.ok) throw new Error('Failed to fetch mediums');
    const result = await response.json();
    mediums.value = result.data;
  } catch (error) {
    console.error(error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load mediums.',
      color: 'red',
    });
  } finally {
    isMediumsLoading.value = false;
  }
};

const fetchTopics = async () => {
  try {
    const response = await fetch('/api/topics/');
    if (!response.ok) {
      throw new Error('Failed to fetch topics');
    }
    const result = await response.json();
    topics.value = result.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load topics.',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    isTopicsLoading.value = false;
  }
};

const fetchTags = async () => {
  try {
    const response = await fetch('/api/tags/');
    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }
    const result = await response.json();
    tags.value = result.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load tags.',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    isTagsLoading.value = false;
  }
};

const fetchCountries = async () => {
  try {
    const response = await fetch('/api/countries/');
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const result = await response.json();
    countries.value = result.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load countries.',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    isCountriesLoading.value = false;
  }
};

const submitLanguage = async () => {
  if (!currentLanguageCode.value) {
    toast.add({
      title: 'Error!',
      description: 'Please select a language first.',
      color: 'red',
      timeout: 3000,
    });
    return;
  }

  const languageFields = {
    title: material.value.title[currentLanguageCode.value],
    author: material.value.author[currentLanguageCode.value],
    short_description: material.value.short_description[currentLanguageCode.value],
    full_text: material.value.full_text[currentLanguageCode.value],
    source: material.value.source[currentLanguageCode.value],
  };

  const newErrors = {};
  if (!languageFields.title) newErrors['title.' + currentLanguageCode.value] = ['Title is required'];
  if (!languageFields.author) newErrors['author.' + currentLanguageCode.value] = ['Author is required'];
  if (!languageFields.short_description) newErrors['short_description.' + currentLanguageCode.value] = ['Short description is required'];
  if (!languageFields.full_text) newErrors['full_text.' + currentLanguageCode.value] = ['Full text is required'];
  if (!languageFields.source) newErrors['source.' + currentLanguageCode.value] = ['Source is required'];

  if (Object.keys(newErrors).length > 0) {
    errors.value = newErrors;
    toast.add({
      title: 'Error!',
      description: 'Please fill in all required fields for the selected language.',
      color: 'red',
      timeout: 3000,
    });
    return;
  }

  toast.add({
    title: 'Success!',
    description: `Fields for ${currentLanguageCode.value} saved locally. Select another language or save the material.`,
    color: 'green',
    timeout: 3000,
  });
};

const createMaterial = async () => {
  try {
    loading.value = true;
    const payload = toRaw(material.value);
    payload.location = {
      type: 'Point',
      coordinates: [payload.location.coordinates?.[0], payload.location.coordinates?.[1]],
    };
    console.log(payload.location);
    console.log(payload)
    const languageCodes = languages.value.map(lang => lang.code);
    let hasValidLanguage = false;
    for (const code of languageCodes) {
      if (
          payload.title[code] &&
          payload.author[code] &&
          payload.short_description[code] &&
          payload.full_text[code] &&
          payload.source[code]
      ) {
        hasValidLanguage = true;
        break;
      }
    }
    if (!hasValidLanguage) {
      errors.value['language_fields'] = ['At least one language must have all fields filled.'];
      throw new Error('Language fields incomplete');
    }
    const response = await fetch('/api/materials/', {
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
      } else {
        throw new Error('Unknown error occurred');
      }
    } else {
      toast.add({
        title: 'Success!',
        description: 'Material has been created successfully',
        color: 'blue',
        timeout: 3000,
      });
      await router.push('/');
    }
  } catch (error) {
    if (!Object.keys(errors.value).length) {
      toast.add({
        title: 'Error!',
        description: 'Failed to create material. Please try again.',
        color: 'red',
        timeout: 3000,
      });
    }
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchLanguages();
  await fetchTopics();
  await fetchCountries();
  await fetchTags();
  await fetchMediums();
  markerOptions.value.position = markerPosition.value;
});
</script>

<!--<template>-->
<!--  <div class="flex">-->
<!--    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">-->
<!--      <div class="bg-blue-600 rounded-t-lg">-->
<!--        <h1 class="text-xl text-white p-4">Create Material</h1>-->
<!--      </div>-->
<!--      <div class="p-4">-->
<!--        <div class="mb-4">-->
<!--          <label for="language" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Language ID <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <select-->
<!--              v-model="material.language_id"-->
<!--              class="bg-white text-black w-full p-2 border"-->
<!--              :class="{'border-red-500': errors['language_id']}"-->
<!--              required-->
<!--              :disabled="isLanguagesLoading"-->
<!--          >-->
<!--            <option value="" disabled>-->
<!--              {{ isLanguagesLoading ? 'Loading languages...' : 'Select a language' }}-->
<!--            </option>-->
<!--            <option-->
<!--                v-for="language in languages"-->
<!--                :key="language.id"-->
<!--                :value="language.id"-->
<!--            >-->
<!--              {{ language.name }}-->
<!--            </option>-->
<!--          </select>-->
<!--          <p v-if="errors['language_id']" class="text-red-500 text-sm mt-1">-->
<!--            {{ errors['language_id'][0] }}-->
<!--          </p>-->
<!--          <div v-if="!isLanguagesLoading && languages.length === 0" class="text-red-500 text-sm mt-1">-->
<!--            No languages available. Please try again later.-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Topic ID <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <select-->
<!--              v-model="material.topic_id"-->
<!--              class="bg-white text-black w-full p-2 border"-->
<!--              :class="{'border-red-500': errors['topic_id']}"-->
<!--              required-->
<!--              :disabled="isTopicsLoading"-->
<!--          >-->
<!--            <option value="" disabled>-->
<!--              {{ isTopicsLoading ? 'Loading topics...' : 'Select a topic' }}-->
<!--            </option>-->
<!--            <option-->
<!--                v-for="topic in topics"-->
<!--                :key="topic.id"-->
<!--                :value="topic.id"-->
<!--            >-->
<!--              {{ topic.name.en }}-->
<!--            </option>-->
<!--          </select>-->
<!--          <p v-if="errors['topic_id']" class="text-red-500 text-sm mt-1">-->
<!--            {{ errors['topic_id'][0] }}-->
<!--          </p>-->
<!--          <div v-if="!isTopicsLoading && topics.length === 0" class="text-red-500 text-sm mt-1">-->
<!--            No topics available. Please try again later.-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="country" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Country <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <select-->
<!--              v-model="material.country_id"-->
<!--              class="bg-white text-black w-full p-2 border"-->
<!--              :class="{'border-red-500': errors['country_id']}"-->
<!--              required-->
<!--              :disabled="isCountriesLoading"-->
<!--          >-->
<!--            <option value="" disabled>-->
<!--              {{ isCountriesLoading ? 'Loading country...' : 'Select a country' }}-->
<!--            </option>-->
<!--            <option-->
<!--                v-for="country in countries"-->
<!--                :key="country.id"-->
<!--                :value="country.id"-->
<!--            >-->
<!--              {{ country.name.en }}-->
<!--            </option>-->
<!--          </select>-->
<!--          <p v-if="errors['country_id']" class="text-red-500 text-sm mt-1">-->
<!--            {{ errors['country_id'][0] }}-->
<!--          </p>-->
<!--          <div v-if="!isCountriesLoading && countries.length === 0" class="text-red-500 text-sm mt-1">-->
<!--            No countries available. Please try again later.-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="poster" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Poster <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.poster"-->
<!--              class="bg-white text-black placeholder-black w-full p-2 border"-->
<!--              :class="{'border-red-500': !material.poster && errors.poster}"-->
<!--              placeholder="Enter poster"-->
<!--              required-->
<!--          />-->
<!--          <p v-if="errors.poster" class="text-red-500 text-sm mt-1">{{ errors.poster[0] }}</p>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Title <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.title.en"-->
<!--              class="bg-white text-black w-full placeholder-black p-2 border"-->
<!--              :class="{'border-red-500': errors['title.en']}"-->
<!--              placeholder="Enter title"-->
<!--              required-->
<!--          />-->
<!--          <p v-if="errors['title.en']" class="text-red-500 text-sm mt-1">-->
<!--            {{ errors['title.en'][0] }}-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="author" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Author <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.author.en"-->
<!--              class="bg-white text-black w-full placeholder-black p-2 border"-->
<!--              :class="{'border-red-500': errors['author.en']}"-->
<!--              placeholder="Enter author"-->
<!--              required-->
<!--          />-->
<!--          <p v-if="errors['author.en']" class="text-red-500 text-sm mt-1">-->
<!--            {{ errors['author.en'][0] }}-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="short_description" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Short Description <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.short_description.en"-->
<!--              class="bg-white text-black w-full placeholder-black p-2 border"-->
<!--              :class="{'border-red-500': errors['short_description.en']}"-->
<!--              placeholder="Enter short description"-->
<!--              required-->
<!--          />-->
<!--          <p v-if="errors['short_description.en']" class="text-red-500 text-sm mt-1">-->
<!--            {{ errors['short_description.en'][0] }}-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="start_year" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Start Year <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              type="number"-->
<!--              v-model="material.start_year"-->
<!--              class="bg-white text-black placeholder-black w-full p-2 border"-->
<!--              :class="{'border-red-500': !material.start_year && errors.start_year}"-->
<!--              placeholder="Enter start year"-->
<!--              required-->
<!--          />-->
<!--          <p v-if="errors.start_year" class="text-red-500 text-sm mt-1">{{ errors.start_year[0] }}</p>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="end_year" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            End Year <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              type="number"-->
<!--              v-model="material.end_year"-->
<!--              class="bg-white text-black placeholder-black w-full p-2 border"-->
<!--              :class="{'border-red-500': !material.end_year && errors.end_year}"-->
<!--              placeholder="Enter end year"-->
<!--              required-->
<!--          />-->
<!--          <p v-if="errors.end_year" class="text-red-500 text-sm mt-1">{{ errors.end_year[0] }}</p>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="medium" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Medium <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <select-->
<!--              v-model="material.medium"-->
<!--              class="bg-white text-black w-full p-2 border"-->
<!--              :class="{'border-red-500': errors['medium']}"-->
<!--              required-->
<!--              :disabled="isMediumsLoading"-->
<!--          >-->
<!--            <option value="" disabled>-->
<!--              {{ isMediumsLoading ? 'Loading mediums...' : 'Select a medium' }}-->
<!--            </option>-->
<!--            <option-->
<!--                v-for="medium in mediums"-->
<!--                :key="medium.value"-->
<!--                :value="medium.value"-->
<!--            >-->
<!--              {{ medium.label }}-->
<!--            </option>-->
<!--          </select>-->
<!--          <p v-if="errors['medium']" class="text-red-500 text-sm mt-1">-->
<!--            {{ errors['medium'][0] }}-->
<!--          </p>-->
<!--        </div>-->



<!--        <div class="mb-4">-->
<!--          <label for="full_text" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Full Text <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.full_text.en"-->
<!--              class="bg-white text-black placeholder-black w-full p-2 border"-->
<!--              :class="{'border-red-500': errors['full_text.en']}"-->
<!--              placeholder="Enter full text"-->
<!--              required-->
<!--          />-->
<!--          <p v-if="errors['full_text.en']" class="text-red-500 text-sm mt-1">-->
<!--            {{ errors['full_text.en'][0] }}-->
<!--          </p>-->
<!--        </div>-->


<!--        <div class="mb-4">-->
<!--          <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Tags ID <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <div class="relative">-->
<!--            <select-->
<!--                v-model="material.tags"-->
<!--                multiple-->
<!--                class="form-multiselect block w-full pl-3 pr-10 py-2 text-base rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"-->
<!--                :class="{-->
<!--        'border-red-500 ring-red-500': errors['tags'],-->
<!--        'border-gray-300': !errors['tags'],-->
<!--        'opacity-50 bg-gray-100': isTagsLoading-->
<!--      }"-->
<!--                :disabled="isTagsLoading"-->
<!--                style="min-height: 120px;"-->
<!--            >-->
<!--              <option-->
<!--                  v-if="isTagsLoading"-->
<!--                  disabled-->
<!--                  class="text-gray-500"-->
<!--              >-->
<!--                Loading tags...-->
<!--              </option>-->

<!--              <template v-else>-->
<!--                <option-->
<!--                    disabled-->
<!--                    class="text-gray-400"-->
<!--                    :selected="material.tags.length === 0"-->
<!--                >-->
<!--                  Select tags (use Ctrl/Cmd for multiple)-->
<!--                </option>-->
<!--                <option-->
<!--                    v-for="tag in tags"-->
<!--                    :key="tag.id"-->
<!--                    :value="tag.id"-->
<!--                    class="px-3 py-2  hover:bg-blue-50 transition-colors"-->
<!--                >-->
<!--                  {{ tag.name.en }}-->
<!--                </option>-->
<!--              </template>-->
<!--            </select>-->
<!--            <div-->
<!--                v-if="!isTagsLoading && tags.length === 0"-->
<!--                class="absolute inset-0 bg-white flex items-center justify-center rounded-lg border border-dashed border-gray-200"-->
<!--            >-->
<!--      <span class="text-red-400 text-sm">-->
<!--         No tags available-->
<!--      </span>-->
<!--            </div>-->
<!--          </div>-->

<!--          <p-->
<!--              v-if="errors['tags']"-->
<!--              class="text-red-500 text-sm mt-1 flex items-center"-->
<!--          >-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">-->
<!--              <path fill-rule="evenodd"-->
<!--                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"-->
<!--                    clip-rule="evenodd"/>-->
<!--            </svg>-->
<!--            {{ errors['tags'][0] }}-->
<!--          </p>-->
<!--        </div>-->


<!--        <div class="mb-6">-->
<!--          <label class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Select Location <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <client-only>-->
<!--            <LocationSelector-->
<!--                :api-key="$config.public.googleMapsApiKey"-->
<!--                v-model="location"-->
<!--                style="height: 500px; width: 100%; position: relative"-->
<!--            />-->
<!--          </client-only>-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="book_url" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Book URl <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.book_url"-->
<!--              class="bg-white text-black placeholder-black w-full p-2 border"-->
<!--              :class="{'border-red-500': !material.book_url && errors.book_url}"-->
<!--              placeholder="Enter book url"-->
<!--              required-->
<!--          >-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="video" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Video <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.video"-->
<!--              class="bg-white text-black placeholder-black w-full p-2 border"-->
<!--              :class="{'border-red-500': !material.video && errors.video}"-->
<!--              placeholder="Enter video"-->
<!--              required-->
<!--          >-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="source_url" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Source URl <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.source_url"-->
<!--              class="bg-white text-black placeholder-black w-full p-2 border"-->
<!--              :class="{'border-red-500': !material.source_url && errors.source_url}"-->
<!--              placeholder="Enter source url"-->
<!--              required-->
<!--          >-->
<!--        </div>-->
<!--        <div class="mb-4">-->
<!--          <label for="source" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Source <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.source.en"-->
<!--              class="bg-white text-black placeholder-black w-full p-2 border"-->
<!--              :class="{'border-red-500': errors['source.en']}"-->
<!--              placeholder="Enter source"-->
<!--              required-->
<!--          />-->
<!--          <p v-if="errors['source.en']" class="text-red-500 text-sm mt-1">-->
<!--            {{ errors['source.en'][0] }}-->
<!--          </p>-->
<!--        </div>-->


<!--        <div class="mb-4">-->
<!--          <label for="author_url" class="block text-sm font-medium text-gray-700 mb-2">-->
<!--            Author URl <span class="text-red-500">*</span>-->
<!--          </label>-->
<!--          <input-->
<!--              v-model="material.author_url"-->
<!--              class="bg-white text-black placeholder-black w-full p-2 border"-->
<!--              :class="{'border-red-500': !material.author_url && errors.author_url}"-->
<!--              placeholder="Enter author url"-->
<!--              required-->
<!--          >-->
<!--        </div>-->
<!--        <div class="flex justify-center gap-4">-->
<!--          <button-->
<!--              @click="router.push('/countries')"-->
<!--              class="bg-gray-500 p-3 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-sm"-->
<!--          >-->
<!--            Cancel-->
<!--          </button>-->
<!--          <button-->
<!--              @click="createMaterial"-->
<!--              class="bg-blue-500 p-3 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-sm"-->
<!--              :disabled="loading"-->
<!--          >-->
<!--            <span v-if="loading">Saving...</span>-->
<!--            <span v-else>Save Changes</span>-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script setup>-->
<!--import {ref, onMounted} from 'vue';-->
<!--import {useRouter} from 'vue-router';-->
<!--import LocationSelector from "~/components/LocationSelector.vue";-->

<!--definePageMeta({-->
<!--  layout: 'navbar',-->
<!--});-->

<!--const toast = useToast();-->
<!--const router = useRouter();-->
<!--const loading = ref(false);-->
<!--const isLanguagesLoading = ref(true);-->
<!--const isTopicsLoading = ref(true);-->
<!--const isTagsLoading = ref(true);-->
<!--const isCountriesLoading = ref(true);-->
<!--const isCodesLoading = ref(true);-->
<!--const isMediumsLoading = ref(true);-->
<!--const errors = ref({});-->
<!--const languages = ref([]);-->
<!--const code = ref([]);-->
<!--const topics = ref([]);-->
<!--const tags = ref([]);-->
<!--const countries = ref([]);-->
<!--const mediums = ref([]);-->
<!--const material = ref({-->
<!--  language_id: '',-->
<!--  topic_id: '',-->
<!--  country_id: '',-->
<!--  poster: '',-->
<!--  title: {},-->
<!--  author: {},-->
<!--  short_description: {},-->
<!--  start_year: '',-->
<!--  end_year: '',-->
<!--  medium: '',-->
<!--  full_text: {},-->
<!--  book_url: '',-->
<!--  video: '',-->
<!--  source_url: '',-->
<!--  source: {},-->
<!--  tags: [],-->
<!--  author_url: '',-->
<!--  location: {coordinates: [40.180438, 44.488690]},-->
<!--});-->


<!--const markerPosition = ref({-->
<!--  lat: material.value.location.coordinates[0],-->
<!--  lng: material.value.location.coordinates[1],-->
<!--});-->

<!--const markerOptions = ref({-->
<!--  position: markerPosition.value,-->
<!--  draggable: true,-->
<!--});-->

<!--const location = computed({-->
<!--  get: () => ({-->
<!--    lat: material.value.location.coordinates[0],-->
<!--    lng: material.value.location.coordinates[1],-->
<!--  }),-->
<!--  set: (newLocation) => {-->
<!--    material.value.location.coordinates = [newLocation.lat, newLocation.lng];-->
<!--  },-->
<!--});-->

<!--const fetchLanguages = async () => {-->
<!--  try {-->
<!--    const response = await fetch('/api/languages/');-->
<!--    if (!response.ok) {-->
<!--      throw new Error('Failed to fetch languages');-->
<!--    }-->
<!--    const result = await response.json();-->
<!--    languages.value = result.data;-->
<!--  } catch (error) {-->
<!--    console.error('Error fetching languages:', error);-->
<!--    toast.add({-->
<!--      title: 'Error!',-->
<!--      description: 'Failed to load languages.',-->
<!--      color: 'red',-->
<!--      timeout: 3000,-->
<!--    });-->
<!--  } finally {-->
<!--    isLanguagesLoading.value = false;-->
<!--  }-->
<!--};-->


<!--const fetchMediums = async () => {-->
<!--  try {-->
<!--    const response = await fetch('/api/mediums/');-->
<!--    if (!response.ok) throw new Error('Failed to fetch mediums');-->
<!--    const result = await response.json();-->
<!--    mediums.value = result.data;-->
<!--  } catch (error) {-->
<!--    console.error(error);-->
<!--    toast.add({-->
<!--      title: 'Error!',-->
<!--      description: 'Failed to load mediums.',-->
<!--      color: 'red'-->
<!--    });-->
<!--  } finally {-->
<!--    isMediumsLoading.value = false;-->
<!--  }-->
<!--};-->

<!--const fetchTopics = async () => {-->
<!--  try {-->
<!--    const response = await fetch('/api/topics/');-->
<!--    if (!response.ok) {-->
<!--      throw new Error('Failed to fetch topics');-->
<!--    }-->
<!--    const result = await response.json();-->
<!--    topics.value = result.data;-->
<!--  } catch (error) {-->
<!--    console.error('Error fetching topics:', error);-->
<!--    toast.add({-->
<!--      title: 'Error!',-->
<!--      description: 'Failed to load topics.',-->
<!--      color: 'red',-->
<!--      timeout: 3000,-->
<!--    });-->
<!--  } finally {-->
<!--    isTopicsLoading.value = false;-->
<!--  }-->
<!--};-->

<!--const fetchCodes = async () => {-->
<!--  try {-->
<!--    const response = await fetch('/api/languages/');-->
<!--    if (!response.ok) {-->
<!--      throw new Error('Failed to fetch codes');-->
<!--    }-->
<!--    const result = await response.json();-->
<!--    const codes = result.data.map((item) => item.code);-->
<!--    console.log(codes);-->
<!--    code.value = codes;-->
<!--  } catch (error) {-->
<!--    console.error('Error fetching codes:', error);-->
<!--    toast.add({-->
<!--      title: 'Error!',-->
<!--      description: 'Failed to load codes.',-->
<!--      color: 'red',-->
<!--      timeout: 3000,-->
<!--    });-->
<!--  } finally {-->
<!--    isCodesLoading.value = false;-->
<!--  }-->
<!--};-->

<!--const fetchTags = async () => {-->
<!--  try {-->
<!--    const response = await fetch('/api/tags/');-->
<!--    if (!response.ok) {-->
<!--      throw new Error('Failed to fetch tags');-->
<!--    }-->
<!--    const result = await response.json();-->
<!--    tags.value = result.data;-->
<!--  } catch (error) {-->
<!--    console.error('Error fetching tags:', error);-->
<!--    toast.add({-->
<!--      title: 'Error!',-->
<!--      description: 'Failed to load tags.',-->
<!--      color: 'red',-->
<!--      timeout: 3000,-->
<!--    });-->
<!--  } finally {-->
<!--    isTagsLoading.value = false;-->
<!--  }-->
<!--};-->


<!--const fetchCountries = async () => {-->
<!--  try {-->
<!--    const response = await fetch('/api/countries/');-->
<!--    if (!response.ok) {-->
<!--      throw new Error('Failed to fetch countries');-->
<!--    }-->
<!--    const result = await response.json();-->
<!--    countries.value = result.data;-->
<!--  } catch (error) {-->
<!--    console.error('Error fetching countries:', error);-->
<!--    toast.add({-->
<!--      title: 'Error!',-->
<!--      description: 'Failed to load countries.',-->
<!--      color: 'red',-->
<!--      timeout: 3000,-->
<!--    });-->
<!--  } finally {-->
<!--    isCountriesLoading.value = false;-->
<!--  }-->
<!--};-->


<!--const createMaterial = async () => {-->
<!--  try {-->
<!--    loading.value = true;-->
<!--    errors.value = {};-->
<!--    const payload = toRaw(material.value);-->
<!--    payload.location = {-->
<!--      type: 'Point',-->
<!--      coordinates: payload.location?.coordinates || [],-->
<!--    };-->
<!--    console.log('Payload:', payload); // Проверяем содержимое перед отправкой-->
<!--    const response = await fetch('/api/materials/', {-->
<!--      method: 'POST',-->
<!--      headers: {-->
<!--        'Content-Type': 'application/json',-->
<!--        Accept: 'application/json',-->
<!--      },-->
<!--      body: JSON.stringify(payload),-->
<!--    });-->
<!--    if (!response.ok) {-->
<!--      const data = await response.json();-->
<!--      if (data.errors) {-->
<!--        errors.value = data.errors;-->
<!--      } else {-->
<!--        throw new Error('Unknown error occurred');-->
<!--      }-->
<!--    } else {-->
<!--      toast.add({-->
<!--        title: 'Success!',-->
<!--        description: 'Material has been created successfully',-->
<!--        color: 'blue',-->
<!--        timeout: 3000,-->
<!--      });-->
<!--      await router.push('/');-->
<!--    }-->
<!--  } catch (error) {-->
<!--    if (!Object.keys(errors.value).length) {-->
<!--      toast.add({-->
<!--        title: 'Error!',-->
<!--        description: 'Failed to create material. Please try again.',-->
<!--        color: 'red',-->
<!--        timeout: 3000,-->
<!--      });-->
<!--    }-->
<!--  } finally {-->
<!--    loading.value = false;-->
<!--  }-->
<!--};-->


<!--onMounted(async () => {-->
<!--  await fetchLanguages();-->
<!--  await fetchTopics();-->
<!--  await fetchCountries();-->
<!--  await fetchCodes();-->
<!--  await fetchTags();-->
<!--  await fetchMediums();-->
<!--  markerOptions.value.position = markerPosition.value;-->
<!--});-->
<!--</script>-->