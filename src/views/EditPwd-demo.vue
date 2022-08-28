<template>
  <div>
    <div :style="`${Number(terminalType)===1?'width: 350px;height: 750px;background:#F5F7FA;margin-bottom: 30px':'margin-bottom: 30px'}`">
      <bd-div
        type="bd-editPwd-pc"
        :visible.sync="visible"
        :close-on-modal="closeOnModal"
        @submitClick="submitUserForm"
        @cancelClick="cancelDialog"
        :terminal-type="Number(terminalType)"
      />
    </div>
    <el-radio
      v-model="terminalType"
      label="0"
    >
      pc
    </el-radio>
    <el-radio
      v-model="terminalType"
      label="1"
    >
      手机
    </el-radio>
    <el-button @click="clickFunc">
      密码修改
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      closeOnModal: false,
      terminalType: '0'
    };
  },
  methods: {
    clickFunc() {
      this.visible = true;
    },
    submitUserForm() {
      this.$message.success('在这里增加事件处理');
    },
    cancelDialog() {
      this.$message.success('关闭弹窗');
    }
  }
};
</script>

<style lang="scss"></style>
