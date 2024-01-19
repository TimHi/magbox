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

<style>
.content {
  padding-bottom: 24px;
}

.margins {
  margin-left: 100px;
  margin-bottom: 4px;
}
</style>
