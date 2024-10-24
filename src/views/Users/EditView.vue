<script setup>
import { watchEffect, onBeforeUnmount } from "vue";
import { useUser } from "@/stores/users";
import { useRoute } from "vue-router";
import LinearProgress from "@/components/LinearProgress.vue";

const store = useUser();
const route = useRoute();

onBeforeUnmount(store.resetForm);

watchEffect(async () => {
  store.getUser({ uuid: route.params.uuid });
});
</script>

<template>
  <LinearProgress v-if="store.loading" />

  <CForm v-else @submit.prevent="store.updateUser({ uuid: route.params.uuid })" novalidate>
    <div class="row">
      <div class="col-md-6 mb-2">
        <CFormLabel for="image">Image</CFormLabel>
        <div class="my-2">
          <CImage fluid :src="store.form.imageUrl" width="150" height="150"/>
        </div>
        <CFormInput
          :invalid="store.errors.value?.image"
          @change="store.form.image = $event.target.files[0]"
          type="file"
          id="image"
        />
        <ValidationError :errors="store.errors" field="image" />
      </div>

      <div class="col-md-6">
        <CFormLabel for="name">Name</CFormLabel>
        <CFormInput v-model="store.form.name" type="text" id="name" placeholder="Name"/>
        <ValidationError :errors="store.errors" field="name" />
      </div>

      <div class="col-md-6">
        <CFormLabel for="email">Email</CFormLabel>
        <CFormInput v-model="store.form.email" type="email" id="email" placeholder="name@example.com"/>
        <ValidationError :errors="store.errors" field="email" />
      </div>
    </div>

    <CButton color="success" class="text-light mt-5" type="submit" :disabled="store.loading">
      Update
      <CSpinner v-if="store.loading" as="span" size="sm" aria-hidden="true"/>
    </CButton>
  </CForm>
</template>
