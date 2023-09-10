<script setup lang="ts">
import router from '../router';
import { PocketBaseService } from '../service/pocketBaseService';
import { useUserStore } from '../stores/user';
const pb = new PocketBaseService();
const user = useUserStore();

function login() {
    if (user.user.isLoggedIn) {
        pb.Logout();
    } else {
        pb.SignInUsingOAuth2().then(() => {
            console.log("Success loggin in, Nav back to home");
            router.push('/');
        }).catch(() => console.debug("error loggin in"));
        console.log('login');
    }
}
</script>
<template>
    <h1>Login to your Box</h1>
    <el-button type="primary" @click="login">
        <p v-if="user.user.isLoggedIn">Logout</p>
        <p v-else>Login</p>
    </el-button>
</template>