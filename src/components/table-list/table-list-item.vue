<template>
  <el-table-column
      :type="item.type"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :align="item.align"
      show-overflow-tooltip
      v-if="item.show||true"
      :sortable="item.sortable"
      :fixed="item.fixed||false"
      :formatter="item.formatter"
      :selectable="item.selectable"
      :minWidth="item.width||'50px'"
      :headerAlign="item.headerAlign"
  >
    <template v-if="item.type!=='selection'" slot-scope="{row,$index}">
      <slot :row="row" :$index="$index"/>
    </template>
  </el-table-column>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {TableHead} from "@/components/table-list/interface";

const defItem = () => ({
  fixed: false,
  align: "left",
  minWidth: '50px',
  headerAlign: 'left',
} as TableHead)
@Component
export default class TableListItem extends Vue {
  @Prop({default: defItem}) item?: TableHead
}
</script>
