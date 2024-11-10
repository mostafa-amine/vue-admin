<script setup>
import Multiselect from 'vue-multiselect';
import { onBeforeUnmount, watchEffect } from "vue";
import { useRole } from "@/stores/roles";
import { useRoute } from 'vue-router';

const store = useRole();
const route = useRoute();

watchEffect(async () => {
  store.getRole({uuid: route.params.uuid})
  store.fetchPermissions();
});

onBeforeUnmount(store.resetForm);

</script>

<template>
  <CForm @submit.prevent="store.updateRole({ uuid: route.params.uuid })" novalidate>
    <div class="row">
      <div class="col-md-6 mb-2">
        <CFormLabel for="name">Name</CFormLabel>
        <CFormInput :invalid="store.errors.hasOwnProperty('name')" v-model="store.form.name" type="text" id="name" placeholder="Admin..."/>
        <ValidationError :errors="store.errors" field="name" />
    </div>

    <div class="col-md-6 mb-2">
        <CFormLabel for="permissions">Permissions</CFormLabel>
        <Multiselect
          :close-on-select="false"
          :multiple="true"
          v-model="store.form.permissions"
          track-by="name"
          label="name"
          :options="store.permissions">
        </Multiselect>
        <ValidationError :errors="store.errors" field="permissions" />
    </div>
    </div>
    <CButton color="success" class="text-light mt-5" type="submit" :disabled="store.loading">
      Update
      <CSpinner v-if="store.loading" as="span" size="sm" aria-hidden="true"/>
    </CButton>
  </CForm>
</template>
