<script setup lang="ts">
import { useRouter } from 'vue-router';
import FooterBar from './components/FooterBar.vue';
import { ref } from 'vue';
import { PocketBaseService } from './service/pocketBaseService';
import { useUserStore } from './stores/user';
const router = useRouter();
const op = ref();
const pb = new PocketBaseService();
const user = useUserStore();

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/');
    }
  },
  {
    label: 'Box',
    icon: 'pi pi-star',
    command: () => {
      router.push('/box');
    }
  }
]);

const toggle = (event: any) => {
  op.value.toggle(event);
};

function login() {
  if (user.user.isLoggedIn) {
    pb.Logout();
  } else {
    try {
      pb.SignInUsingOAuth2()
        .then(() => router.push('/'))
        .catch(() => console.error('Login Error'));
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<template>
  <div>
    <Menubar v-if="user.user.isLoggedIn" :model="items">
      <template #end>
        <Avatar
          icon="pi pi-user"
          class="mr-2"
          size="normal"
          style="background-color: #ece9fc; color: #2a1261"
          @click="toggle"
        />
        <Popover ref="op" class="min-w-48">
          <div class="flex flex-col gap-4">
            <p>{{ user.user.displayName }}</p>
            <p>{{ user.user.email }}</p>
            <Divider />
            <Button
              :fluid="false"
              size="small"
              severity="danger"
              label="Logout"
              data-testid="btn-logout"
              @click="login"
            ></Button>
          </div>
        </Popover> </template
    ></Menubar>
    <div class="content">
      <RouterView />
    </div>

    <div id="footer">
      <FooterBar class="margins" />
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
}

.margins {
  margin-left: 100px;
  margin-bottom: 4px;
}

.footer {
  display: flex;
  position: relative;
  margin-top: auto;
}
</style>
