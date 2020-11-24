<template>
  <el-select
      :remote="item.remote"
      :loading="item.loading"
      :disabled="item.disabled"
      v-model="value[item.name]"
      :filterable="item.filterable"
      :placeholder="item.placeholder"
      :clearable="item.clearable||true"
      :remote-method="item.remoteMethod"
      :filter-method="item.filterMethod"
  >
    <template v-for="(option,key) in item.select">
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
  @Prop() value?: string;
  @Prop() item?: FormItem;
}
</script>
