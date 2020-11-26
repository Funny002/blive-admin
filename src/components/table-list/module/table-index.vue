<template>
  <table-list-item :item="getItem">
    <template slot-scope="{$index}">{{ (pageIndex * pageSize - pageSize) + $index + 1 }}</template>
  </table-list-item>
</template>
<script lang="ts">
import TableListItem from "@/components/table-list/table-list-item.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {TableHead} from "@/components/table-list/interface";

@Component({components: {TableListItem}})
export default class TableIndex extends Vue {
  @Prop() item?: TableHead;
  @Prop() pageSize?: number;
  @Prop() pageIndex?: number;

  get getItem() {
    return Object.assign({}, this.item, {align: 'center', headerAlign: 'center'} as TableHead)
  }
}
</script>
