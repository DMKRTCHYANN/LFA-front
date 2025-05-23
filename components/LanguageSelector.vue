<template>
</template>

<script setup>


import {onMounted} from "vue";

const languages = ref([]);


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
  }
};


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


onMounted(async () => {
  await fetchLanguages();
})
</script>