<script setup lang="ts">
import TopAppBar from '../components/TopAppBar.vue';
import { PocketBaseService } from '../service/pocketBaseService';
import { useUserStore } from '../stores/user';
const user = useUserStore();
const pb = new PocketBaseService();

function login() {
    console.log("AAL");
    if (user.user.isLoggedIn) {
        pb.Logout();
    } else {
        try {
            pb.SignInUsingOAuth2().catch(() => console.error("Login Error"));
        } catch (err) { console.error(err) }
    }
}
</script>

<template>
    <TopAppBar />
    <div class="descBox">
        <div>
            <h2>Keep track of stuff you want to read later 📔✍️</h2>
            <h2>Sort, categorize and filter (WIP)📑</h2>
            <h2>Export to Obsidian (WIP) 📤💎</h2>
            <h2>Send links directly to your</h2>
            <h2 class="mag">Magbox 📮</h2>
            <h2>using the browser extension (WIP) 📬</h2>
        </div>
        <div>
            <el-button data-testid="login-button" type="primary" @click="login">
                <p v-if="!user.user.isLoggedIn">Login</p>
            </el-button>
        </div>
    </div>
</template>

<style>
.descBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mag {
    color: var(--color-magbox-blue);
}
</style>
