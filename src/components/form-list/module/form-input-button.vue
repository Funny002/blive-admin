<template>
  <div :class="['formList__input-btn']" style="margin-left: 10px; display:flex;">
    <template v-for="(btn,key) in btnList">
      <el-button :key="key" :type="btn.type" :icon="btn.icon" :plain="btn.plain||false" :disabled="btn.disabled!==false" @click="event=>onClick(btn.name,event)">{{ btn.label }}</el-button>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {ItemBtn} from "@/components/form-list/interface";
import FormInputItem from "@/components/form-list/module/form-input-item.vue";

@Component({components: {FormInputItem}})
export default class FormInputButton extends Vue {
  // 可通过外部传入
  @Prop() btnList?: ItemBtn[] | undefined;

  /** 映射 | 回调 - 点击事件
   * @param name
   * @param event
   */
  onClick(name: string, event: Event) {
    if (name) {
      this.$emit('click', name, event)
    }
  }
}
</script>
