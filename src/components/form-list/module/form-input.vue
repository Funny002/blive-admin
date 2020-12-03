<template>
  <!-- 存在 && 是数组 && 大于0 -->
  <div :class="['formList__input']" v-if="item.btnList&&Array.isArray(item.btnList)&&item.btnList.length" style="display: flex;">
    <form-input-item :value="value" :item="item" @click="onClick" @change="onChange"/>
    <div :class="['formList__input-btn']" style="margin-left: 10px; display:flex;">
      <template v-for="(btn,key) in (btnList || item.btnList)">
        <el-button :key="key" :type="btn.type" :icon="btn.icon" :plain="btn.plain||false" :disabled="btn.disabled!==false" @click="event=>onClick(btn.name,event)">{{ btn.label }}</el-button>
      </template>
    </div>
  </div>
  <form-input-item v-else :value="value" :item="item" @click="onClick" @change="onChange"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {FormItem, ItemBtn} from "@/components/form-list/interface";
import FormInputItem from "@/components/form-list/module/form-input-item.vue";

@Component({components: {FormInputItem}})
export default class FormInput extends Vue {
  @Prop() value?: string;
  @Prop() item?: FormItem;
  // 可通过外部传入
  @Prop() btnList?: ItemBtn | boolean | undefined;

  /** 映射 | 回调 - 点击事件
   * @param name
   * @param event
   */
  onClick(name: string, event: Event) {
    if (name) {
      this.$emit('click', name, event)
    }
  }

  /** 映射 - 内容改变
   * @param name
   * @param value
   */
  onChange(name: string, value: string) {
    if (this.item && this.item.name) {
      this.$emit('change', name, value)
    }
  }
}
</script>
