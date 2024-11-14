import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";

export const useAuth = defineStore("auth", () => {
  const router = useRouter();
  const accessToken = useStorage("access_token", "");
  const check = computed(() => !!accessToken.value);
  const user = ref(null);
  const loading = ref(false);
  const permissions = ref(null);

  function setAccessToken(value) {
    accessToken.value = value;
    window.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken.value}`;
  }

  async function login(accessToken) {
    setAccessToken(accessToken);
    await getAuthenticatedUser(true);
  }

  function destroyTokenAndRedirectTo(routeName = 'login') {
    setAccessToken(null);
    router.push({ name: routeName });
  }

  async function logout() {
    return window.axios.post("auth/destroy").then(() => {
      destroyTokenAndRedirectTo("login");
    });
  }

  async function getAuthenticatedUser(redirectToUsersPage = false) {
    loading.value = true;
    await window.axios.get('user').then(async (response) => {
        user.value = response.data.data;
        permissions.value = response.data.data.permissions
    }).finally(async () => {
      if (redirectToUsersPage) {
        await router.push({ name: "Users" });
        loading.value = false;
      } else {
        loading.value = false;
      }
    })
  }

  function can(permission) {
    return permissions.value?.includes(permission);
  }

  return {
    login,
    logout,
    destroyTokenAndRedirectTo,
    getAuthenticatedUser,
    check,
    user,
    loading,
    permissions,
    can
  }
});
