<template>
  <el-table-column
      :type="item.type"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :align="item.align"
      show-overflow-tooltip
      v-if="item.show!==false"
      :sortable="item.sortable"
      :fixed="item.fixed||false"
      :formatter="item.formatter"
      :headerAlign="item.headerAlign"
      :minWidth="item.minWidth||'50px'"
  >
    <template slot="" slot-scope="{column, $index}">
      <!-- header -->
      <slot name="header" :column="column" :$index="$index"/>
    </template>
    <!-- default -->
    <template slot-scope="{ row, column, $index}">
      <slot :row="row" :column="column" :$index="$index"/>
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
