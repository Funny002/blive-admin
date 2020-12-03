<template>
  <table-list-item :item="item">
    <el-tag slot-scope="{row}" :type="row[item.contentType||item.content+'Type']">{{ row[item.content] }}</el-tag>
  </table-list-item>
</template>

<script lang="ts">
import TableListItem from "@/components/table-list/table-list-item.vue";
import {Component, Prop, Vue} from "vue-property-decorator";
import {TableHead} from "@/components/table-list/interface";

@Component({components: {TableListItem}})
export default class TableState extends Vue {
  @Prop() item?: TableHead;
}
</script>
