<template>
  <table-list-item :item="getItem">
    <span slot-scope="{$index}">{{ (pageIndex * pageSize - pageSize) + $index + 1 }}</span>
  </table-list-item>
</template>

<script lang="ts">
import TableListItem from "@/components/table-list/table-list-item.vue";
import {defaultConfig} from "@/components/table-list/interface";
import {Component, Prop, Vue} from "vue-property-decorator";
import {TableHead} from "@/components/table-list/interface";

@Component({components: {TableListItem}})
export default class TableIndex extends Vue {
  @Prop() item?: TableHead;
  @Prop({default: 1}) pageSize?: number;
  @Prop({default: 1}) pageIndex?: number;

  get getItem() {
    return Object.assign({}, defaultConfig, this.item)
  }
}
</script>