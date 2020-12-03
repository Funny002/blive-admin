<template>
  <table-list-item :item="item">
    <span class="table-text" slot-scope="{row}" @click="event=>onClick(row,event)">{{ row[item.content] === 0 ? row[item.content] : row[item.content] || '—' }}</span>
  </table-list-item>
</template>

<script lang="ts">
import TableListItem from "@/components/table-list/table-list-item.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {TableHead, DefaultObj} from "@/components/table-list/interface";

@Component({components: {TableListItem}})
export default class TableText extends Vue {
  @Prop() item?: TableHead;

  /** 回调 - 点击
   * @param row
   * @param event
   */
  onClick(row: DefaultObj, event: Event) {
    this.$emit('click', row, event)
  }
}
</script>
