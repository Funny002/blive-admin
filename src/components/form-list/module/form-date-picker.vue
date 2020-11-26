<template>
  <el-date-picker
      :type="item.type"
      :editable="item.editable"
      v-model="value[item.name]"
      @change="datePickerChange"
      :clear-icon="item.clearIcon"
      :format="item.format||format"
      :prefix-icon="item.prefixIcon"
      :picker-options="item.pickerOptions"
      :range-separator="item.separator||'—'"
      :value-format="item.valueFormat||format"
      :unlink-panels="item.unlinkPanels||true"
      :end-placeholder="item.placeholder[1]||'结束日期'"
      :start-placeholder="item.placeholder[0]||'开始日期'"
      :placeholder="!['monthrange', 'datetimerange', 'daterange'].includes(this.item.type)?item.placeholder:null"
  />
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {FormItem} from "@/components/form-list/interface";

@Component
export default class FormDatePicker extends Vue {
  @Prop() value?: string;
  @Prop() item?: FormItem;
  format = 'yyyy-MM-dd';

  // 回调
  datePickerChange(value: string | [string]) {
    if (this.item && this.item.name) {
      this.$emit('change', this.item.name, value)
    }
  }

  mounted() {
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
