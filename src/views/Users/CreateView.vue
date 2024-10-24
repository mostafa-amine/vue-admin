<script setup>
import { onBeforeUnmount } from "vue";
import { useUser } from "@/stores/users";

const store = useUser();

onBeforeUnmount(store.resetForm);

</script>

<template>
  <CForm @submit.prevent="store.storeUser()" novalidate>
    <div class="row">
      <div class="col-md-6">
        <CFormLabel for="image">Image</CFormLabel>
        <CFormInput :invalid="store.errors.value?.image" @change="store.form.image = $event.target.files[0]" type="file" id="image"/>
        <ValidationError :errors="store.errors" field="image" />
      </div>

      <div class="col-md-6 mb-2">
        <CFormLabel for="name">Name</CFormLabel>
        <CFormInput :invalid="store.errors.value?.name" v-model="store.form.name" type="text" id="name" placeholder="Name"/>
        <ValidationError :errors="store.errors" field="name" />
      </div>

      <div class="col-md-6">
        <CFormLabel for="email">Email</CFormLabel>
        <CFormInput :invalid="store.errors.value?.email" v-model="store.form.email" type="email" id="email" placeholder="name@example.com"/>
        <ValidationError :errors="store.errors" field="email" />
      </div>
    </div>

    <CButton color="success" class="text-light mt-5" type="submit" :disabled="store.loading">
      Create
      <CSpinner v-if="store.loading" as="span" size="sm" aria-hidden="true"/>
    </CButton>
  </CForm>
</template>
