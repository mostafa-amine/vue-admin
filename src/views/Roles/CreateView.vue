<script setup>
import Multiselect from 'vue-multiselect'
import { onBeforeUnmount, onMounted, watchEffect } from "vue";
import { useRole } from "@/stores/roles";

const store = useRole();

watchEffect(async () => {
  store.fetchPermissions();
});

onMounted(store.resetForm);

onBeforeUnmount(store.resetForm);

</script>

<template>
  <CForm @submit.prevent="store.storeRole()" novalidate>
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
      Create
      <CSpinner v-if="store.loading" as="span" size="sm" aria-hidden="true"/>
    </CButton>
  </CForm>
</template>



