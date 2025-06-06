<template>
  <div class="flex flex-col">
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg mb-[30px]">
      <div class="bg-blue-600 rounded-t-lg">
        <h1 class="text-xl text-white p-4">Edit Material</h1>
      </div>
      <div class="p-6">
        <div class="mb-4">
          <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">
            Topic ID <span class="text-red-500">*</span>
          </label>
          <select
              v-model="material.topic_id"
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
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
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
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
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              :class="{'border-red-500': errors.poster}"
              placeholder="Enter poster URL"
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
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
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
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
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
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
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
            Tags <span class="text-red-500">*</span>
          </label>
          <USelectMenu
              v-model="material.tags"
              color="blue"
              :options="tags"
              multiple
              option-attribute="label"
              value-attribute="value"
              placeholder="Select Tags"
              class="h-[60px] text-black"
              :disabled="isTagsLoading"
          />
          <div v-if="!isTagsLoading && tags.length === 0" class="text-red-500 text-sm mt-1">
            No tags available. Please try again later.
          </div>
          <p v-if="errors['tags']" class="text-red-500 text-sm mt-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"/>
            </svg>
            {{ errors['tags'][0] }}
          </p>
          <div class="mt-4" v-if="!isTagsLoading">
            <h3 class="text-sm font-medium text-gray-700 mb-2">Selected Tags:</h3>
            <div v-if="material.tags.length === 0" class="text-gray-500 text-sm">
              No tags selected
            </div>
            <div v-else class="flex flex-wrap gap-2">
              <span
                  v-for="tagId in material.tags"
                  :key="tagId"
                  class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
              >
                {{ findTagName(tagId) }}
                <button
                    @click="removeTag(tagId)"
                    class="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                    title="Remove tag"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"/>
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label for="book_url" class="block text-sm font-medium text-gray-700 mb-2">
            Book URL <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.book_url"
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              :class="{'border-red-500': !material.book_url && errors.book_url}"
              placeholder="Enter book URL"
              required
          />
          <p v-if="errors.book_url" class="text-red-500 text-sm mt-1">{{ errors.book_url[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="video" class="block text-sm font-medium text-gray-700 mb-2">
            Video <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.video"
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              :class="{'border-red-500': !material.video && errors.video}"
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
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              :class="{'border-red-500': !material.source_url && errors.source_url}"
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
              class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              :class="{'border-red-500': !material.author_url && errors.author_url}"
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
          <p v-if="errors['location']" class="text-red-500 text-sm mt-1">
            {{ errors['location'][0] }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-full bg-white rounded-lg max-w-[1500px] shadow-lg">
      <div class="p-4">
        <div class="mb-4">
          <label for="language" class="block text-sm font-medium text-gray-700 mb-2">
            Language <span class="text-red-500">*</span>
          </label>
          <USelectMenu
              v-model="material.language_id"
              color="blue"
              :options="languages"
              option-attribute="label"
              value-attribute="value"
              placeholder="Select a language"
              :loading="isLanguagesLoading"
              class="w-full"
          />
          <p v-if="errors['language_id']" class="text-red-500 text-sm mt-1">
            {{ errors['language_id'][0] }}
          </p>
        </div>
        <div v-if="currentLanguageCode">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              Title ({{ currentLanguageCode }}) <span class="text-red-500">*</span>
            </label>
            <input
                v-model="material.title[currentLanguageCode]"
                class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                :class="{'border-red-500': errors['title.' + currentLanguageCode]}"
                :placeholder="'Enter title in ' + currentLanguageCode"
                :disabled="!currentLanguageCode"
                required
            />
            <p v-if="errors['title.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
              {{ errors['title.' + currentLanguageCode][0] }}
            </p>
          </div>
          <div class="mb-4">
            <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
              Author ({{ currentLanguageCode }}) <span class="text-red-500">*</span>
            </label>
            <input
                v-model="material.author[currentLanguageCode]"
                class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                :class="{'border-red-500': errors['author.' + currentLanguageCode]}"
                :placeholder="'Enter author in ' + currentLanguageCode"
                :disabled="!currentLanguageCode"
                required
            />
            <p v-if="errors['author.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
              {{ errors['author.' + currentLanguageCode][0] }}
            </p>
          </div>
          <div class="mb-4">
            <label for="short_description" class="block text-sm font-medium text-gray-700 mb-2">
              Short Description ({{ currentLanguageCode }}) <span class="text-red-500">*</span>
            </label>
            <input
                v-model="material.short_description[currentLanguageCode]"
                class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                :class="{'border-red-500': errors['short_description.' + currentLanguageCode]}"
                :placeholder="'Enter short description in ' + currentLanguageCode"
                :disabled="!currentLanguageCode"
                required
            />
            <p v-if="errors['short_description.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
              {{ errors['short_description.' + currentLanguageCode][0] }}
            </p>
          </div>
          <div class="mb-4">
            <label for="full_text" class="block text-sm font-medium text-gray-700 mb-2">
              Full Text ({{ currentLanguageCode }}) <span class="text-red-500">*</span>
            </label>
            <textarea
                v-model="material.full_text[currentLanguageCode]"
                class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                :class="{'border-red-500': errors['full_text.' + currentLanguageCode]}"
                :placeholder="'Enter full text in ' + currentLanguageCode"
                :disabled="!currentLanguageCode"
                required
                rows="6"
            ></textarea>
            <p v-if="errors['full_text.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
              {{ errors['full_text.' + currentLanguageCode][0] }}
            </p>
          </div>
          <div class="mb-4">
            <label for="source" class="block text-sm font-medium text-gray-700 mb-2">
              Source ({{ currentLanguageCode }}) <span class="text-red-500">*</span>
            </label>
            <input
                v-model="material.source[currentLanguageCode]"
                class="bg-white text-black w-full placeholder-gray-500 p-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                :class="{'border-red-500': errors['source.' + currentLanguageCode]}"
                :placeholder="'Enter source in ' + currentLanguageCode"
                :disabled="!currentLanguageCode"
                required
            />
            <p v-if="errors['source.' + currentLanguageCode]" class="text-red-500 text-sm mt-1">
              {{ errors['source.' + currentLanguageCode][0] }}
            </p>
          </div>
        </div>
        <div class="flex justify-center gap-4">
          <button
              @click="router.push('/countries')"
              class="bg-gray-500 p-3 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-sm"
          >
            Cancel
          </button>
          <button
              @click="updateMaterial"
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
import {ref, onMounted, watch, toRaw, computed, nextTick} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import LocationSelector from '~/components/LocationSelector.vue';

definePageMeta({
  layout: 'navbar',
});

const toast = useToast();
const router = useRouter();
const route = useRoute();
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
  location: {coordinates: []},
});

const markerPosition = ref({
  lat: material.value.location.coordinates[1] || 0,
  lng: material.value.location.coordinates[0] || 0,
});

const markerOptions = ref({
  position: markerPosition.value,
  draggable: true,
});

watch(
    markerPosition,
    (newPosition) => {
      if (newPosition) {
        material.value.location.coordinates = [newPosition.lng, newPosition.lat];
      }
    },
    {deep: true}
);

const initializeLanguageFields = () => {
  languages.value.forEach((language) => {
    material.value.title[language.code] = material.value.title[language.code] || '';
    material.value.author[language.code] = material.value.author[language.code] || '';
    material.value.short_description[language.code] = material.value.short_description[language.code] || '';
    material.value.full_text[language.code] = material.value.full_text[language.code] || '';
    material.value.source[language.code] = material.value.source[language.code] || '';
  });
};

watch(
    () => material.value.language_id,
    (newLanguageId) => {
      const selectedLanguage = languages.value.find((lang) => lang.value === newLanguageId);
      currentLanguageCode.value = selectedLanguage ? selectedLanguage.code : '';
      errors.value = {};
    }
);

const findTagName = (tagId) => {
  const tag = tags.value.find((t) => t.value === tagId);
  return tag ? tag.label : 'Unknown Tag';
};

const removeTag = (tagId) => {
  material.value.tags = material.value.tags.filter((id) => id !== tagId);
};

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
    console.error('Error fetching mediums:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load mediums. Please try again.',
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
    if (!response.ok) throw new Error('Failed to fetch topics');
    const result = await response.json();
    topics.value = result.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load topics. Please try again.',
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
    if (!response.ok) throw new Error('Failed to fetch tags');
    const result = await response.json();
    tags.value = result.data.map((tag) => ({
      label: tag.name.en,
      value: tag.id,
    }));
  } catch (error) {
    console.error('Error fetching tags:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load tags. Please try again.',
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
    if (!response.ok) throw new Error('Failed to fetch countries');
    const result = await response.json();
    countries.value = result.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load countries. Please try again.',
      color: 'red',
      timeout: 3000,
    });
  } finally {
    isCountriesLoading.value = false;
  }
};

