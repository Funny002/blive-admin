<template>
  <div class="setting">
    <el-tabs class="setting-tabs" v-model="tabsKeys" tab-position="left" :before-leave="tabsBeforeLeave">
      <template v-for="(item,key) in tabsList">
        <el-tab-pane :key="key" :name="item.name">
          <span slot="label"><el-icon :name="item.icon"/> {{ item.label }}</span>
        </el-tab-pane>
      </template>
    </el-tabs>
    <div class="setting-body">
      <component :is="content"/>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import contentDef from './menu/index.vue';

@Component
export default class Setting extends Vue {
  content = contentDef
  //
  tabsKeys = 'user'
  tabsList = [
    {label: '用户管理', icon: 'user-solid', name: 'user'},
    {label: '菜单管理', icon: 's-tools', name: 'menu'},
    {label: '网站管理', icon: 's-operation', name: 'web'},
  ] as { [key: string]: string }[];

  tabsBeforeLeave(pathName: string) {
    this.content = () => import(`/${pathName}/index.vue`)
  }


}
</script>
<style scoped lang="scss">
.setting {
  width: 100%;
  height: 100%;
  display: flex;


  &-tabs {
    flex: 0 0 auto;

    /deep/
    .el-tabs__header {
      background-color: #fff;
      border-radius: 8px 0 0 8px;
    }
  }

  &-body {
    flex: 1 1 auto;
    overflow-y: auto;
  }
}
</style>
