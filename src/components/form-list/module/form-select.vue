<template>
  <el-select
      @change="onChange"
      :remote="item.remote"
      :loading="item.loading"
      :disabled="item.disabled"
      v-model="value[item.name]"
      :filterable="item.filterable"
      :placeholder="item.placeholder"
      :remote-method="item.remoteMethod"
      :filter-method="item.filterMethod"
      :clearable="item.clearable!==false"
  >
    <template v-for="(option,key) in (option || item.option)">
      <el-option :key="key" v-if="!option.children" :label="option.label" :value="option.value"/>
      <el-option-group :key="key" v-else>
        <el-option :label="option.label" :value="option.value" :disabled="item.groupTitle"/>
        <el-option v-for="item in option.children" :key="item.id" :label="item.label" :value="item.value"/>
      </el-option-group>
    </template>
  </el-select>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {FormItem} from "@/components/form-list/interface";

@Component
export default class FormSelect extends Vue {
  @Prop() value?: object;
  @Prop() item?: FormItem;
  // 可通过外部传入
  @Prop() option?: { [key: string]: never } | boolean | undefined;

  /** 回调 - 内容改变
   * @param value
   */
  onChange(value: string | number | null) {
    if (this.item && this.item.name) {
      this.$emit('change', this.item.name, value)
    }
  }
}
</script>
