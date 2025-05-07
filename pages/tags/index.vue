<template>
  <div>
    <nuxt-link
        to="/tags/create"
        class="flex items-center justify-center max-w-[200px] w-full px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform"
    >
      Create new Tag
    </nuxt-link>
    <UTable :rows="tags" :columns="columns">
      <template #actions-data="{ row }">
        <div class="flex gap-4">
          <NuxtLink :to="`/tags/${row.id}/edit`">
            <img src="/images/edit.svg" alt="Edit" class="cursor-pointer w-7 h-7 "/>
          </NuxtLink>
          <img
              src="/images/delete.svg"
              alt="Delete"
              class="cursor-pointer w-7 h-7 "
              @click="handleDelete(row)"
          />
        </div>
      </template>
    </UTable>
    <UModal v-model="isModalOpen">
      <div class="p-4">
        <h3 class="text-lg font-medium mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete tag "{{ selectedTag?.name.en }}"?</p>
        <div class="flex justify-end gap-3 mt-6">
          <UButton color="gray" @click="isModalOpen = false">Cancel</UButton>
          <UButton color="red" @click="deleteTagHandler">Delete</UButton>
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
const tags = ref([])
const isModalOpen = ref(false)
const selectedTag = ref(null)
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name.en', label: 'Name' },
  { key: 'actions', label: 'Actions' },
]


const getTags = async () => {
  try {
    const { data } = await useFetch("/api/tags",)
    tags.value = data.value?.data || []
  } catch (err) {
    console.error("Error loading tags:", err)
  }
}

const deleteTagHandler = async () => {
  if (!selectedTag.value) return
  try {
    const { error } = await useFetch(`/api/tags/${selectedTag.value.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (error.value) {
      throw new Error(error.value.message || 'Failed to delete tag')
    }
    tags.value = tags.value.filter(
        tag => tag.id !== selectedTag.value.id
    )
    await getTags();
    toast.add({
      title: 'Success!',
      description: 'Tag has been deleted successfully.',
      color: 'blue',
      timeout: 3000,
    });
    isModalOpen.value = false
    selectedTag.value = null
  } catch (err) {
    toast.add({
      title: 'Error!',
      description: 'Error deleting Tag',
      color: 'red',
      timeout: 3000,
    });
  }
}

const handleDelete = (tag) => {
  selectedTag.value = tag
  isModalOpen.value = true
}

onMounted(async () => {
  await nextTick();
  await getTags();
})
</script>