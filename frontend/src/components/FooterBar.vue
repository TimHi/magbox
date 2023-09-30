<script setup lang="ts">
import { ElText } from 'element-plus';
const appVersion = APP_VERSION;
</script>
<template>
    <ElText>Version </ElText>
    <ElText data-testid="lbl-version-number">{{ appVersion }}</ElText>
    <ElText> - <a href="https://github.com/TimHi/magbox">Github</a>
    </ElText>
</template>

<style></style>