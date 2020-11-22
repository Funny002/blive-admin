<template>
  <div class="Theme">
    <theme-sidebar></theme-sidebar>
    <div class="Theme-container">
      <theme-header></theme-header>
      <div class="Theme-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ThemeFooter from "@/views/theme/footer.vue";
import ThemeHeader from "@/views/theme/header.vue";
import ThemeSidebar from "@/views/theme/sidebar.vue";
//
import Cookie from "@/plugin/cookie";
import {userGetInfo} from "@/api/user";
import {menuGetList} from "@/api/menu";

@Component({components: {ThemeFooter, ThemeHeader, ThemeSidebar}})
export default class ThemeIndex extends Vue {

  getUserInfo() {
    menuGetList({
      error: this.__error,
      success: ({data}) => this.$store.commit('Menu/setMenuList', data)
    })
  }

  getMenuList() {
    userGetInfo({
      error: this.__error,
      success: ({data}) => this.$store.commit('User/setInfo', data)
    });
  }

  __error() {
    Cookie.remove('Token')
    this.$message.error('获取加密通道失败，请重新登录')
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  mounted() {
    // 获取用户信息
    this.getUserInfo()
    // 获取菜单
    this.getMenuList()
  }
}
</script>
<style lang="scss">
@import "./style.scss";
</style>
