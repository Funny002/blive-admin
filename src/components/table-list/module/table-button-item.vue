<template>
  <el-button type="text" @click="event=>onClick(btn.name,row,event)">{{ typeof btn.label === 'string' ? btn.label : btn.label[parseInt(row[content])] }}</el-button>
</template>
<script lang="ts">
import {Vue, Prop, Component} from 'vue-property-decorator';
import {DefaultObj} from "@/components/table-list/interface";

@Component
export default class TableButtonItem extends Vue {
  @Prop() content?: string;
  @Prop() row?: DefaultObj;
  @Prop() btn?: { label: string; name: string };

  /** 回调 - 点击
   * @param name
   * @param row
   * @param event
   */
  onClick(name: string, row: DefaultObj, event: Event) {
    this.$emit('click', name, row, event);
  }
}
</script>