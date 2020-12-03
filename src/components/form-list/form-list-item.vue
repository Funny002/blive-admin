<template>
  <el-form-item :class="['formList-item',item.class]" :label="item.label" :prop="item.prop" :rules="item.rules">
    <form-date-picker v-if="datePicker.includes(item.type)" :item="item" :value="value" @change="onChange"/>
    <form-select v-else-if="select.includes(item.type)" :item="item" :value="value" :option="option && option[item.name]" @change="onChange"/>
    <form-input v-else-if="input.includes(item.type)" :item="item" :value="value" :btnList="btnList && btnList[item.name]" @change="onChange" @click="onClick"/>
  </el-form-item>
</template>
<script lang="ts">
import {FormItem, ItemBtn, Type} from './interface';
import {Component, Prop, Vue} from 'vue-property-decorator';
//
import FormDatePicker from "./module/form-date-picker.vue";
import FormSelect from "./module/form-select.vue";
import FormInput from "./module/form-input.vue";

@Component({
  components: {FormSelect, FormInput, FormDatePicker}
})
export default class FormListItem extends Vue {
  @Prop() value?: string;
  @Prop() item?: FormItem;
  // 可通过外部传入, 通过 item.name 定位
  @Prop() btnList?: { [key: string]: ItemBtn };
  @Prop() option?: { [key: string]: string | boolean };
  //
  select: Type[] = ['select', 'selectTree'];
  input: Type[] = ['text', 'password', 'textarea'];
  datePicker: Type[] = ['year', 'month', 'date', 'week', 'datetime', 'datetimerange', 'daterange'];

  /** 映射 | 回调 - 点击事件
   * @param name
   * @param event
   */
  onClick(name: string, event: Event) {
    if (name) {
      this.$emit('click', name, event)
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
}
</script>