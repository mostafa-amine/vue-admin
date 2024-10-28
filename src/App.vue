<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { useColorModes } from '@coreui/vue'
import { useThemeStore } from '@/stores/theme.js'
import { useAuth } from '@/stores/auth';
import LinearProgress from './components/LinearProgress.vue';

const { isColorModeSet, setColorMode } = useColorModes(
  'coreui-free-vue-admin-template-theme',
)
const currentTheme = useThemeStore()

const auth = useAuth();

onMounted(async () => {
  await auth.getAuthenticatedUser();
});

onBeforeMount(async () => {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1])
  let theme = urlParams.get('theme')

  if (theme !== null && theme.match(/^[A-Za-z0-9\s]+/)) {
    theme = theme.match(/^[A-Za-z0-9\s]+/)[0]
  }

  if (theme) {
    setColorMode(theme)
    return
  }

  if (isColorModeSet()) {
    return
  }

  setColorMode(currentTheme.theme)
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <div v-if="auth.loading" class="d-flex align-items-center justify-content-center vh-100">
      <LinearProgress  />
    </div>
    <component
        :is="Component"
        v-if="!auth.loading"
    />
  </router-view>
</template>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
// We use those styles to show code examples, you should remove them in your application.
@import 'styles/examples';
</style>
