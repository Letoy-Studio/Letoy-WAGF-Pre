<template>

  <t-menu
      v-model:expanded="expanded"
      theme="light"
      width="100%"
      :defaultValue="currentPath"
      :value="selectPath"
      @onChange="changePath"
  >
<!--    <t-menu-item value="Home" @click="changePath('Home')">-->
<!--      <template #icon>-->
<!--        <AppIcon/>-->
<!--      </template>-->
<!--      首頁-->
<!--    </t-menu-item>-->
    <t-menu-item value="CustomerManage" @click="changePath('CustomerManage')">
      <template #icon>
        <UsergroupIcon/>
      </template>
      帐无忧用户信息
    </t-menu-item>
    <t-menu-item value="UserManage" @click="changePath('UserManage')">
      <template #icon>
        <UserIcon/>
      </template>
      系统用户管理
    </t-menu-item>
    <t-menu-item value="SystemLogs" @click="changePath('SystemLogs')">
      <template #icon>
        <RootListIcon/>
      </template>
      系统日志
    </t-menu-item>
<!--    <t-menu-item value="edit1">-->
<!--      <template #icon>-->
<!--        <SettingIcon/>-->
<!--      </template>-->
<!--      系统设置-->
<!--    </t-menu-item>-->
  </t-menu>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {
  LayersIcon,
  AppIcon,
  UserCircleIcon,
  ViewModuleIcon,
  SettingIcon,
  BrowseIcon,
  UsergroupIcon,
  UserIcon,
    RootListIcon
} from 'tdesign-icons-vue-next';
import {MenuValue} from 'tdesign-vue-next';

@Options({
  components: {
    LayersIcon,
    AppIcon,
    UserCircleIcon,
    ViewModuleIcon,
    SettingIcon,
    BrowseIcon,
    UsergroupIcon,
    UserIcon,
    RootListIcon
  },
  computed: {
    currentPath() {
      this.selectPath = this.$route.path.replace("/", "");
      return this.$route.path.replace("/", "");
    }
  },
  props: {},
  methods: {
    changePath(path: string) {
      this.selectPath = path;
      this.$router.push(path)
    }
  },
  data() {
    return {
      expanded: [],
      selectPath: ""
    }
  }
})
export default class BottomBar extends Vue {
}
</script>
<style scoped src="./../assets/css/BottomBar.css"></style>