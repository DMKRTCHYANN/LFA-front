<template>
  <div>
    <nuxt-link
        to="/languages/create"
        class="flex items-center justify-center max-w-[200px] w-full px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform"
    >
      Create new Language
    </nuxt-link>
    <UTable :rows="languages" :columns="columns">
      <template #image-data="{ row }">
        <img
            :src="`http://localhost:8000/storage/${row.image}`"
            alt="Language Image"
            class="w-[70px] h-[70px] object-cover rounded"
        />
      </template>
      <template #actions-data="{ row }">
        <div class="flex gap-4">
          <NuxtLink :to="`/languages/${row.id}/edit`">
            <img src="/images/edit.svg" alt="Edit" class="cursor-pointer w-7 h-7 dark:invert"/>
          </NuxtLink>
          <img
              src="/images/delete.svg"
              alt="Delete"
              class="cursor-pointer w-7 h-7 dark:invert"
              @click="handleDelete(row)"
          />
        </div>
      </template>
    </UTable>
    <UModal v-model="isModalOpen">
      <div class="p-4">
        <h3 class="text-lg font-medium mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete language "{{ selectedLanguage?.name }}"?</p>
        <div class="flex justify-end gap-3 mt-6">
          <UButton color="gray" @click="isModalOpen = false">Cancel</UButton>
          <UButton color="red" @click="deleteLanguageHandler">Delete</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'navbar'
})

const toast = useToast();
const languages = ref([])
const isModalOpen = ref(false)
const selectedLanguage = ref(null)
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'code', label: 'Code' },
  { key: 'image', label: 'Image' },
  { key: 'actions', label: 'Actions' },
]


const getLanguages = async () => {
  try {
    const { data } = await useFetch("/api/languages",)
    languages.value = data.value?.data || []
  } catch (err) {
    console.error("Error loading languages:", err)
  }
}

const deleteLanguageHandler = async () => {
  if (!selectedLanguage.value) return
  try {
    const { error } = await useFetch(`/api/languages/${selectedLanguage.value.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (error.value) {
      throw new Error(error.value.message || 'Failed to delete language')
    }
    languages.value = languages.value.filter(
        lang => lang.id !== selectedLanguage.value.id
    )
    await getLanguages()
    toast.add({
      title: 'Success!',
      description: 'Language deleted successfully.',
      color: 'red',
      timeout: 3000,
    });
    isModalOpen.value = false
    selectedLanguage.value = null
  } catch (err) {
    console.error('Error deleting language:', err)
  }
}

const handleDelete = (language) => {
  selectedLanguage.value = language
  isModalOpen.value = true
}

onMounted(async () => {
  await nextTick()
  await getLanguages()
})
</script>