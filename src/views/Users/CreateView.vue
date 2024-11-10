<script setup>
import Multiselect from 'vue-multiselect';
import { onBeforeUnmount, watchEffect } from "vue";
import { useUser } from "@/stores/users";
import { useRole } from "@/stores/roles";

const store = useUser();
const roleStore = useRole();

watchEffect(async () => {
  roleStore.fetchAllRoles();
});

onBeforeUnmount(store.resetForm);

</script>

<template>
  <CForm @submit.prevent="store.storeUser()" novalidate>
    <div class="row">
      <div class="col-md-6">
        <CFormLabel for="image">Image</CFormLabel>
        <CFormInput :invalid="store.errors.hasOwnProperty('image')" @change="store.form.image = $event.target.files[0]" type="file" id="image"/>
        <ValidationError :errors="store.errors" field="image" />
      </div>

      <div class="col-md-6 mb-2">
        <CFormLabel for="name">Name</CFormLabel>
        <CFormInput :invalid="store.errors.hasOwnProperty('name')" v-model="store.form.name" type="text" id="name" placeholder="Name"/>
        <ValidationError :errors="store.errors" field="name" />
      </div>

      <div class="col-md-6">
        <CFormLabel for="email">Email</CFormLabel>
        <CFormInput :invalid="store.errors.hasOwnProperty('email')" v-model="store.form.email" type="email" id="email" placeholder="name@example.com"/>
        <ValidationError :errors="store.errors" field="email" />
      </div>

      <div class="col-md-6">
        <CFormLabel for="role">Role</CFormLabel>
        <Multiselect
          v-model="store.form.role"
          track-by="name"
          label="name"
          :options="roleStore.allRoles"
        />
        <ValidationError :errors="store.errors" field="role_id" />
      </div>
    </div>

    <CButton color="success" class="text-light mt-5" type="submit" :disabled="store.loading">
      Create
      <CSpinner v-if="store.loading" as="span" size="sm" aria-hidden="true"/>
    </CButton>
  </CForm>
</template>
