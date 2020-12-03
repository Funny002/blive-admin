<template>
  <el-date-picker
      :type="item.type"
      @change="onChange"
      :editable="item.editable"
      v-model="value[item.name]"
      :placeholder="Placeholder"
      :clear-icon="item.clearIcon"
      :format="item.format||format"
      :prefix-icon="item.prefixIcon"
      :end-placeholder="endPlaceholder"
      :picker-options="item.pickerOptions"
      :start-placeholder="startPlaceholder"
      :range-separator="item.separator||'—'"
      :value-format="item.valueFormat||format"
      :unlink-panels="item.unlinkPanels!==false"
  />
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {FormItem} from "@/components/form-list/interface";

@Component
export default class FormDatePicker extends Vue {
  @Prop() value?: string;
  @Prop() item?: FormItem;
  //
  Placeholder = null;
  format = 'yyyy-MM-dd';
  endPlaceholder = '结束日期';
  startPlaceholder = '开始日期';

  /** 回调 - 内容改变
   * @param value
   */
  onChange(value: string | [string] | null) {
    if (this.item && this.item.name) {
      this.$emit('change', this.item.name, value)
    }
  }

  // 初始化
  mounted() {
    if (!['monthrange', 'datetimerange', 'daterange', 'yearrange'].includes(this.item.type)) {
      this.Placeholder = this.item?.placeholder || '请选择'
    } else {
      if (Array.isArray(this.item?.placeholder)) {
        [this.startPlaceholder, this.endPlaceholder] = this.item?.placeholder
      } else {
        this.endPlaceholder = (this.item?.placeholder || '请选择') + this.endPlaceholder;
        this.startPlaceholder = (this.item?.placeholder || '请选择') + this.startPlaceholder;
      }
    }
    if (this.item) {
      switch (this.item.type) {
        case 'week':
          this.format = 'yyyy-WW'
          break
          //
        case 'year':
          this.format = 'yyyy'
          break
        case 'yearrange':
          this.format = 'yyyy'
          break
          //®
        case 'date':
          this.format = 'yyyy-MM-dd'
          break
        case 'daterange':
          this.format = 'yyyy-MM-dd'
          break
          //
        case 'month':
          this.format = 'yyyy-MM'
          break
        case 'monthrange':
          this.format = 'yyyy-MM'
          break
          //
        case 'datetime':
          this.format = 'yyyy-MM-DD HH-mm'
          break
        case 'datetimerange':
          this.format = 'yyyy-MM-DD HH-mm'
          break
      }
    }
  }
}
</script>