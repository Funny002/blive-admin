<template>
  <el-dialog
      :title="title"
      append-to-body
      @close="onClose"
      :custom-class="classes"
      :visible.sync="dialogShow"
      :close-on-click-modal="false"
  >
    <slot></slot>
    <template slot="">
      <slot name="footer">
        <slot name="footer-btn"></slot>
        <el-button @click="onClose">关闭</el-button>
      </slot>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import {Dialog as ElDialog} from 'element-ui'
import {Vue, Prop, Component} from 'vue-property-decorator'

@Component
export default class DialogWindow extends Vue {
  // 标题
  @Prop() title?: string;
  // class
  @Prop() class?: string;
  // 是否全屏
  @Prop({default: false}) fullscreen?: boolean;
  //
  dialogShow = false;
  dialogDom: Vue | Element | Vue[] | Element[] | null = null;

  /**  获取 class  */
  get classes() {
    const classes = [
      'dialogWindow',
      this.class ? this.class : '',
      this.fullscreen ? 'dialogWindow-all' : ''
    ]
    return classes.join(' ')
  }

  /** 初始化 */
  init() {
    this.dialogShow = true;
  }

  /** 关闭 */
  onClose() {
    this.dialogShow = false;
  }

  /** 获取 dom */
  getDom() {
    if (!this.dialogDom) {
      this.dialogDom = this.$refs.dialogDom
    }
    return this.dialogDom as ElDialog
  }

  /** 加载完毕 */
  mounted() {
    this.$nextTick(() => {
      this.$emit('load');
    })
  }
}
</script>
<style lang="scss">
.dialogWindow {
  top: 50%;
  left: 50%;
  width: 80vw;
  display: flex;
  position: absolute;
  margin: 0 !important;
  flex-direction: column;
  height: calc(100vh - 100px);

  &-all {
    width: 100vw;
    height: 100vw;
  }

  .el-dialog {
    &__header {
      height: 55px;
      flex: 0 0 55px;
    }

    &__body {
      width: 100%;
      overflow: auto;
    }

    &__footer {
      height: 50px;
      flex: 0 0 50px;
      padding: 10px 20px;
    }
  }
}
</style>