import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRoute } from 'vue-router'
import router from "@/router";
import { useToast } from "vue-toastification";

export const useUser = defineStore("users", () => {
  const toast = useToast();
  const loading = ref(false);
  const errors = ref({});
  const data = ref();

  const queries = ref({
    sort: "",
    search: "",
    page: 1,
    perPage: "50",
    ...useRoute().query,
  });

  const form = reactive({
    name: "",
    email: "",
    image: "",
    imageUrl: "",
    role: null
  });

  function resetForm() {
    form.name = "";
    form.email = "";
    form.role = null

    errors.value = {};
  }

  function fetchUsers(resetPageFlag = false) {
    if (resetPageFlag) {
      resetPage();
    }

    loading.value = true;
    window.axios.get(`/users?${new URLSearchParams(queries.value).toString()}`)
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

  function storeUser() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    let serializedForm = new FormData()
    for (let item in form) {
        if (form.hasOwnProperty(item)) {
          if (item === 'role') {
            serializedForm.append('role_id', form[item]?.id)
          } else {
            serializedForm.append(item, form[item])
          }
        }
    }

    window.axios
      .post("users", serializedForm)
      .then(() => {
        router.push({ name: "Users" });
        toast.success('User Created');
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  function updateUser(user) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    let serializedForm = new FormData()
    for (let item in form) {
      if (item === 'role') {
        serializedForm.append('role_id', form[item]?.id)
      } else {
        serializedForm.append(item, form[item])
      }
    }

    window.axios
      .post(`users/${user.uuid}`, serializedForm)
      .then(() => {
        router.push({ name: "Users" });
        toast.success("User Updated");
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
    fetchUsers()
  }

  function getUser(user) {
    loading.value = true;
    window.axios.get(`users/${user.uuid}`).then((response) => {
      form.name = response.data.data.name;
      form.email = response.data.data.email;
      form.imageUrl = response.data.data.image;
      form.role = response.data.data.role;
    }).finally(() => (loading.value = false));
  }

  function deleteUser(user) {
    loading.value = true;
    window.axios.delete(`users/${user.uuid}`).then(fetchUsers).finally(() => {
      toast.success("User Deleted");
      router.push({ name: "Users" });
    });
  }

  return {
    fetchUsers,
    changePage,
    getUser,
    updateUser,
    resetForm,
    deleteUser,
    storeUser,
    form,
    errors,
    queries,
    data,
    loading,
  };
});
