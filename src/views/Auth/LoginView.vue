<script setup>
import { onBeforeUnmount } from "vue";
import { useLogin } from "@/stores/login";
import { RouterLink } from "vue-router";

const store = useLogin();

onBeforeUnmount(store.resetForm);
</script>

<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="store.handleSubmit" novalidate>
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <div class="mb-3">
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormInput
                        v-model="store.form.email"
                        type="email"
                        placeholder="Email"
                        autocomplete="email"
                      />
                    </CInputGroup>
                    <ValidationError :errors="store.errors" field="email" />
                  </div>
                  <div class="mb-4">
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput
                        v-model="store.form.password"
                        type="password"
                        placeholder="Password"
                        autocomplete="current-password"
                      />
                    </CInputGroup>
                    <ValidationError :errors="store.errors" field="password" />
                  </div>
                  <CRow>
                    <CCol :xs="6">
                      <CButton :disabled="store.loading" color="primary" class="px-4" type="submit">
                        Login
                        <CSpinner v-if="store.loading" as="span" size="sm" aria-hidden="true"/>
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <RouterLink :to="{'name': 'register'}">
                    <CButton color="light" variant="outline" class="mt-3">
                      Register Now!
                    </CButton>
                  </RouterLink>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
