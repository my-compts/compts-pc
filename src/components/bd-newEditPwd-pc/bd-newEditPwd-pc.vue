<template>
  <el-dialog
    :visible.sync="visible"
    class="dialog-wrap"
    title="密码修改"
    width="500px"
    v-if="visible"
    :before-close="closeDialog"
    :close-on-click-modal="closeOnModal"
    :close-on-press-escape="closeOnEscape"
    v-loading="loading"
  >
    <el-form
      :model="data"
      :rules="dbRules"
      ref="form"
      label-width="85px"
      size="mini"
    >
      <el-form-item
        prop="passwd"
        label="旧密码"
      >
        <el-input
          v-model="data.passwd"
          autocomplete="new-password"
          placeholder="请输入内容"
          size="mini"
          :type="data.oldFlag?'text':'password'"
        >
          <i
            slot="suffix"
            :class="['pwd-icon',data.oldFlag?'icon-A10494-Visible':'icon-A10493-Invisible']"
            autocomplete="auto"
            @click="data.oldFlag=!data.oldFlag"
          />
        </el-input>
      </el-form-item>
      <el-tooltip
        key="tool0"
        class="item"
        effect="light"
        placement="right"
      >
        <div
          class="information"
          slot="content"
        >
          <span
            v-for="(item, index) in pwdTip"
            :key="index"
          >
            {{ `${(index+1)}. ${item}` }}
          </span>
        </div>
        <el-form-item
          prop="newPwd"
          label="新密码"
        >
          <el-input
            v-model="data.newPwd"
            autocomplete="new-password"
            placeholder="请输入内容"
            size="mini"
            :type="data.newFlag?'text':'password'"
          >
            <i
              slot="suffix"
              :class="['pwd-icon',data.newFlag?'icon-A10494-Visible':'icon-A10493-Invisible']"
              autocomplete="auto"
              @click="data.newFlag=!data.newFlag"
            />
          </el-input>
        </el-form-item>
      </el-tooltip>
      <el-tooltip
        key="tool1"
        class="item"
        effect="light"
        placement="right"
      >
        <div
          class="information"
          slot="content"
        >
          <span
            v-for="(item, index) in pwdTip"
            :key="index"
          >
            {{ `${(index+1)}. ${item}` }}
          </span>
        </div>
        <el-form-item
          prop="confirmPwd"
          label="确认密码"
        >
          <el-input
            ref="confirmPwd"
            v-model="data.confirmPwd"
            autocomplete="new-password"
            placeholder="请输入内容"
            size="mini"
            :type="data.conFlag?'text':'password'"
          >
            <i
              slot="suffix"
              :class="['pwd-icon',data.conFlag?'icon-A10494-Visible':'icon-A10493-Invisible']"
              autocomplete="auto"
              @click="data.conFlag=!data.conFlag"
            />
          </el-input>
        </el-form-item>
      </el-tooltip>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="mini"
        @click="closeDialog"
      >
        取 消
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="submitForm"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updatePassword } from '../../api/userMgt.js';
import { AESUtil } from 'ngbd-utils';
export default {
  name: 'BdNewEditPwdPc',
  props: {
    visible: Boolean,
    closeOnModal: {
      type: Boolean,
      default: false
    },
    closeOnEscape: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkPwd = (dbRules, value, callback) => {
      if (!value) {
        return callback(new Error('请输入原始密码'));
      } else {
        callback();
      }
    };
    var checkNewPwd = (dbRules, value, callback) => {
      let userInfo = (JSON.parse(window.sessionStorage.getItem('X-NG-UserInfo')) || {}).userInfo || {};
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?!.\s)[\da-zA-Z\S]{6,20}$/;
      let re = new RegExp(reg);
      var userId = userInfo.userId;
      if (!value) {
        return callback(new Error('请输入新密码'));
      } else if (value === userId) {
        return callback(new Error('密码不能与工号相同'));
      } else if (!re.test(value)) {
        callback(new Error('密码不符合规则，请重新输入'));
      } else {
        callback();
        if (this.data.confirmPwd !== '') {
          this.$refs.form.validateField('confirmPwd');
        }
      }
    };
    var checkConfirmPwd = (dbRules, value, callback) => {
      let userInfo = (JSON.parse(window.sessionStorage.getItem('X-NG-UserInfo')) || {}).userInfo || {};
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?!.\s)[\da-zA-Z\S]{6,20}$/;
      let re = new RegExp(reg);
      let userId = userInfo.userId;
      let newPwd = this.data.newPwd;
      if (!value) {
        return callback(new Error('请输入确认密码'));
      } else if (re.test(newPwd)) {
        if (value !== newPwd) {
          return callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      } else if (value === userId) {
        return callback(new Error('密码不能与工号相同'));
      } else if (!re.test(value)) {
        callback(new Error('密码不符合规则，请重新输入'));
      } else {
        callback();
      }
    };
    return {
      pwdTip: ['6-20个字符，密码不能是相同的工号', '只能包含字母、数字以及标点符号（除空格）', '字母、数字和标点符号至少包含2种'],
      dbRules: {
        passwd: [{ required: true, validator: checkPwd, trigger: 'blur' }],
        newPwd: [{ required: true, validator: checkNewPwd, trigger: 'blur' }],
        confirmPwd: [{ required: true, validator: checkConfirmPwd, trigger: 'blur' }]
      },
      data: {
        passwd: '',
        newPwd: '',
        confirmPwd: '',
        oldFlag: false,
        newFlag: false,
        conFlag: false
      },
      loading: false
      // userInfo: {}
    };
  },
  // activated() {
  //   this.userInfo = (JSON.parse(window.sessionStorage.getItem("X-NG-UserInfo")) || {}).userInfo || {};
  // },
  methods: {
    resetFunc() {
      this.data = {
        passwd: '',
        newPwd: '',
        confirmPwd: '',
        oldFlag: false,
        newFlag: false,
        conFlag: false
      };
      this.$nextTick(val => {
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
      });
    },
    closeDialog() {
      this.$confirm('确定取消操作？', '提示', {
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.resetFunc();
          this.$emit('update:visible', false);
        })
        .catch(() => {})
        .finally(() => {
          this.$emit('cancelClick');
        });
    },
    submitForm() {
      if (this.data.newPwd === this.data.passwd) {
        this.$message('新旧密码不能相同');
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          let param = {
            passwd: AESUtil.encrypt(this.data.passwd),
            newPwd: AESUtil.encrypt(this.data.newPwd),
            confirmPwd: AESUtil.encrypt(this.data.confirmPwd)
          };
          updatePassword(param)
            .then(res => {
              if (res.status === 200 && res.data.respResult === '1') {
                this.$message.success('密码更改成功');
                this.resetFunc();
                this.$emit('update:visible', false);
              } else {
                this.$message.error(res.data.respErrorDesc);
              }
            })
            .finally(() => {
              this.loading = false;
              this.$emit('submitClick');
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$main-clr: #409eff;
.dialog-wrap {
  /deep/.el-dialog__body {
    padding: 20px;
  }
}
.information {
  > span {
    display: block;
    line-height: 22px;
    color: $main-clr;
  }
}
/deep/input::-ms-reveal {
  display: none;
}
.pwd-icon {
  line-height: 30px;
  font-size:18px;
  cursor: pointer;
}
</style>
