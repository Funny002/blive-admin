<template>
  <div class="Theme-header">
    <div class="">
      <el-input prefix-icon="el-icon-search" placeholder="输入关键字搜索"/>
    </div>
    <span style="margin: 0 auto;"></span>

    <div class="Theme-header-btn" @click="dropCommand('help')">
      <el-icon name="info"/>
    </div>
    <div class="Theme-header-btn" @click="dropCommand('bell')">
      <el-icon name="bell"/>
    </div>
    <div class="Theme-header-btn" @click="dropCommand('set-up')">
      <el-icon name="set-up"/>
    </div>
    <el-dropdown @command="dropCommand">
      <div class="Theme-header-btn Theme-header-user">
        <el-avatar :src="userInfo['avatar']" :size="30" icon="el-icon-user-solid">
          {{ userInfo['user'] ? (userInfo['user']).substr(0, 1) : '' }}
        </el-avatar>
        <span class="Theme-header-user-name">{{ userInfo['user'] }}</span>
      </div>
      <el-dropdown-menu class="Theme-header-user-menu" slot="dropdown">
        <el-dropdown-item icon="el-icon-postcard" command="userInfo">个人信息</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" command="userOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script lang="ts">
import {Getter} from "vuex-class";
import Cookie from '@/plugin/cookie'
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class ThemeHeader extends Vue {
  @Getter('User/getInfo') userInfo?: { [key: string]: string | number }

  dropCommand(command: string) {
    const func = {
      userOut: () => this.userOutClick(),
    } as { [key: string]: (() => void) }
    if (Object.hasOwnProperty.call(func, command)) {
      func[command]()
    } else {
      this.$message({message: "🚧...，功能正在施工中", type: "warning"})
    }
  }

  /* 用户退出 */
  userOutClick() {
    Cookie.remove('Token')
    window.location.reload()
  }
}
</script>
