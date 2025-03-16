<script setup lang="ts">
const appVersion: string = APP_VERSION;
</script>
<template>
  <div class="flex flex-row gap-1">
    <p class="font-thin">Version</p>
    <p class="font-thin" data-testid="lbl-version-number">{{ appVersion }}</p>
    <p class="font-thin">
      <a class="text-green-500" href="https://github.com/TimHi/magbox">Github</a>
    </p>
  </div>
</template>
