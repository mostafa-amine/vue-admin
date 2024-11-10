<script setup>
import { watchEffect, onBeforeUnmount } from "vue";
import { useUser } from "@/stores/users";
import { useRoute } from "vue-router";
import { useRole } from "@/stores/roles";
import Multiselect from 'vue-multiselect';

const store = useUser();
const route = useRoute();
const roleStore = useRole();

onBeforeUnmount(store.resetForm);

watchEffect(async () => {
  store.getUser({ uuid: route.params.uuid });
  roleStore.fetchAllRoles();
});
</script>

<template>
  <CForm @submit.prevent="store.updateUser({ uuid: route.params.uuid })" novalidate>
    <div class="row">
      <div class="col-md-6 mb-2">
        <CFormLabel for="image">Image</CFormLabel>
        <div class="my-2">
          <CImage fluid :src="store.form.imageUrl" width="150" height="150"/>
        </div>
        <CFormInput
          :invalid="store.errors.hasOwnProperty('image')"
          @change="store.form.image = $event.target.files[0]"
          type="file"
          id="image"
        />
        <ValidationError :errors="store.errors" field="image" />
      </div>

      <div class="col-md-6">
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
      Update
      <CSpinner v-if="store.loading" as="span" size="sm" aria-hidden="true"/>
    </CButton>
  </CForm>
</template>
