<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user';

const { user } = storeToRefs(useUserStore());
</script>

<template>
    <p v-if="user.isLoggedIn">Reacting to Store Login </p>
    <p v-else>User is logged out</p>
</template>