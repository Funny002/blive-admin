<template>
  <el-date-picker
      :type="item.type"
      :format="item.format"
      :editable="item.editable"
      v-model="value[item.name]"
      :clear-icon="item.clearIcon"
      :prefix-icon="item.prefixIcon"
      :value-format="item.valueFormat"
      :picker-options="item.pickerOptions"
      :range-separator="item.separator||'—'"
      :unlink-panels="item.unlinkPanels||true"
      :end-placeholder="item.placeholder[1]||'结束日期'"
      :start-placeholder="item.placeholder[0]||'开始日期'"
      :placeholder="!['monthrange', 'datetimerange', 'daterange'].includes(this.item.type)?item.placeholder:null"
  />
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {FormItem} from "@/components/formList/interface";

@Component
export default class FormDatePicker extends Vue {
  @Prop() value?: string;
  @Prop() item?: FormItem;
}
</script>
