<template>
  <!-- 因selection比较特殊所以独立拿出来,不然写法有一点麻烦 -->
  <el-table-column
      :type="item.type"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      show-overflow-tooltip
      :sortable="item.sortable"
      :fixed="item.fixed||false"
      :formatter="item.formatter"
      :align="item.align||'center'"
      :selectable="item.selectable"
      :minWidth="item.width||'50px'"
      :headerAlign="item.headerAlign||'center'"
  />
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
export default class TableSelection extends Vue {
  @Prop({default: defItem}) item?: TableHead
}
</script>
