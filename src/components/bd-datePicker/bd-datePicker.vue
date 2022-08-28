<template>
  <el-form
    ref="form"
    :model="form"
    label-position="top"
    :rules="rules"
    :size="size"
    @submit.native.prevent
  >
    <el-form-item
      :label="comptName"
      prop="comptValue"
      :class="{
        'is-required': isRequired
      }"
    >
      <el-date-picker
        style="width: 100%;"
        v-model="form.comptValue"
        :type="type"
        :placeholder="placeholder"
        :value-format="valueFormat"
        :default-time="defaultTime"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import formMixins from '../mixins/formMixins';
export default {
  name: 'BdDatePicker',
  mixins: [formMixins],
  data() {
    return {
      rules: {
        comptValue: [
          { validator: this.validDate, trigger: 'change' }
        ]
      }
    };
  },
  props: {
    size: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    comptName: {
      type: String,
      default: ''
    },
    fieldValue: {
      type: String,
      default: ''
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
    type: {
      type: String,
      default: 'date'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    minValue: {
      type: String,
      default: ''
    },
    maxValue: {
      type: String,
      default: ''
    },
    defaultTime: {
      type: String,
      default: '00:00:00'
    }
  },
  methods: {
    validDate(rule, value, callback) {
      if (this.isRequired && !value) {
        return callback(new Error(`请输入${this.comptName}`));
      } else if (value) { // 有值需要校验最小最大值
        const selectDate = new Date(value).getTime(); const maxValue = this.maxValue; const minValue = this.minValue;
        if (this.isValidMinValue && minValue && selectDate < new Date(minValue).getTime()) {
          return callback(new Error(`${this.comptName}必须在${minValue}之后`));
        }
        if (this.isValidMaxValue && maxValue && selectDate > new Date(maxValue).getTime()) {
          return callback(new Error(`${this.comptName}必须在${maxValue}之前`));
        }
        return callback();
      } else {
        return callback();
      }
    },
    startValidate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // alert('submit!');
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    validDateKey() {
      this.startValidate();
    }
    // 'type': {
    //   immediate: true,
    //   handler(newVal, oldVal) {
    //     if (newVal !== oldVal && typeof oldVal === "string") {
    //       this.startValidate();
    //     }
    //   }
    // }
  },
  computed: {
    // 以下元素变更都需要重新触发组件校验
    validDateKey() {
      return `${this.isRequired}-${this.isValidMinValue}-${this.minValue}-${this.isValidMaxValue}-${this.maxValue}-${this.type}`;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label{
  word-break: break-all;
}
</style>
