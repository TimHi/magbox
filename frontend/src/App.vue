<script setup lang="ts">
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <div>
    <div class="content">
      <router-view></router-view>
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
