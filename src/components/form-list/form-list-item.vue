<template>
  <el-form-item :class="['formList-item',item.class]" :label="item.label" :prop="item.prop" :rules="item.rules" :label-width="item.labelWidth">
    <slot>
      <component :is="moduleDom" :item="item" :value="value" :option="option && option[item.name]" :btnList="btnList && btnList[item.name]" @change="onChange" @click="onClick"/>
    </slot>
  </el-form-item>
</template>
<script lang="ts">
import {FormItem, ItemBtn, Type} from './interface';
import {Component, Prop, Watch, Vue} from 'vue-property-decorator';
//
import FormDatePicker from "./module/form-date-picker.vue";
import FormSelect from "./module/form-select.vue";
import FormInput from "./module/form-input.vue";

@Component({
  components: {FormSelect, FormInput, FormDatePicker}
})
export default class FormListItem extends Vue {
  @Prop() value?: object;
  @Prop() item?: FormItem;
  // 可通过外部传入, 通过 item.name 定位
  @Prop() btnList?: { [key: string]: ItemBtn };
  @Prop() option?: { [key: string]: string | boolean };
  //
  select: Type[] = ['select', 'selectTree'];
  input: Type[] = ['text', 'password', 'textarea'];
  datePicker: Type[] = ['year', 'month', 'date', 'week', 'datetime', 'datetimerange', 'daterange'];
  //
  moduleDom: (() => Promise<any>) | null = null;

  @Watch('item') getItem() {
    this.getModule()
  }

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
    if (this.item?.name) {
      this.$emit('change', name, value)
    }
  }

  getModule() {
    if (this.item) {
      const {select, input, datePicker} = this
      if (input.includes(this.item.type)) {
        this.moduleDom = () => import('./module/form-input.vue')
      } else if (select.includes(this.item.type)) {
        this.moduleDom = () => import('./module/form-select.vue')
      } else if (datePicker.includes(this.item.type)) {
        this.moduleDom = () => import('./module/form-date-picker.vue')
      }
    } else {
      this.moduleDom = null
    }
  }

  mounted() {
    this.getModule()
  }
}
</script>