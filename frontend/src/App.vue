<script setup lang="ts">
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <router-view></router-view>
  <div id="footer">
    <FooterBar class="margins" />
  </div>
</template>
 
<style>
.margins {
  margin-left: 100px;
  margin-bottom: 4px;
}
</style>
