<template>
  <el-row :class="['form-list']" :gutter="formGutter">
    <el-form ref="formList" :label-width="labelWidth" :model="formValue" :rules="rules" style="width: 100%;" :disabled="disabled" :status-icon="statusIcon" @validate="(...Callback)=>$emit('validate', Callback)">
      <el-col v-for="(item,key) in formList" :key="key" :span="item.span" style="min-height: 47px; display: block;">
        <slot v-if="item.slot" :name="item.slot" :data="item"/>
        <el-form-item v-else :label="item.label" :prop="item.prop" :rules="item.rules" :style="{'align-items':item.align||'flex-start'}">
          <el-alert v-if="item.tips" class="form-list-tips" :type="item.tips.type" :closable="false" :show-icon="item.tips.showIcon">{{ item.tips.value }}</el-alert>
          <div v-if="item.type === 'input'" style="display: flex; align-items: center; width: 100%;">
            <el-input v-model="formValue[item.name]" @input="$emit('change',item.name,formValue[item.name])" type="text" :suffix-icon="item.suffixIcon" :prefix-icon="item.prefixIcon" :placeholder="item.placeholder" :readonly="item.readonly" :disabled="item.disabled" :maxlength="`${item.max}`" :show-word-limit="!!item.max" clearable>
              <span v-if="item.prepend" slot="prepend" v-html="item.prepend"/>
              <span v-if="item.append" slot="append" v-html="item.append"/>
            </el-input>
            <div style="margin-left: 10px; display: flex;" v-if="item.btnList">
              <el-button v-for="(btnV,btnK) in item.btnList" :key="btnK" :type="btnV.type" :plain="btnV.plain||false" :icon="btnV.icon" @click="event => $emit(btnV.clickName, event)">{{ btnV.value }}</el-button>
            </div>
          </div>
          <div v-else-if="item.type === 'file'" style="display: flex;">
            <el-button @click="selectFile(item)" style="margin-right: 10px;">选择文件</el-button>
            <template v-if="show">
              <span v-if="!formValue[item.name]">未选择文件</span>
              <span v-else style="display: flex; width: calc(100% - 90px);">
                <div style=" overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ formValue[item.name].name }}</div>
                <el-button style="margin-left: auto;" type="text" icon="el-icon-close" @click="fileRemove(item)"></el-button>
              </span>
            </template>
            <!--            <span v-if="show" style="margin-left: 15px;">{{ !formValue[item.name] ? '未选择文件' : formValue[item.name].name }}</span>-->
          </div>
          <el-input v-else-if="item.type === 'textarea'" v-model="formValue[item.name]" @input="$emit('change',item.name,formValue[item.name])" type="textarea" :placeholder="item.placeholder" :maxlength="`${item.max}`" :readonly="item.readonly" :disabled="item.disabled" show-word-limit clearable/>
          <el-input v-else-if="item.type === 'number'" v-model.number="formValue[item.name]" @input="$emit('change',item.name,formValue[item.name])" :placeholder="item.placeholder" :maxlength="`${item.max}`" :readonly="item.readonly" :disabled="item.disabled" show-word-limit clearable/>
          <el-input v-else-if="item.type === 'password'" v-model="formValue[item.name]" @input="$emit('change',item.name,formValue[item.name])" type="password" :placeholder="item.placeholder" :readonly="item.readonly" :disabled="item.disabled" show-password clearable/>
          <el-date-picker v-else-if="item.type === 'date'" v-model="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" type="date" :placeholder="item.placeholder" value-format="yyyy-MM-dd" :readonly="item.readonly" :disabled="item.disabled" clearable/>
          <el-date-picker v-else-if="item.type === 'dates'" v-model="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" type="daterange" range-separator="-" :start-placeholder="item.placeholder" :end-placeholder="item.placeholder" value-format="yyyy-MM-dd" :readonly="item.readonly" :disabled="item.disabled" clearable/>
          <el-date-picker v-else-if="item.type === 'year'" v-model="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" type="year" :placeholder="item.placeholder" value-format="yyyy" :readonly="item.readonly" :disabled="item.disabled" clearable/>
          <el-select v-else-if="item.type === 'select'" v-model="formValue[item.upName]" :value="formValue[item.name]" @change="$emit('change',item.name,formValue[item.name])" :placeholder="item.placeholder" :readonly="item.readonly" :disabled="item.disabled" clearable>
            <el-option v-for="(v,k) in item.select" :key="k" :label="v.label" :value="v.value" clearable/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: 'form-list',
  props: {
    rules: Object,
    disabled: Boolean,
    formValue: Object,
    labelWidth: String,
    formGutter: Number,
    statusIcon: Boolean,
    formList: [Array, Object]
  },
  data: function () {
    return {
      file: {},
      show: true
    }
  },
  methods: {
    Refresh() {
      this.show = false
      setTimeout(() => {
        this.show = true
      })
    },
    selectFile({name, accept, type}) {
      if (!this.file[name]) {
        this.file[name] = document.createElement('input')
        this.file[name].accept = accept
        this.file[name].type = type
        this.file[name].onchange = () => {
          this.formValue[name] = this.file[name].files[0]
          this.$emit('change', name, this.formValue[name])
          this.Refresh()
          // this.file[name] = null
        }
      }
      this.file[name].click()
    },
    // 手动触发验证
    validate(func) {
      this.$refs.formList.validate(event => func(event))
    },
    fileRemove(item) {
      this.file[item.name] = null
      this.formValue[item.name] = null
      this.Refresh()
      this.$emit('fileRemove', item)
    },
    // 清空验证
    clearValidate() {
      // 验证
      this.$refs.formList.clearValidate()
    }
  }
}
</script>
<style scoped lang="scss">
.form-list-tips {
  padding: 0 16px;
  font-size: 12px;
  margin-bottom: 5px;

  /deep/
  > i {
    font-size: 12px !important;
  }
}

.form-list {
  /deep/
  .el-form-item {
    display: flex;
    //align-items: center;

    &__label {
      width: 140px;
      min-width: 140px;
    }

    &__content {
      width: calc(100% - 140px);

      > * {
        width: 100%;
      }
    }
  }
}
</style>
