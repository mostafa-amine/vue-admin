import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRoute } from 'vue-router'
import router from "@/router";
import { useToast } from "vue-toastification";

export const useRole = defineStore("roles", () => {
  const toast = useToast();
  const loading = ref(false);
  const errors = ref({});
  const data = ref();
  const permissions = ref([]);
  const allRoles = ref([]);

  const queries = ref({
    sort: "",
    search: "",
    page: 1,
    perPage: "50",
    ...useRoute().query,
  });

  const form = reactive({
    name: "",
    permissions: []
  });

  function resetForm() {
    form.name = "";
    form.permissions = [];

    errors.value = {};
  }

  function fetchAllRoles() {
    loading.value = true;

    window.axios.get('roles/all')
    .then((response) => {
      allRoles.value = response.data.data
    })
    .finally(() => {
      loading.value = false;
    });
  }

  function fetchPermissions() {
    loading.value = true;

    window.axios.get('permissions')
    .then((response) => {
      permissions.value = response.data.data
    })
    .finally(() => {
      loading.value = false;
    });
  }

  function fetchRoles(resetPageFlag = false) {
    if (resetPageFlag) {
      resetPage();
    }

    loading.value = true;

    window.axios.get(`/roles?${new URLSearchParams(queries.value).toString()}`)
    .then((response) => {
      data.value = response.data
    })
    .finally(() => {
      loading.value = false;
    });
    router.push({ query: queries.value })
  }

  function resetPage() {
    queries.value.page = 1;
  }

  function storeRole() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    window.axios
      .post("roles", form)
      .then(() => {
        router.push({ name: "roles.index" });
        toast.success('Role Created');
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  function updateRole(role) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    window.axios
      .put(`roles/${role.uuid}`, form)
      .then(() => {
        router.push({ name: "roles.index" });
        toast.success("Role Updated");
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        loading.value = false
      });
  }

  function changePage(page) {
    queries.value.page = page
    fetchRoles()
  }

  function getRole(role) {
    loading.value = true;
    window.axios.get(`roles/${role.uuid}`).then((response) => {
      form.name = response.data.data.name;
      form.permissions = response.data.data.permissions;
    }).finally(() => (loading.value = false));
  }

  function deleteRole(role) {
    loading.value = true;
    window.axios.delete(`roles/${role.uuid}`).then(fetchRoles).finally(() => {
      toast.success("Role Deleted");
      router.push({ name: "users.index" });
    });
  }

  function getPermissions(role) {
    return role.permissions.map(item => `<span class="badge bg-primary">${item.name}</span>`).join(' ');
  }

  return {
    fetchRoles,
    changePage,
    getRole,
    updateRole,
    resetForm,
    deleteRole,
    storeRole,
    getPermissions,
    fetchPermissions,
    fetchAllRoles,
    allRoles,
    permissions,
    form,
    errors,
    queries,
    data,
    loading,
  };
});
