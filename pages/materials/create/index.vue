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
            Title <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.title"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.title && errors.title}"
              placeholder="Enter title"
              required
          />
          <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
            Author <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.author"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.author && errors.author}"
              placeholder="Enter author"
              required
          />
          <p v-if="errors.author" class="text-red-500 text-sm mt-1">{{ errors.author[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="short_description" class="block text-sm font-medium text-gray-700 mb-2">
            Short Description <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.short_description"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.short_description && errors.short_description}"
              placeholder="Enter short description"
              required
          />
          <p v-if="errors.short_description" class="text-red-500 text-sm mt-1">{{ errors.short_description[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="start_year" class="block text-sm font-medium text-gray-700 mb-2">
            Start Year <span class="text-red-500">*</span>
          </label>
          <input
              type="date"
              v-model="material.start_year"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.start_year && errors.start_year}"
              required
          />
          <p v-if="errors.start_year" class="text-red-500 text-sm mt-1">{{ errors.start_year[0] }}</p>
        </div>
        <div class="mb-4">
          <label for="end_year" class="block text-sm font-medium text-gray-700 mb-2">
            End Year <span class="text-red-500">*</span>
          </label>
          <input
              type="date"
              v-model="material.end_year"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.end_year && errors.end_year}"
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
          <label for="full_text" class="block text-sm font-medium text-gray-700 mb-2">
            Full text <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.full_text"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.full_text && errors.full_text}"
              placeholder="Enter author"
              required
          />
          <p v-if="errors.full_text" class="text-red-500 text-sm mt-1">{{ errors.full_text[0] }}</p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Select  Location  <span class="text-red-500">*</span>
          </label>
          <LocationSelector
              :api-key="$config.public.googleMapsApiKey"
              v-model="location"
              style="height: 500px; width: 100%; position: relative"
          />
        </div>
        <div class="mb-4">
          <label for="book_url" class="block text-sm font-medium text-gray-700 mb-2">
            Book URl <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.book_url"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.book_url && errors.book_url}"
              placeholder="Enter book url"
              required
          >
        </div>


<!--        video_player-->


        <div class="mb-4">
          <label for="source_url" class="block text-sm font-medium text-gray-700 mb-2">
            Source URl <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.source_url"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.source_url && errors.source_url}"
              placeholder="Enter source url"
              required
          >
        </div>
        <div class="mb-4">
          <label for="source" class="block text-sm font-medium text-gray-700 mb-2">
            Source  <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.source"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.source && errors.source}"
              placeholder="Enter source"
              required
          >
        </div>
        <div class="mb-4">
          <label for="author_url" class="block text-sm font-medium text-gray-700 mb-2">
            Author URl <span class="text-red-500">*</span>
          </label>
          <input
              v-model="material.author_url"
              class="bg-white text-black placeholder-black w-full p-2 border"
              :class="{'border-red-500': !material.author_url && errors.author_url}"
              placeholder="Enter author url"
              required
          >
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
import {ref, onMounted} from 'vue';
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
const isCountriesLoading = ref(true);
const isMediumsLoading = ref(true);
const errors = ref({});
const languages = ref([]);
const topics = ref([]);
const countries = ref([]);
const mediums = ref([]);
const material = ref({
  language_id: '',
  topic_id: '',
  country_id: '',
  poster: '',
  title: '',
  author: '',
  short_description: '',
  start_year: '',
  end_year: '',
  medium: '',
  full_text: '',
  book_url: '',
  video_player: '',
  source_url: '',
  source: '',
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
  set: (newLocation) => {
    material.value.location.coordinates = [newLocation.lat, newLocation.lng];
  },
});

const fetchLanguages = async () => {
  try {
    const response = await fetch('/api/languages/');
    if (!response.ok) {
      throw new Error('Failed to fetch languages');
    }
    const result = await response.json();
    languages.value = result.data;
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
      color: 'red'
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


const createMaterial = async () => {
  try {
    loading.value = true;
    errors.value = {};
    const response = await fetch('/api/materials/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(material.value),
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
  await fetchMediums();
  markerOptions.value.position = markerPosition.value;
});
</script>