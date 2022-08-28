<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    :size="size"
    label-position="top"
    @submit.native.prevent
  >
    <el-form-item
      :label="comptName"
      prop="comptValue"
    >
      <el-input-number
        :key="refreshKey"
        style="width: 100%"
        :size="size"
        v-model="form.comptValue"
        :placeholder="placeholder"
        :controls="false"
        :min="isValidMinValue ? minValue : -Infinity"
        :max="isValidMaxValue ? maxValue : Infinity"
        :precision="precision"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import formMixins from '../mixins/formMixins';
export default {
  name: 'BdNumberInput',
  mixins: [formMixins],
  data() {
    return {};
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    comptName: {
      type: String,
      default: ''
    },
    fieldValue: [String, Number],
    dataFormat: {
      type: String,
      default: '2'
    },
    decimalDigit: {
      type: Number,
      default: 1
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    isValidMinValue: {
      type: Boolean,
      default: false
    },
    isValidMaxValue: {
      type: Boolean,
      default: false
    },
    minValue: {
      type: Number,
      default: -Infinity
    },
    maxValue: {
      type: Number,
      default: Infinity
    },
    size: {
      type: String
    }
  },
  methods: {
  },
  computed: {
  	// 如果区间改变要重新处理输入框的值
    refreshKey() {
      return `${this.isRequired}-${this.isValidMinValue}-${this.minValue}-${this.isValidMaxValue}-${this.maxValue}`;
    },
    precision() {
      let ret = this.decimalDigit;
      if (this.dataFormat === '2') {
        ret = 0;
      }
      return ret;
    },
    rules() {
      let rules = {};
      rules['comptValue'] = [
        { required: this.isRequired, message: `请输入${this.comptName}`, trigger: 'blur' }
      ];
      return rules;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-input--mini .el-input__inner {
  text-align: left;
}
/deep/ .el-form-item__label{
  word-break: break-all;
}
</style>
