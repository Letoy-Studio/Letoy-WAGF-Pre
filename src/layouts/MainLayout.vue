<template>
  <div class="l-container" style="width: 100vw">
    <header-bar></header-bar>
    <div class="h-container">
      <div class="l-menu">
        <side-bar></side-bar>
      </div>
      <div class="l-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar.vue";
import BottomBar from "@/components/BottomBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'

export default {
  components: {BottomBar, HeaderBar,SideBar}
};
</script>

<style scoped src="./../assets/css/MainLayout.css"></style>