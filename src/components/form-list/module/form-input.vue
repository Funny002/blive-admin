<template>
  <div v-if="item.btnList" :class="['formList-item-Btn']">
    <el-input
        :type="item.type"
        @change="inputChange"
        :maxlength="item.max"
        :readonly="item.readonly"
        :disabled="item.disabled"
        v-model="value[item.name]"
        :suffix-icon="item.suffixIcon"
        :prefix-icon="item.prefixIcon"
        :placeholder="item.placeholder"
        :clearable="item.clearable||true"
        :show-word-limit="item['showWord']">
      <template v-if="item.prepend" slot="prepend" v-html="item.prepend"/>
      <template v-if="item.append" slot="append" v-html="item.append"/>
    </el-input>
    <div style="margin-left: 10px; display: flex;" v-if="item.btnList">
      <el-button v-for="(btnV,btnK) in item.btnList" :key="btnK" :type="btnV.type" :plain="btnV.plain||false" :icon="btnV.icon" :disabled="btnV.disabled" @click="btnClick(btnV['clickName'])">{{ btnV.value }}</el-button>
    </div>
  </div>
  <el-input
      v-else
      :type="item.type"
      :maxlength="item.max"
      :readonly="item.readonly"
      :disabled="item.disabled"
      v-model="value[item.name]"
      :suffix-icon="item.suffixIcon"
      :prefix-icon="item.prefixIcon"
      :placeholder="item.placeholder"
      :clearable="item.clearable||true"
      :show-word-limit="item['showWord']">
    <template v-if="item.prepend" slot="prepend" v-text="item.prepend"/>
    <template v-if="item.append" slot="append" v-text="item.append"/>
  </el-input>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {FormItem} from "@/components/form-list/interface";

@Component
export default class FormInput extends Vue {
  @Prop() value?: string;
  @Prop() item?: FormItem;

  // 回调
  btnClick(name: string) {
    this.$emit('btn-click', name)
  }

  // 回调
  inputChange(value: string) {
    if (this.item && this.item.name) {
      this.$emit('change', this.item.name, value)
    }
  }
}
</script>
