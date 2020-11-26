<template>
  <div class="activation">
    <div class="activation-show">
      <template v-if="status===null">
        <div class="activation-list">账号正在激活中{{ loadText }}</div>
        <div style="height: 50px;" v-loading="isLoad"></div>
      </template>
      <div v-else-if="!status" class="activation-list" style="color: #f59;">激活失败</div>
      <div v-else class="activation-list" style="color: #59f;">激活成功</div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import sign from '@/api/sign'

@Component
export default class Activation extends Vue {
  isLoad = true
  loadText = '.';
  setItem = 0;
  status: boolean | number | null = null;

  textLoading() {
    const lock = 500;
    this.setItem = setInterval(() => {
      if (this.loadText.length < 6) {
        this.loadText += '.'
      } else {
        this.loadText = '.'
      }
    }, lock);
  }

  statusVary(status: number | boolean) {
    this.status = status;
    clearInterval(this.setItem);
    setTimeout(() => {
      this.$router.push({path: "/"})
    }, 500)
  }

  onActivation(data: any) {
    sign('activation', {
      data,
      then: ({code, msg}) => {
        const is = code === 200;
        this.statusVary(parseInt(code));
        this.$message[!is ? 'error' : 'success'](msg);
      }
    })
  }

  mounted() {
    this.textLoading(); // 加载
    this.$nextTick(() => {
      const data = this.$route.query;
      if (Object.hasOwnProperty.call(data, 'code')) {
        this.onActivation(data);
      } else {
        this.statusVary(0);
        this.$message.error('code 不存在');
      }
    })
  }
}
</script>
<style scoped lang="scss">
.activation {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, .5);

  &-list {
    color: #999;
    font-size: 14px;
    font-weight: 500;
    line-height: 40px;
  }

  &-show {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    transform: translate(-50%, -50%);
  }
}
</style>
