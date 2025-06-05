<template>
  <div class="flex flex-col ">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg mb-[30px]">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Create Material</h1>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">
            Topic ID <span class="text-red-500">*</span>
          </label>
          <select
              v-model="material.topic_id"
              class="bg-white text-black w-full p-2 border rounded-lg"
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
              class="bg-white text-black w-full p-2 border rounded-lg"
              :class="{'border-red-500': errors['country_id']}"
              required
              :disabled="isCountriesLoading"
          >
            <option value="" disabled>
              {{ isCountriesLoading ? 'Loading countries...' : 'Select a country' }}
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
            Poster
          </label>
          <input
              v-model="material.poster"
              class="bg-white text-black placeholder-gray-500 w-full p-2 border rounded-lg"
              :class="{'border-red-500': errors.poster}"
              placeholder="Enter poster"
              maxlength="255"
          />
          <p v-if="errors.poster" class="text-red-500 text-sm mt-1">{{ errors.poster[0] }}</p>
        </div>

        <div class="mb-4">
          <label for="start_year" class="block text-sm font-medium text-gray-700 mb-2">
            Start Year <span class="text-red-500">*</span>
          </label>
          <input
              type="number"
              v-model="material.start_year"
              class="bg-white text-black placeholder-gray-500 w-full p-2 border rounded-lg"
              :class="{'border-red-500': errors.start_year}"
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
              class="bg-white text-black placeholder-gray-500 w-full p-2 border rounded-lg"
              :class="{'border-red-500': errors.end_year}"
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
              class="bg-white text-black w-full p-2 border rounded-lg"
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
            Tags ID
          </label>
          <div class="relative">
            <USelectMenu
                v-model="material.tags"
                color="blue"
                :options="tags"
                multiple
                option-attribute="label"
                value-attribute="value"
                placeholder="Select Tags"
                class="h-[60px] text-black"
            />
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
        <div class="mb-4">
          <label for="book_url" class="block text-sm font-medium text-gray-700 mb-2">
            Book URL <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.book_url"
              type="url"
              class="bg-white text-black placeholder-gray-500 w-full p-2 border rounded-lg"
              :class="{'border-red-500': errors.book_url}"
              placeholder="Enter book URL"
              required
          />
          <p v-if="errors.book_url" class="text-red-500 text-sm mt-1">{{ errors.book_url[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="video" class="block text-sm font-medium text-gray-700 mb-2">
            Video URL <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.video"
              type="url"
              class="bg-white text-black placeholder-gray-500 w-full p-2 border rounded-lg"
              :class="{'border-red-500': errors.video}"
              placeholder="Enter video URL"
              required
          />
          <p v-if="errors.video" class="text-red-500 text-sm mt-1">{{ errors.video[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="source_url" class="block text-sm font-medium text-gray-700 mb-2">
            Source URL <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.source_url"
              type="url"
              class="bg-white text-black placeholder-gray-500 w-full p-2 border rounded-lg"
              :class="{'border-red-500': errors.source_url}"
              placeholder="Enter source URL"
              required
          />
          <p v-if="errors.source_url" class="text-red-500 text-sm mt-1">{{ errors.source_url[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="author_url" class="block text-sm font-medium text-gray-700 mb-2">
            Author URL <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.author_url"
              type="url"
              class="bg-white text-black placeholder-gray-500 w-full p-2 border rounded-lg"
              :class="{'border-red-500': errors.author_url}"
              placeholder="Enter author URL"
              required
          />
          <p v-if="errors.author_url" class="text-red-500 text-sm mt-1">{{ errors.author_url[0] }}</p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Select Location <span class="text-red-500">*</span>
          </label>
          <LocationSelector
              :api-key="$config.public.googleMapsApiKey"
              v-model="location"
              style="height: 500px; width: 100%; position: relative"
          />
          <p v-if="errors['location']" class="text-red-500 text-sm mt-1">{{ errors['location'][0] }}</p>
          <p v-if="errors['location.coordinates.0']" class="text-red-500 text-sm mt-1">
            {{ errors['location.coordinates.0'][0] }}
          </p>
          <p v-if="errors['location.coordinates.1']" class="text-red-500 text-sm mt-1">
            {{ errors['location.coordinates.1'][0] }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="p-4">
        <div class="mb-4">
          <USelectMenu
              color="blue"
              v-model="material.language_id"
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
        <div v-if="currentLanguageCode">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              Title ({{ currentLanguageCode || 'Select a language' }}) <span class="text-red-500">*</span>
            </label>
            <input
                v-model="material.title[currentLanguageCode]"
                class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg"
                :class="{'border-red-500': errors['title.' + currentLanguageCode]}"
                :placeholder="'Enter title in ' + (currentLanguageCode || 'language')"
                :disabled="!currentLanguageCode"
                required
                maxlength="255"
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
                class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg"
                :class="{'border-red-500': errors['author.' + currentLanguageCode]}"
                :placeholder="'Enter author in ' + (currentLanguageCode || 'language')"
                :disabled="!currentLanguageCode"
                required
                maxlength="255"
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
                class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg"
                :class="{'border-red-500': errors['short_description.' + currentLanguageCode]}"
                :placeholder="'Enter short description in ' + (currentLanguageCode || 'language')"
                :disabled="!currentLanguageCode"
                required
                maxlength="255"
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
                class="bg-white text-black placeholder-gray-500 w-full p-2 border rounded-lg"
                :class="{'border-red-500': errors['full_text.' + currentLanguageCode]}"
                :placeholder="'Enter full text in ' + (currentLanguageCode || 'language')"
                :disabled="!currentLanguageCode"
                required
                maxlength="255"
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
                class="bg-white text-black placeholder-gray-500 w-full p-2 border rounded-lg"
                :class="{'border-red-500': errors['source.' + currentLanguageCode]}"
                :placeholder="'Enter source in ' + (currentLanguageCode || 'language')"
                :disabled="!currentLanguageCode"
                required
                maxlength="255"
            />
            <p v-if="errors['source.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
              {{ errors['source.' + currentLanguageCode][0] }}
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-4">
          <button
              @click="router.push('/')"
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
import {ref, onMounted, watch, computed, toRaw} from 'vue';
import {useRouter} from 'vue-router';
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
  location: {coordinates: [40.180438, 44.488690]},
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
});

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

watch(() => material.value.language_id, (newLanguageId) => {
  const selectedLanguage = languages.value.find(lang => lang.value === newLanguageId);
  currentLanguageCode.value = selectedLanguage ? selectedLanguage.code : '';


});

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
      timeout: 3000,
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
    tags.value = result.data.map((tag) => ({
      label: tag.name.en,
      value: tag.id,
    }));
    console.log()
    console.log(tags.value)
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

const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
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
    return false;
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
  else if (languageFields.title.length > 255) newErrors['title.' + currentLanguageCode.value] = ['Title must not exceed 255 characters'];

  if (!languageFields.author) newErrors['author.' + currentLanguageCode.value] = ['Author is required'];
  else if (languageFields.author.length > 255) newErrors['author.' + currentLanguageCode.value] = ['Author must not exceed 255 characters'];

  if (!languageFields.short_description) newErrors['short_description.' + currentLanguageCode.value] = ['Short description is required'];
  else if (languageFields.short_description.length > 255) newErrors['short_description.' + currentLanguageCode.value] = ['Short description must not exceed 255 characters'];

  if (!languageFields.full_text) newErrors['full_text.' + currentLanguageCode.value] = ['Full text is required'];
  else if (languageFields.full_text.length > 255) newErrors['full_text.' + currentLanguageCode.value] = ['Full text must not exceed 255 characters'];

  if (!languageFields.source) newErrors['source.' + currentLanguageCode.value] = ['Source is required'];
  else if (languageFields.source.length > 255) newErrors['source.' + currentLanguageCode.value] = ['Source must not exceed 255 characters'];

  if (Object.keys(newErrors).length > 0) {
    errors.value = {...errors.value, ...newErrors};
    toast.add({
      title: 'Error!',
      description: 'Please fill in all required fields for the selected language.',
      color: 'red',
      timeout: 3000,
    });
    return false;
  }

  toast.add({
    title: 'Success!',
    description: `Fields for ${currentLanguageCode.value} saved locally. Select another language or save the material.`,
    color: 'green',
    timeout: 3000,
  });
  return true;
};

const createMaterial = async () => {
  try {
    console.log('Payload:', JSON.stringify(toRaw(material.value), null, 2));
    console.log(material.value)
    loading.value = true;
    errors.value = {};

    const newErrors = {};

    if (!material.value.language_id) newErrors.language_id = ['Language ID is required'];
    if (!material.value.topic_id) newErrors.topic_id = ['Topic ID is required'];
    if (!material.value.country_id) newErrors.country_id = ['Country ID is required'];
    if (!material.value.start_year) newErrors.start_year = ['Start year is required'];
    if (!material.value.end_year) newErrors.end_year = ['End year is required'];
    if (!material.value.medium) newErrors.medium = ['Medium is required'];
    if (!material.value.book_url) newErrors.book_url = ['Book URL is required'];
    else if (!validateUrl(material.value.book_url)) newErrors.book_url = ['Invalid Book URL'];

    if (!material.value.video) newErrors.video = ['Video URL is required'];
    else if (!validateUrl(material.value.video)) newErrors.video = ['Invalid Video URL'];

    if (!material.value.source_url) newErrors.source_url = ['Source URL is required'];
    else if (!validateUrl(material.value.source_url)) newErrors.source_url = ['Invalid Source URL'];

    if (!material.value.author_url) newErrors.author_url = ['Author URL is required'];
    else if (!validateUrl(material.value.author_url)) newErrors.author_url = ['Invalid Author URL'];

    if (material.value.poster && material.value.poster.length > 255) {
      newErrors.poster = ['Poster must not exceed 255 characters'];
    }

    const languageCodes = languages.value.map(lang => lang.code);
    let hasValidLanguage = false;
    for (const code of languageCodes) {
      if (
          material.value.title[code] &&
          material.value.author[code] &&
          material.value.short_description[code] &&
          material.value.full_text[code] &&
          material.value.source[code]
      ) {
        hasValidLanguage = true;
        break;
      }
    }
    if (!hasValidLanguage) {
      newErrors.language_fields = ['At least one language must have all fields filled.'];
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

    const payload = toRaw(material.value);
    payload.location = {
      type: 'Point',
      coordinates: [
        payload.location.coordinates[0],
        payload.location.coordinates[1],
      ],
    };

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
        description: 'Material has been created successfully',
        color: 'blue',
        timeout: 3000,
      });
      await router.push('/');
    }
  } catch (error) {
    console.error('Error creating material:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to create material. Please try again.',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await Promise.all([
    fetchLanguages(),
    fetchTopics(),
    fetchCountries(),
    fetchTags(),
    fetchMediums(),
  ]);
  markerOptions.value.position = markerPosition.value;
});
</script>
