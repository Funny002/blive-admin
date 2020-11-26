<template>
  <table-list-item :item="item">
    <template slot-scope="{row}">
      <el-tag :type="row[item.contentType||item.content+'Type']">{{ row[item.content] }}</el-tag>
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
export default class TableState extends Vue {
  @Prop() item?: TableHead;
}
</script>
