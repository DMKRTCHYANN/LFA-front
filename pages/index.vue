<template>
  <div>
    <div class="flex items-center justify-between p-4">
      <nuxt-link
          to="/materials/create"
          class="flex items-center justify-center max-w-[200px] w-full px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all duration-300 transform"
      >
        Create new Material
      </nuxt-link>
      <img
          @click="logout"
          src="/images/logout.png"
          alt="Logout"
          class="w-10 h-10 cursor-pointer hover:opacity-75 transition-opacity duration-200"
      />
    </div>
    <div class="overflow-x-auto">
      <UTable :rows="materials" :columns="columns">
        <template #actions-data="{ row }">
          <div class="flex gap-4">
            <NuxtLink :to="`/materials/${row.id}/edit`">
              <img src="/images/edit.svg" alt="Edit" class="cursor-pointer w-7 h-7"/>
            </NuxtLink>
            <img
                src="/images/delete.svg"
                alt="Delete"
                class="cursor-pointer w-7 h-7"
                @click="handleDelete(row)"
            />
          </div>
        </template>
      </UTable>
    </div>
    <UModal v-model="isModalOpen">
      <div class="p-4">
        <h3 class="text-lg font-medium mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete material "{{ selectedMaterial?.title.en }}"?</p>
        <div class="flex justify-end gap-3 mt-6">
          <UButton color="gray" @click="isModalOpen = false">Cancel</UButton>
          <UButton color="red" @click="deleteMaterialHandler">Delete</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {useCookie} from '#app';

definePageMeta({
  middleware: ['auth'],
  layout: 'navbar'
});

const router = useRouter();
const toast = useToast();
const materials = ref([])
const isModalOpen = ref(false)
const selectedMaterial = ref(null)
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'title.en', label: 'Title' },
  { key: 'author.en', label: 'Author' },
  { key: 'actions', label: 'Actions' },
]

const getMaterials = async () => {
  try {
    const response = await $fetch("/api/materials");
    materials.value = response || [];
  } catch (err) {
    console.error("Error fetching materials:", err);
  }
};



const deleteMaterialHandler = async () => {
  if (!selectedMaterial.value) return
  try {
    const { error } = await useFetch(`/api/materials/${selectedMaterial.value.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (error.value) {
      throw new Error(error.value.message || 'Failed to delete material')
    }
    materials.value = materials.value.filter(
        mate => mate.id !== selectedMaterial.value.id
    )
    await getMaterials();
    toast.add({
      title: 'Success!',
      description: 'Material has been deleted successfully.',
      color: 'blue',
      timeout: 3000,
    });
    isModalOpen.value = false
    selectedMaterial.value = null
  } catch (err) {
    toast.add({
      title: 'Error!',
      description: 'Error deleting material',
      color: 'red',
      timeout: 3000,
    });
  }
}

const logout = () => {
  const authToken = useCookie('auth_token');
  authToken.value = null;
  router.push('/login');
};

const handleDelete = (material) => {
  selectedMaterial.value = material
  isModalOpen.value = true
}

onMounted(async () => {
  await nextTick()
  await getMaterials();
})
</script> 