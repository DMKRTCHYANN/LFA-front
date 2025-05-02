<template>
<div>
  <button
    type="submit"
    class="flex items-center justify-center max-w-[200px] w-full px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform "
  >
    Create new Language
  </button>
  <UTable :rows="languages.data" :columns="columns" @delete="handleDelete">
    <template #image-data="{ row }">
      <img
          :src="row.image === null ? 'http://localhost:8000/storage/images/V6Cj9SwjEqg5h7kJG6fCkO0kKaWOy1U5WtFjfthx.png' : `http://localhost:8000/storage/${row.image}`"
          alt="User Image" class="w-12 h-12 rounded-full object-cover"/>
    </template>
    <template #actions-data="{ row }">
      <div class="flex gap-4">
        <NuxtLink :to="`/users/${row.id}/edit`">
          <img src="/images/edit.svg" alt="Edit" class="cursor-pointer w-7 h-7 dark:invert"/>
        </NuxtLink>
        <img
            src="/images/delete.svg"
            alt="Delete"
            class="cursor-pointer w-7 h-7 dark:invert"
            @click="handleDelete(row)"
        />
        <Modal
            v-model:is-open="isModalOpen"
            :user="selectedUser"
            @confirm="deleteUserHandler"
        />
      </div>
    </template>
  </UTable>
</div>
</template>
<script setup>
definePageMeta({
  layout: 'navbar'
})

const languages = ref([]);
const isModalOpen = ref(false);
const selectedLanguage = ref(null);
const columns = [
  {key: 'id', label: 'ID'},
  {key: 'name', label: 'Name'},
  {key: 'code', label: 'Code'},
  {key: 'image', label: 'Image'},
];


const getLanguages = async () => {
  try {
    const response = await useFetch("/api/languages");
    languages.value = response.data || [];
  } catch (err) {
    console.error("Error loading languages:", err);
  }
};


const handleDelete = (user) => {
  selectedLanguage.value = user;
  isModalOpen.value = true;
};

onMounted(async () => {
  await nextTick();
  await getLanguages();
});
</script>