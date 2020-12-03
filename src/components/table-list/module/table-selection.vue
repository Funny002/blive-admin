<template>
  <!-- 因selection比较特殊所以独立拿出来,不然写法有一点麻烦 -->
  <el-table-column
      :type="item.type"
      :prop="item.prop"
      :label="item.label"
      show-overflow-tooltip
      :sortable="item.sortable"
      :fixed="item.fixed||false"
      :formatter="item.formatter"
      :width="item.width||'50px'"
      :align="item.align||'center'"
      :minWidth="item.width||'50px'"
      :selectable="selectable||item.selectable"
      :headerAlign="item.headerAlign||'center'"
  />
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {defaultConfig, TableHead} from "@/components/table-list/interface";

@Component
export default class TableSelection extends Vue {
  @Prop({default: defaultConfig}) item?: TableHead;
  @Prop() selectable?: Function;
}
</script>
