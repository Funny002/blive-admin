<template>
  <el-row :class="['formList', rowClass]" :gutter="rowGutter">
    <el-form
        :size="size"
        ref="FormList"
        :inline="inline"
        :rules="formRules"
        :disabled="disabled"
        :model.sync="formValue"
        hide-required-asterisk
        :label-width="labelWidth"
        :status-icon="statusIcon"
        :class="['formList-form',formClass]"
    >
      <el-col v-for="(item,key) in formList" :key="key" :span="item.span||24">
        <slot v-if="item.slot" :name="item.slot" :item="item"/>
        <form-list-item v-else :value="formValue" :item="item" :btn-list="btnList" :option="option" @change="onChange" @click="onClick"/>
      </el-col>
    </el-form>
  </el-row>
</template>
<script lang="ts">
import {Form as ElForm} from "element-ui";
import FormListItem from './form-list-item.vue';
import {Component, Prop, Vue} from 'vue-property-decorator'
import {FormItem, ItemBtn, ItemRules} from "@/components/form-list/interface";

@Component({components: {FormListItem}})
export default class FormList extends Vue {
  @Prop({default: 0}) rowGutter?: number;
  @Prop({default: ''}) rowClass?: string;
  @Prop({default: ''}) formClass?: string;
  //
  @Prop({default: false}) inline?: boolean;
  @Prop({default: false}) disabled?: boolean;
  @Prop({default: false}) statusIcon?: boolean;
  @Prop({default: '80px'}) labelWidth?: string;
  @Prop({default: 'mini'}) size?: 'medium' | 'small' | 'mini';
  //
  @Prop({default: () => ({})}) formValue?: { [key: string]: string };
  @Prop({default: () => ({})}) formRules?: { [key: string]: ItemRules[] };
  @Prop({default: () => []}) formList?: FormItem[] | { [key: string]: FormItem };
  // 可通过外部传入, 通过 item.name 定位
  @Prop() btnList?: { [key: string]: ItemBtn };
  @Prop() option?: { [key: string]: string | boolean };

  // formListDom = null

  /** 回调 - 点击事件
   * @param name
   * @param event
   */
  onClick(name: string, event: Event) {
    if (name) {
      this.$emit(`${name}-click`, event)
    }
  }

  /** 映射 - 内容改变
   * @param name
   * @param value
   */
  onChange(name: string, value: string | [string] | null) {
    if (this.item && this.item.name) {
      this.$emit('change', name, value)
    }
  }

  /** 获取表单dom
   */
  getDom() {
    if (!this.formListDom) {
      this.formListDom = this.$refs.FormList
    }
    return this.formListDom
  }

  /** 方法映射 - 表单重置
   */
  resetFields() {
    (this.$refs.FormList as ElForm).resetFields();
  }

  /** 方法映射 - 移除表单验证
   * @param props
   */
  clearValidate(props: [string] | string | undefined = undefined) {
    (this.$refs.FormList as ElForm).clearValidate(props);
  }

  /**  方法映射 - 表单校验
   * @param func
   */
  validate(func: (arg0: boolean) => void) {
    (this.$refs.FormList as ElForm).validate((event: boolean) => func(event));
  }
}
</script>
<style scoped lang="scss">
.formList {
  width: 100%;

  /deep/
  .el-form-item {
    display: flex;

    &__content {
      width: 100%;
      display: flex;
      margin-left: inherit !important;

      > div {
        width: 100%;
        display: block;
      }

      > .el-date-editor {
        display: inline-flex;
      }
    }
  }
}
</style>
