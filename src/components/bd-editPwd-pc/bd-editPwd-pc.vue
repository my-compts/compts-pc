<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      class="dialog-wrap"
      title="密码修改"
      width="500px"
      v-if="terminalType === 0 && visible"
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
    <van-form
      @submit="submitAfterValid"
      v-else-if="terminalType === 1 && visible"
      :key="mobileFormKey"
    >
      <van-field
        v-model="data.passwd"
        name="passwd"
        label="旧密码"
        :placeholder="mobilePlaceholder.passwd"
        :type="data.passwdShow?'text':'password'"
        :right-icon="data.passwdShow ? 'eye-o' : 'closed-eye'"
        :rules="dbRules.passwd"
        @click-right-icon="data.passwdShow=!data.passwdShow"
        :show-error-message="false"
        @blur="resetMessage"
      />
      <van-field
        v-model="data.newPwd"
        name="newPwd"
        label="新密码"
        :placeholder="mobilePlaceholder.newPwd"
        :type="data.newPwdShow?'text':'password'"
        :right-icon="data.newPwdShow ? 'eye-o' : 'closed-eye'"
        :rules="dbRules.newPwd"
        @click-right-icon="data.newPwdShow=!data.newPwdShow"
        @blur="resetMessage"
      />
      <van-field
        v-model="data.confirmPwd"
        name="confirmPwd"
        label="确认密码"
        :placeholder="mobilePlaceholder.confirmPwd"
        :type="data.confirmPwdShow?'text':'password'"
        :right-icon="data.confirmPwdShow ? 'eye-o' : 'closed-eye'"
        :rules="dbRules.confirmPwd"
        @click-right-icon="data.confirmPwdShow=!data.confirmPwdShow"
        @blur="resetMessage"
      />
      <ul class="information-list">
        <li>新密码为：</li>
        <li
          v-for="(item, index) in pwdTip"
          :key="index"
        >
          <b />{{ item }}
        </li>
      </ul>
      <div style="margin: 16px;">
        <van-button
          block
          type="default"
          native-type="submit"
        >
          确认修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { updatePassword, getPublicKey } from '../../api/userMgt.js';
