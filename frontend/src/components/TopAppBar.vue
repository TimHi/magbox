<script setup lang="ts">
import { PocketBaseService } from '../service/pocketBaseService';
import { useUserStore } from '../stores/user';
const pb = new PocketBaseService();
const user = useUserStore();
function login() {
    if (user.user.isLoggedIn) {
        pb.Logout();
    } else {
        pb.SignInUsingOAuth2().then(() => { console.debug("done") }).catch(() => console.debug("error loggin in"));
        console.log('login');
    }
}
</script>

<template>
    <h1>Magbox</h1>
    <el-button type="primary" @click="login">
        <p v-if="user.user.isLoggedIn">Logout</p>
        <p v-else>Login</p>
    </el-button>
</template>