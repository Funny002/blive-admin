<template>
  <table-list-item :item="item">
    <template slot-scope="{row}">
      <span>
        <template v-for="(name,key) in item.operation">
        <el-button :key="key" v-if="name==='up'" type="text" @click="btnClick('up',row)">上移</el-button>
        <el-button :key="key" v-else-if="name==='down'" type="text" @click="btnClick('down',row)">下移</el-button>
        <el-button :key="key" v-else-if="name==='state'" type="text" @click="btnClick('state',row)">{{ row['state'] ? '启用' : '停用' }}</el-button>
        <el-button :key="key" v-else-if="name==='delete'" type="text" @click="btnClick('delete',row)">删除</el-button>
        <el-button :key="key" v-else-if="name==='save'" type="text" @click="btnClick('save',row)">修改</el-button>
        <el-button :key="key" v-else-if="name==='view'" type="text" @click="btnClick('view',row)">查看</el-button>
        </template>
      </span>
    </template>
  </table-list-item>
</template>


<script lang="ts">
import TableListItem from "@/components/table-list/table-list-item.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {TableHead} from "@/components/table-list/interface";

@Component({
  components: {TableListItem}
})
export default class TableButton extends Vue {
  @Prop() item?: TableHead;

  // 回调
  btnClick(name: string, row: object) {
    this.$emit('btn-click', name, row)
  }
}
</script>
