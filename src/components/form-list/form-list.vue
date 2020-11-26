<template>
  <el-row :class="['formList', rowClass]" :gutter="rowGutter">
    <el-form
        :size="size"
        ref="FormList"
        :inline="inline"
        :rules="FormRules"
        :disabled="disabled"
        :model.sync="FormValue"
        hide-required-asterisk
        :label-width="labelWidth"
        :status-icon="statusIcon"
        :class="['formList-form',formClass]"
    >
      <el-col v-for="(item,key) in FormList" :key="key" :span="item.span||24">
        <slot v-if="item.slot" :name="item.slot" :item="item"/>
        <form-list-item v-else :value="FormValue" :item="item" @change="formListItemChange" @btn-click="btnClick"/>
      </el-col>
    </el-form>
  </el-row>
</template>
<script lang="ts">
import {Form as ElForm} from "element-ui";
import FormListItem from './form-list-item.vue';
import {Component, Prop, Vue} from 'vue-property-decorator'
import {FormItem, ItemRules} from "@/components/form-list/interface";

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
  @Prop({default: () => ({})}) FormValue?: { [key: string]: string };
  @Prop({default: () => ({})}) FormRules?: { [key: string]: ItemRules[] };
  @Prop({default: () => []}) FormList?: FormItem[] | { [key: string]: FormItem };

  // 方法映射
  clearValidate() {
    (this.$refs.FormList as ElForm).clearValidate();
  }

  // 方法映射
  validate(func: (arg0: boolean) => void) {
    (this.$refs.FormList as ElForm).validate((event: boolean) => func(event));
  }

  // 回调映射
  btnClick(name: string) {
    this.$emit(name)
  }

  // 回调映射
  formListItemChange(name: string, value: never) {
    this.$emit('change', name, value)
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
