<script setup>
import { watchEffect } from "vue";
import { useUser } from "@/stores/users";
import { RouterLink, useRoute } from "vue-router";
import LinearProgress from "@/components/LinearProgress.vue";

const store = useUser();
const route = useRoute();

watchEffect(async () => {
  store.getUser({ uuid: route.params.uuid });
});

const deleteUser = () => {
    const user = {
      uuid: route.params.uuid
    }

    let deleteConfirmation = confirm("Are you sure you want to delete this user?");

    if(deleteConfirmation){
        store.deleteUser(user)
    }
}

</script>

<template>

<div class="row mb-3 align-items-center">
    <div class="col">
      <div class="d-flex gap-3">
        <div style="width: 100px">
        </div>
      </div>
    </div>

    <div class="col-auto">
      <CButton class="text-light" size="sm" color="danger" @click="deleteUser()">Delete User</CButton>
      <RouterLink :to="{name: 'users.edit', params: {uuid: route.params.uuid}}">
        <CButton class="text-light ms-2" size="sm" color="primary">Edit User</CButton>
      </RouterLink>
    </div>
  </div>

  <LinearProgress v-if="store.loading" />

  <div v-else class="row">
    <div class="col-md-3">
      <CFormLabel for="name" class="fw-bold">Image</CFormLabel> <br>
      <CImage fluid :src="store.form.imageUrl" width="150" height="150"/>
    </div>

    <div class="col-md-3">
      <CFormLabel for="name" class="fw-bold">Name</CFormLabel>
      <p>
        {{ store.form.name }}
      </p>
    </div>

    <div class="col-md-3">
      <CFormLabel for="name" class="fw-bold">Email</CFormLabel>
      <p>
        {{ store.form.name }}
      </p>
    </div>
  </div>
</template>
