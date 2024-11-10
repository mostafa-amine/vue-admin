<script setup>
import { useRole } from '@/stores/roles';
import { useAuth } from '@/stores/auth';
import { CIcon } from '@coreui/icons-vue';
import { cilOptions } from '@coreui/icons';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { RouterLink, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import EmptyResults from '@/components/EmptyResults.vue';
import LinearProgress from '@/components/LinearProgress.vue';

const store = useRole();
const router = useRouter();
const auth = useAuth();

onMounted(() => {
  store.fetchRoles();
});

const navigateToView = (uuid) => {
  router.push({ name: "roles.detail", params: {'uuid': uuid} });
}
</script>

<template>
  <div class="row mb-3 align-items-center">
    <div class="col">
      <div class="d-flex gap-3">
        <div style="width: 100px">
          <CFormSelect
            @change="() => {
              $nextTick(() => {
                store.fetchRoles(true)
              })
            }"
            v-model="store.queries.perPage"
            :options="[
              { label: '10', value: '10' },
              { label: '25', value: '25' },
              { label: '50', value: '50' },
              { label: '100', value: '100' }
            ]">
          </CFormSelect>
        </div>

        <div style="width: 300px">
          <CFormInput
            type="text"
            id="search"
            placeholder="Search by name"
            v-model.lazy="store.queries.search"
            @change="() => store.fetchRoles(true)"
          />
        </div>
      </div>
    </div>

    <div class="col-auto">
      <RouterLink :to="{ name: 'roles.create' }">
        <CButton color="primary">Create Role</CButton>
      </RouterLink>
    </div>
  </div>

  <CTable responsive hover>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
        <CTableHeaderCell scope="col">permissions</CTableHeaderCell>
        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
      </CTableRow>
    </CTableHead>

    <CTableBody v-if="store.loading">
      <CTableRow>
        <CTableDataCell colspan="5">
          <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
            <LinearProgress />
          </div>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>

    <template v-if="!store.loading">
      <EmptyResults v-if="store.data?.data?.length === 0"/>
      <CTableBody v-else>
        <CTableRow v-for="(role, index) in store.data?.data" :key="index" style="cursor: pointer;" @click="navigateToView(role.uuid)">
          <CTableDataCell>
            {{ role.name }}
          </CTableDataCell>
          <CTableDataCell v-html="store.getPermissions(role)">
          </CTableDataCell>
          <CTableDataCell @click.stop>
            <CDropdown >
              <CDropdownToggle color="transparent" class="p-0" style="color: rgb(0 0 0 / 0%);">
                <CIcon :icon="cilOptions" class="text-dark" size="lg"/>
              </CDropdownToggle>
              <CDropdownMenu>
                <RouterLink v-if="auth.can('roles.edit')" class="dropdown-item" :to="{name: 'roles.edit', params: {uuid: role.uuid}}">
                  Edit
                </RouterLink>
                <RouterLink v-if="auth.can('roles.view')" class="dropdown-item" :to="{name: 'roles.detail', params: {uuid: role.uuid}}">
                  View
                </RouterLink>
              </CDropdownMenu>
            </CDropdown>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </template>
  </CTable>

  <Bootstrap5Pagination
    v-if="store.data"
    :data="store.data"
    @pagination-change-page="store.changePage"
  />
</template>
