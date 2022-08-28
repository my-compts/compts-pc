<!--
 * @Author: your name
 * @Date: 2021-08-18 18:52:35
 * @LastEditTime: 2021-08-19 14:49:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bd-compts-pc/src/views/Form-demo.vue
-->
<template>
  <div>
    <bd-number-input
      v-model="value"
      :field-value="value"
      compt-name="组件名称"
      :is-required="true"
      data-format="2"
      :decimal-digit="3"
      :data-restrict-range="false"
      :min-value="3"
      :max-value="100"
      size="mini"
    />
    <bd-text-input
      v-model="value1"
      :field-value="value1"
      compt-name="文本输入框"
      type="text"
      :is-required="false"
      :is-valid-text-length="false"
      :max-length="10"
      :min-length="2"
    />
    <bd-select
      ref="validForm"
      v-model="value2"
      :field-value="value2"
      :options="options"
      display-type="list"
      select-type="multiple"
      compt-name="选择框"
    />
    <bd-date-picker
      v-model="value4"
      :field-value="value4"
      compt-name="日期"
      :value-format="format"
      type="datetime"
      :is-required="false"
      :is-valid-min-date="true"
      :is-valid-max-date="false"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <div>
      <el-button
        @click="submit"
        type="primary"
      >
        提交
      </el-button>
      <el-button
        @click="reset"
        type="primary"
      >
        重置
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 111,
      value1: '测试ces',
      value2: [],
      options: [
        {
          label: '选项1',
          value: 'xuxiang1'
        },
        {
          label: '选项2',
          value: 'xuxiang2'
        },
        {
          label: '选项2',
          value: 'xuxiang3'
        },
        {
          label: '选项2',
          value: 'xuxiang4'
        },
        {
          label: '选项2',
          value: 'xuxiang5'
        },
        {
          label: '选项2',
          value: 'xuxiang6'
        },
        {
          label: '选项2',
          value: 'xuxiang7'
        }
      ],
      value4: '',
      minDate: '2021-08-01 12:00:00',
      maxDate: '',
      format: 'yyyy-MM-dd HH:mm:ss'
    };
  },
  methods: {
    reset() {
      this.value = undefined;
    },
    submit() {
      this.$refs['validForm'].validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('xxx submit!!');
          return false;
        }
      });
      this.value = '';
      this.value1 = '';
      this.value2 = '';
    }
  }
};
</script>

<style lang="scss"></style>
