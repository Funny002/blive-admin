<template>
  <el-input
      :type="item.type"
      @change="onChange"
      :maxlength="item.max"
      :readonly="item.readonly"
      :disabled="item.disabled"
      v-model="value[item.name]"
      :suffix-icon="item.suffixIcon"
      :prefix-icon="item.prefixIcon"
      :clearable="item.clearable||true"
      :show-word-limit="item['showWord']"
      :placeholder="item.placeholder||'请输入'+item.label"
  >
    <form-input-item-expand v-if="item.prepend" slot="prepend" :item="item.prepend" @click="onClick"/>
    <form-input-item-expand v-if="item.append" slot="append" :item="item.append" @click="onClick"/>
  </el-input>
</template>
<script lang="ts">
import FormInputItemExpand from "./form-input-item-expand.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {FormItem} from "@/components/form-list/interface";

@Component({components: {FormInputItemExpand}})
export default class FormInputItem extends Vue {
  @Prop() value?: object;
  @Prop() item?: FormItem;

  /** 回调 - 内容改变
   * @param value
   */
  onChange(value: string | null) {
    this.$emit('change', this.item?.name, value)
  }

  /** 映射 - 回调点击
   * @param name
   * @param event
   */
  onClick(name: string, event: Event) {
    if (name) {
      this.$emit('click', name, event)
    }
  }
}
</script>
