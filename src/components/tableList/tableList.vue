<template>
  <el-table :data="tableData">
    <template v-for="(item,key) in tableHead">
      <el-table-column
          :key="key"
          align="center"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip
          :sortable="item.sortable || false"
      >
        <template slot-scope="{row,column,$index}">
          <slot :name="item.slot" :row="row" :column="column" :$index="$index">
            <span>{{ row[item.content] || '—' }}</span>
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class TableList extends Vue {
  @Prop({}) tableHead?: [] | null;
  @Prop({}) tableData?: [] | null;
}
</script>
