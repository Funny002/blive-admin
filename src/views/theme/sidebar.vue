<template>
  <div class="Theme-sidebar">
    <div class="Theme-sidebar-logo">
      logo
    </div>
    <div
        class="Theme-sidebar-nav"
        :style="{'top':(50 + navTop) + 'px'}"
        :class="{'Theme-sidebar-nav-none':navShow}"
    >
      <div class="Theme-sidebar-nav-top" :style="!navTop?{transform:'rotate(180deg)'}:{}"/>
      <div class="Theme-sidebar-nav-bottom"/>
    </div>
    <div class="Theme-sidebar-body">
      <div class="Theme-sidebar-item" @click="homeClick()">
        <el-icon name="picture-outline-round"/>
        <span>仪表盘</span>
      </div>
      <template v-for="(item,key) in menuList">
        <div :key="key" class="Theme-sidebar-item" @click="menuItemClick(key,item)">
          <el-icon :name="item.icon"/>
          <span>{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {MenuList} from '@/store/interface';
import {Getter} from "vuex-class";

@Component
export default class ThemeSidebar extends Vue {
  navTop = 0;
  navShow = false;

  @Getter('Menu/getMenuList') menuList?: MenuList[]

  @Watch('menuList') getMenuList(list: MenuList[]) {
    const path = window.location.pathname;
    for (let i = 0; i < list.length; i++) {
      console.log(list[i].path, path)
      if (list[i].path === path) {
        return this.navItemClick(i + 1)
      }
    }
    return this.homeClick();
  }

  homeClick(key = 0, path = '/index') {
    const pathName = window.location.pathname;
    if (pathName !== path) {
      this.navItemClick(key);
      this.$router.push({path});
    }
  }

  /** 菜单点击
   * @param key
   * @param item
   */
  menuItemClick(key: number, item: MenuList) {
    this.homeClick(key + 1, item.path)
  }

  /** 动画
   * @param key
   */
  navItemClick(key: number) {
    this.navShow = true;
    setTimeout(() => {
      this.navShow = false;
      this.navTop = key * 35;
    }, 300)
  }
}
</script>
