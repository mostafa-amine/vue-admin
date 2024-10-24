<script setup>
import {onBeforeUnmount} from 'vue';
import { useRegister } from '@/stores/register';
import {CSpinner} from '@coreui/vue'

const store = useRegister();

onBeforeUnmount(store.resetForm);
</script>

<template>
  <div class="bwrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm @submit.prevent="store.handleSubmit" novalidate>
                <h1>Register</h1>
                <p class="text-body-secondary">Create your account</p>
                <div class="mb-3">
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput v-model="store.form.name" placeholder="Name" autocomplete="name" required />
                  </CInputGroup>
                  <ValidationError :errors="store.errors" field="name" />
                </div>

                <div class="mb-3">
                  <CInputGroup>
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type="email" v-model="store.form.email" placeholder="Email" autocomplete="email" required />
                  </CInputGroup>
                  <ValidationError :errors="store.errors" field="email" />
                </div>

                <div class="mb-3">
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="store.form.password"
                      type="password"
                      placeholder="Password"
                      autocomplete="new-password"
                      required
                    />
                  </CInputGroup>
                  <ValidationError :errors="store.errors" field="password" />
                </div>

                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="store.form.password_confirmation"
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                    required
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton :disabled="store.loading" class="text-light" type="submit" color="success">
                    Create Account
                    <CSpinner v-if="store.loading" as="span" size="sm" aria-hidden="true"/>
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
