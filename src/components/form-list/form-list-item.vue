<template>
  <el-form-item :class="['formList-item',item.class]" :label="item.label" :prop="item.prop" :rules="item.rules">
    <component :is="model" :item="item" :value="value" @change="componentChange" @btn-click="btnClick"/>
  </el-form-item>
</template>
<script lang="ts">
import {FormItem, Type} from './interface';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component
export default class FormListItem extends Vue {
  @Prop() value?: string;
  @Prop() item?: FormItem;
  model: (() => Promise<any>) | null = null;

  getModel() {
    const getModel = (type: 'datePicker' | 'select' | 'input') => {
      const func = {
        datePicker: () => {
          this.model = () => import('./module/form-date-picker.vue');
        },
        select: () => {
          this.model = () => import('./module/form-select.vue');
        },
        input: () => {
          this.model = () => import('./module/form-input.vue');
        }
      } as { [key: string]: (() => void) }
      func[type]();
    }
    if (this.item) {
      const {type}: FormItem = this.item;
      const select: Type[] = ['select', 'selectTree'];
      const input: Type[] = ['text', 'password', 'textarea'];
      const datePicker: Type[] = ['year', 'month', 'date', 'week', 'datetime', 'datetimerange', 'daterange'];
      if (datePicker.includes(type)) {
        getModel('datePicker')
      } else if (select.includes(type)) {
        getModel('select')
      } else if (input.includes(type)) {
        getModel('input')
      }
    } else {
      this.model = null
    }
  }

  @Watch('item') getItem() {
    this.$nextTick(() => this.getModel())
  }

  mounted() {
    this.$nextTick(() => this.getModel())
  }

  // 回调映射
  btnClick(name: string) {
    this.$emit('btn-click', name)
  }

  // 回调映射
  componentChange(name: string, value: never) {
    this.$emit('change', name, value)
  }
}
</script>
