<script setup>
import { watchEffect } from "vue";
import { useRole } from "@/stores/roles";
import { RouterLink, useRoute } from "vue-router";
import LinearProgress from "@/components/LinearProgress.vue";

const store = useRole();
const route = useRoute();

watchEffect(async () => {
  store.getRole({ uuid: route.params.uuid });
});


const deleteRole = () => {
    const role = {
      uuid: route.params.uuid
    }

    let deleteConfirmation = confirm("Are you sure you want to delete this role?");

    if(deleteConfirmation){
        store.deleteRole(role)
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
      <CButton class="text-light" size="sm" color="danger" @click="deleteRole()">Delete Role</CButton>
      <RouterLink :to="{name: 'roles.edit', params: {uuid: route.params.uuid}}">
        <CButton class="text-light ms-2" size="sm" color="primary">Edit Role</CButton>
      </RouterLink>
    </div>
  </div>

  <LinearProgress v-if="store.loading" />

  <template v-else>
    <div class="col-md-3">
      <CFormLabel for="name" class="fw-bold">Name</CFormLabel> <br>
      <p>
        {{ store.form.name }}
      </p>
    </div>

    <div>
      <CFormLabel for="name" class="fw-bold">Permissions</CFormLabel> <br>
      <span v-for="(permission, index) in store.form.permissions" class="me-3 badge bg-primary" :key="index">
        {{ permission.name }}
      </span>
    </div>
  </template>
</template>
