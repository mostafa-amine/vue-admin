<script setup>
import { defineProps } from "vue";
const props = defineProps(["errors", "field"]);
</script>

<template>
  <div
    v-if="props?.errors?.value?.[props.field]?.length"
    class="text-danger"
    style="font-size: 13px;"
  >
    <p v-for="message in props.errors.value[props.field]" :key="message">
      {{ message }}
    </p>
  </div>
</template>