import { RSAUtil } from 'ngbd-utils';
import { Toast } from 'vant';
export default {
  name: 'BdEditPwdPc',
  props: {
    visible: Boolean,
    closeOnModal: {
      type: Boolean,
      default: false
    },
    closeOnEscape: {
      type: Boolean,
      default: false
    },
    // 终端类型 0-pc 1-手机端
    terminalType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    // 获取rsa加密publicKey
    if (Boolean(sessionStorage.getItem('publicKey')) === false) { // 需要查询publicKey
      getPublicKey().then(res => {
        if (res.status === 200 && res.data.respResult === '1') {
          let data = res.data.respData || '';
          window.sessionStorage.setItem('publicKey', data);
        }
      });
    }
  },
  data() {
    var handleValidCall = (callback, validMessage, key) => {
      if (typeof callback === 'function') {
        validMessage !== '' ? callback(new Error(validMessage)) : callback();
      }
      // 手机端修改校验提示文字内容
      if (this.terminalType === 1) {
        const mesgCont = validMessage;
        // 如果是为空时，仅显示一个请输入...的提示内容
        this.dbRules[key][0]['message'] = mesgCont === this.mobilePlaceholder[key] ? '' : mesgCont;
      }
    };
    var checkPwd = (dbRules, value, callback) => {
      let validMessage = '';
      let inputValue = value;
      if (this.terminalType === 1) {
        inputValue = dbRules;
      }
      if (!inputValue) {
        validMessage = '请输入原始密码';
      }
      handleValidCall(callback, validMessage, 'passwd');
      return validMessage === '';
    };
    var checkNewPwd = (dbRules, value, callback) => {
      let userInfo = (JSON.parse(window.sessionStorage.getItem('X-NG-UserInfo')) || {}).userInfo || {};
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?!.\s)[\da-zA-Z\S]{6,20}$/;
      let re = new RegExp(reg);
      var userId = userInfo.userId;
      let validMessage = '';
      let inputValue = value;
      if (this.terminalType === 1) {
        inputValue = dbRules;
      }
      if (!inputValue) {
        validMessage = '请输入新密码';
        // callback(new Error('请输入新密码'));
      } else if (inputValue === userId) {
        validMessage = '密码不能与工号相同';
        // callback(new Error('密码不能与工号相同'));
      } else if (!re.test(inputValue)) {
        validMessage = '密码不符合规则，请重新输入';
        // callback(new Error('密码不符合规则，请重新输入'));
      } else {
        // callback();
        // if (this.data.confirmPwd !== '') {
        //   this.$refs.form.validateField('confirmPwd');
        // }
      }
      if (validMessage === '' && this.data.confirmPwd !== '' && this.terminalType === 0) {
        this.$refs.form.validateField('confirmPwd');
      }
      handleValidCall(callback, validMessage, 'newPwd');
      return validMessage === '';
    };
    var checkConfirmPwd = (dbRules, value, callback) => {
      let userInfo = (JSON.parse(window.sessionStorage.getItem('X-NG-UserInfo')) || {}).userInfo || {};
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?!.\s)[\da-zA-Z\S]{6,20}$/;
      let re = new RegExp(reg);
      let userId = userInfo.userId;
      let newPwd = this.data.newPwd;
      let validMessage = '';
      let inputValue = value;
      if (this.terminalType === 1) {
        inputValue = dbRules;
      }
      if (!inputValue) {
        validMessage = '请输入确认密码';
        // return callback(new Error('请输入确认密码'));
      } else if (re.test(newPwd)) {
        if (inputValue !== newPwd) {
          validMessage = '两次输入的密码不一致';
          // return callback(new Error('两次输入的密码不一致'));
        } else {
          // callback();
        }
      } else if (inputValue === userId) {
        validMessage = '密码不能与工号相同';
        // return callback(new Error('密码不能与工号相同'));
      } else if (!re.test(inputValue)) {
        validMessage = '密码不符合规则，请重新输入';
        // callback(new Error('密码不符合规则，请重新输入'));
      } else {
        // callback();
      }
      handleValidCall(callback, validMessage, 'confirmPwd');
      return validMessage === '';
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
        passwdShow: false,
        newPwdShow: false,
        confirmPwdShow: false, // 手机端密码显示隐藏
        oldFlag: false,
        newFlag: false,
        conFlag: false
      },
      loading: false,
      mobilePlaceholder: {
        passwd: '请输入原始密码',
        newPwd: '请输入新密码',
        confirmPwd: '请输入确认密码'
      },
      mobileFormKey: 0
      // userInfo: {}
    };
  },
  watch: {
    terminalType: {
      immediate: true,
      handler(newVal) {
        // 手机端重置一下校验规则的trigger，跟elementui的不一样
        if (newVal === 1) {
          const keys = Object.keys(this.dbRules);
          keys.forEach((keyName) => {
            this.dbRules[keyName][0].trigger = 'onBlur';
          });
        }
      }
    }
  },
  // activated() {
  //   this.userInfo = (JSON.parse(window.sessionStorage.getItem("X-NG-UserInfo")) || {}).userInfo || {};
  // },
  methods: {
    // 如果是输入框为空时,重置校验提示信息文字为空，不显示两份相同的提示
    resetMessage() {
      const keys = Object.keys(this.dbRules);
      keys.forEach((keyName) => {
        if (!this.data[keyName]) {
          this.$set(this.dbRules[keyName][0], 'message', '');
        }
      });
    },
    resetFunc() {
      this.data = {
        passwd: '',
        newPwd: '',
        confirmPwd: '',
        oldFlag: false,
        newFlag: false,
        conFlag: false
      };
      // 手机端重置会有问题，重置后显示隐藏图标按钮点击会失灵
      // if (this.terminalType === 1) {
      //   this.resetMessage();
      //   this.mobileFormKey++;
      // }
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
          this.submitAfterValid();
        }
      });
    },
    submitAfterValid() {
      this.loading = true;
      let userInfo = (JSON.parse(window.sessionStorage.getItem('X-NG-UserInfo')) || {}).userInfo || {};
      let param = {
        passwd: RSAUtil.encrypt(this.data.passwd),
        newPwd: RSAUtil.encrypt(this.data.newPwd),
        confirmPwd: RSAUtil.encrypt(this.data.confirmPwd),
        userName: userInfo.userName,
        regionId: userInfo.regionId,
        orgId: userInfo.orgId,
        userId: userInfo.userId
      };
      updatePassword(param)
        .then(res => {
          if (res.status === 200 && res.data.respResult === '1') {
            this.openMessage('success', '密码更改成功');
            this.resetFunc();
            this.$emit('update:visible', false);
          } else {
            this.openMessage('error', res.data.respErrorDesc);
          }
        })
        .finally(() => {
          this.loading = false;
          this.$emit('submitClick');
        });
    },
    openMessage(tipType, message) {
      // 手机 pc的提示组件不一样
      const methodNameMap = {
        success: 'success',
        error: 'fail'
      };
      if (this.terminalType === 0) {
        this.$message[tipType](message);
      } else {
        Toast[methodNameMap[tipType]](message);
      }
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
.information-list {
    padding: 0 16px;
    color: #969799;
    margin: 10px 0 30px;
    li {
      height: 28px;
      line-height: 28px;
      padding: 5px 0;
      vertical-align: middle;
      b {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #969799;
        margin-right: 6px;
        vertical-align: 2px;
      }
    }
}
.pwd-icon {
  line-height: 30px;
  font-size:18px;
  cursor: pointer;
}

</style>
