import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useToast = defineStore('toast', () => {
  const notification = ref({
    title: '',
    content: ''
  });

  const toasts = ref([]);

  function createToast(title, content) {
    toasts.value.push({
      title: title,
      content: content
    })
  }

  function resetToasts() {
    toasts.value = [];
  }

  return {
    notification,
    toasts,
    createToast,
    resetToasts
  }
})