const getMaterial = async () => {
  try {
    const response = await fetch(`/api/materials/${route.params.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch material');
    }
    const result = await response.json();
    if (!result) {
      throw new Error('Invalid data structure');
    }
    const data = result;
    material.value = {
      language_id: String(data.language_id || ''),
      topic_id: String(data.topic_id || ''),
      country_id: String(data.country_id || ''),
      poster: data.poster || '',
      title: data.title || {},
      author: data.author || {},
      short_description: data.short_description || {},
      full_text: data.full_text || {},
      source: data.source || {},
      start_year: String(data.start_year || ''),
      end_year: String(data.end_year || ''),
      medium: data.medium || '',
      tags: data.tags?.map((tag) => tag.id) || [],
      book_url: data.book_url || '',
      video: data.video || '',
      source_url: data.source_url || '',
      author_url: data.author_url || '',
      location: data.location || {coordinates: [0, 0]},
    };
    if (data.location?.coordinates?.length === 2) {
      const [lng, lat] = data.location.coordinates;
      markerPosition.value = {lng, lat};
      markerOptions.value.position = markerPosition.value;
    }
    if (languages.value.length) {
      const selectedLanguage = languages.value.find(
          (lang) => lang.value === String(data.language_id)
      );
      currentLanguageCode.value = selectedLanguage ? selectedLanguage.code : '';
    }
    initializeLanguageFields();
  } catch (error) {
    console.error('Error fetching material:', error);
    toast.add({
      title: 'Error!',
      description: 'Failed to load material. Please try again.',
      color: 'red',
      timeout: 3000,
    });
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
  if (!languageFields.short_description)
    newErrors['short_description.' + currentLanguageCode.value] = ['Short description is required'];
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

const location = computed({
  get: () => ({
    lat: material.value.location.coordinates[0] || 0,
    lng: material.value.location.coordinates[1] || 0,
  }),
  set: (newLocation) => {
    material.value.location.coordinates = [newLocation.lat, newLocation.lng];
  },
});

const updateMaterial = async () => {
  try {
    loading.value = true;
    errors.value = {};
    const newErrors = {};
    if (!material.value.language_id) newErrors['language_id'] = ['Language ID is required'];
    if (!material.value.topic_id) newErrors['topic_id'] = ['Topic ID is required'];
    if (!material.value.country_id) newErrors['country_id'] = ['Country ID is required'];
    if (!material.value.start_year) newErrors['start_year'] = ['Start year is required'];
    if (!material.value.end_year) newErrors['end_year'] = ['End year is required'];
    if (!material.value.medium) newErrors['medium'] = ['Medium is required'];
    if (!material.value.book_url) newErrors['book_url'] = ['Book URL is required'];
    if (!material.value.video) newErrors['video'] = ['Video URL is required'];
    if (!material.value.source_url) newErrors['source_url'] = ['Source URL is required'];
    if (!material.value.author_url) newErrors['author_url'] = ['Author URL is required'];
    if (!material.value.location.coordinates.length)
      newErrors['location'] = ['Location coordinates are required'];
    const languageCodes = languages.value.map((lang) => lang.code);
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
      newErrors['language_fields'] = ['At least one language must have all fields filled'];
    }
    if (Object.keys(newErrors).length > 0) {
      errors.value = newErrors;
      toast.add({
        title: 'Error!',
        description: 'Please fill in all required fields.',
        color: 'red',
        timeout: 3000,
      });
      return;
    }
    const payload = toRaw(material.value);
    payload.location = {
      type: 'Point',
      coordinates: payload.location.coordinates,
    };
    const response = await fetch(`/api/materials/${route.params.id}`, {
      method: 'PUT',
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
          description: 'Failed to update material. Please check the fields.',
          color: 'red',
          timeout: 3000,
        });
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } else {
      toast.add({
        title: 'Success!',
        description: 'Material has been updated successfully',
        color: 'green',
        timeout: 3000,
      });
      await router.push('/');
    }
  } catch (error) {
    console.error('Error updating material:', error);
    if (!Object.keys(errors.value).length) {
      toast.add({
        title: 'Error!',
        description: 'Failed to update material due to a network error. Please try again.',
        color: 'red',
        timeout: 3000,
      });
    }
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await nextTick();
  await fetchLanguages();
  await getMaterial();
  await fetchTopics();
  await fetchCountries();
  await fetchTags();
  await fetchMediums();
});
</script>