<template>
  <el-dialog
    width="690px"
    title="用户信息修改"
    :visible.sync="visible"
    append-to-body
    :destroy-on-close="true"
    class="inner-dialog-wrap dialog-wrap"
    :close-on-click-modal="closeOnModal"
    :close-on-press-escape="closeOnEscape"
    id="auto_dsAdd_dialog"
    v-loading="loading"
    :before-close="closeUserForm"
    @open="openFunc"
  >
    <el-form
      :inline="true"
      :model="userInfo"
      :rules="userRules"
      ref="userForm"
      label-width="100px"
      size="mini"
    >
      <el-form-item
        label="用户工号"
        prop="userId"
      >
        <el-input
          v-model="userInfo.userId"
          placeholder="用户工号"
          :disabled="true"
          prop="userId"
        />
      </el-form-item>
      <el-form-item
        label="用户姓名"
        prop="userName"
      >
        <el-input
          :disabled="true"
          v-model="userInfo.userName"
          placeholder="用户姓名"
          maxlength="8"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="创建人"
      >
        <el-input
          v-model="userInfo.createUserName"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="创建日期"
        prop="createTime"
      >
        <el-input
          v-model="userInfo.createTime"
          placeholder="创建日期"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item
        label="用户别名"
        prop="nickName"
      >
        <el-input
          v-model="userInfo.nickName"
          placeholder="用户别名"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="mobilePhone"
      >
        <el-input
          v-model="userInfo.mobilePhone"
          placeholder="手机号码"
          maxlength="11"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="电子邮箱"
        prop="mailAddr"
      >
        <el-input
          v-model="userInfo.mailAddr"
          placeholder="电子邮箱"
          maxlength="32"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="证件类型"
        prop="icType"
      >
        <el-select
          v-model="userInfo.icType"
          placeholder="证件类型"
          @change="checkIcCard"
        >
          <el-option
            v-for="item in icOptions"
            :key="item.keyId"
            :label="item.keyDesc"
            :value="item.keyId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="证件号码"
        prop="icNo"
      >
        <el-input
          v-model="userInfo.icNo"
          placeholder="证件号码"
          maxlength="32"
          show-word-limit
          :disabled="(this.userInfo.icType||'')===''&&this.userInfo.icType!=='0'"
        />
        <div
          v-show="icMessage"
          class="el-form-item__error"
        >
          {{ icMessage }}
        </div>
      </el-form-item>
      <el-form-item
        label="性别"
        class="radio-wrap"
      >
        <el-radio
          v-for="(item,index) in sexOptions"
          :key="index"
          v-model="userInfo.sex"
          :label="item.keyId"
        >
          {{ item.keyDesc }}
        </el-radio>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="userInfo.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          placeholder="选择日期"
        />
      </el-form-item>
      <div style="margin-top:3px">
        <el-form-item
          class="textarea-wrap"
          label="修改原因"
          prop="remark"
        >
          <el-input
            v-model="userInfo.remark"
            type="textarea"
            :rows="2"
            maxlength="50"
            show-word-limit
            resize="none"
            placeholder="请输入修改原因"
          />
        </el-form-item>
      </div>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="closeUserForm"
        size="mini"
      >
        取 消
      </el-button>
      <el-button
        :disabled="forbid"
        type="primary"
        @click="submitUserForm"
        size="mini"
      >
        修 改
      </el-button>
    </span>
    <!-- <div style="height:360px">
    </div> -->
  </el-dialog>
</template>

<script>

import { getUser, modifyUser, getPublicKey } from '../../api/userMgt.js';
import { RSAUtil } from 'ngbd-utils';
export default {
  name: 'BdModifyUserPc',
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
    var checkUserName = (userRules, value, callback, source) => {
      let mes = '用户名';
      let len = 8;
      if (Object.keys(source).indexOf('nickName') > -1) {
        mes = '别名';
        len = 10;
      }
      if (!value.trim()) {
        return callback(new Error(`请输入${mes}`));
      } else if (value.length > len) {
        callback(new Error(`${mes}不能超过${len}个字符`));
      } else {
        callback();
      }
    };
    var checkUserPhone = (userRules, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号码'));
      } else if (value.length !== 11) {
        callback(new Error('请输入正确手机号码'));
      } else {
        callback();
      }
    };
    var checkEmail = (userRules, value, callback) => {
      let reg = /^[A-z0-9]+([._\\-]*[A-z0-9])*@([A-z0-9]+[-A-z0-9]*[A-z0-9]+.){1,63}[A-z0-9]+$/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确邮箱'));
      } else {
        callback();
      }
    };
    var checkIdCard = (userRules, value, callback) => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证
      if (this.userInfo.icType === '1') { // 护照
        reg = /^1[45][0-9]{7}$|([P|p|S|s]\d{7}$)|([S|s|G|g]\d{8}$)|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|([H|h|M|m]\d{8,10})$/;
      } else if (this.userInfo.icType === '2') { // 台胞证
        reg = /^[a-zA-Z][0-9]{9}$/;
      }
      if (value === '' || value === undefined) {
        this.icMessage = '';
        callback();
      } else if (!reg.test(value) && (!!this.userInfo.icType || this.userInfo.icType === 0)) {
        let mes = '';
        this.icOptions.forEach(ic => {
          if (ic.keyId === this.userInfo.icType) {
            mes = ic.keyDesc;
          }
        });
        this.icMessage = `请输入正确的${mes}号`;
        callback(); // new Error(`请输入正确的${mes}号`)
      } else {
        this.icMessage = '';
        callback();
      }
    };
    var checkNull = (userRules, value, callback, source) => {
      let k = Object.keys(source) + '';
      if (k === 'regionId' || k === 'orgId') {
        callback();
      }
      if (value === '' || (value || '').trim().length === 0) {
        callback(new Error(`请输入${this.editColprop[k]}`));
      } else {
        callback();
      }
    };
    return {
      userInfo: {},
      // NGUserInfo: {},
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      icOptions: [
        { keyId: '0', dimId: '110008', keyDesc: '身份证' },
        { keyId: '1', dimId: '110008', keyDesc: '护照' },
        { keyId: '2', dimId: '110008', keyDesc: '台胞证' }
      ],
      sexOptions: [
        { keyId: '0', dimId: '110009', keyDesc: '男' },
        { keyId: '1', dimId: '110009', keyDesc: '女' }
      ],
      editColprop: {
        passwd: '登录密码',
        remark: '修改原因',
        orgId: '归属机构',
        regionId: '归属区域',
        lockFlag: '锁定标识',
        status: '用户状态'
      },
      userRules: {
        // userName: [{ required: true, validator: checkUserName, trigger: "blur" }],
        nickName: [{ required: true, validator: checkUserName, trigger: 'blur' }],
        passwd: [{ required: true, validator: checkNull, trigger: 'blur' }],
        mobilePhone: [{ required: true, validator: checkUserPhone, trigger: 'blur' }],
        mailAddr: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        orgId: [{ required: true, validator: checkNull, trigger: 'blur' }],
        regionId: [{ required: true, validator: checkNull, trigger: 'blur' }],
        lockFlag: [{ required: true, validator: checkNull, trigger: 'blur' }],
        status: [{ required: true, validator: checkNull, trigger: 'blur' }],
        remark: [{ required: true, validator: checkNull, trigger: 'blur' }],
        icNo: [{ validator: checkIdCard, trigger: 'blur' }]
      },
      icMessage: '',
      forbid: false
    };
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
  methods: {
    getUserInfo() {
      let NGUserInfo = (JSON.parse(window.sessionStorage.getItem('X-NG-UserInfo')) || {}).userInfo || {};
      let param = {};
      param.userId = NGUserInfo.userId;
      getUser(param).then(res => {
        if (res.status === 200 && res.data.respResult === '1') {
          if (!res.data.respData.userId) {
            this.$message.error('查询用户信息失败');
            this.forbid = true;
            return;
          }
          this.userInfo = res.data.respData;
        } else {
          this.$message.error(res.data.respErrorDesc);
        }
      });
    },
    checkIcCard() {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证
      if (this.userInfo.icType === '1') { // 护照
        reg = /^1[45][0-9]{7}$|([P|p|S|s]\d{7}$)|([S|s|G|g]\d{8}$)|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|([H|h|M|m]\d{8,10})$/;
      } else if (this.userInfo.icType === '2') { // 台胞证
        reg = /^[a-zA-Z][0-9]{9}$/;
      }
      if (this.userInfo.icType === '' || this.userInfo.icType === undefined) {
        this.userInfo.icNo = '';
      }
      let value = this.userInfo.icNo;
      if ((value || '').trim() === '') {
        this.icMessage = '';
      } else if (!reg.test(value) && this.userInfo.icType !== undefined) {
        let mes = '';
        this.icOptions.forEach(ic => {
          if (ic.keyId === this.userInfo.icType) {
            mes = ic.keyDesc;
          }
        });
        this.icMessage = `请输入正确的${mes}号`;
      } else {
        this.icMessage = '';
      }
    },
    openFunc() {
      this.getUserInfo();
      this.$nextTick(val => {
        if (this.$refs.userForm) {
          this.$refs.userForm.clearValidate();
          this.icMessage = '';
        }
      });
    },
    closeUserForm() {
      this.$confirm('确定取消操作？', '提示', {
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$emit('update:visible', false);
          this.loading = false;
        })
        .catch(() => {}).finally(() => {
          this.$emit('cancelClick');
        });
    },
    submitUserForm() {
      this.$refs.userForm.validate(valid => {
        if (valid && this.icMessage === '') {
          this.loading = true;
          let NGUserInfo = (JSON.parse(window.sessionStorage.getItem('X-NG-UserInfo')) || {}).userInfo || {};
          let param = { ...this.userInfo };
          param.modifyUser = NGUserInfo.userId;
          if (!param.birthday) {
            param.clearBirthDay = true;
          }
          if (param.sex === '') {
            delete param.sex;
          }
          if (param.icType === '' || param.icType === undefined) {
            delete param.icType;
          }
          if (!param.icNo) {
            param.clearIcNo = true;
            param.icNo = '';
          }
          if (param.birthday === '') {
            delete param.birthday;
          }
          let copyUser = JSON.parse(JSON.stringify(param));
          let copyParam = {
            'userName': RSAUtil.encrypt(copyUser.userName),
            'userId': copyUser.userId,
            'nickName': RSAUtil.encrypt(copyUser.nickName),
            'mobilePhone': RSAUtil.encrypt(copyUser.mobilePhone),
            'mailAddr': RSAUtil.encrypt(copyUser.mailAddr),
            'sex': copyUser.sex,
            'birthday': copyUser.birthday,
            'icType': copyUser.icType,
            'icNo': copyUser.icNo === '' ? '' : RSAUtil.encrypt(copyUser.icNo),
            'remark': copyUser.remark,
            'clearBirthDay': !!copyUser.clearBirthDay,
            'clearIcNo': !!copyUser.clearIcNo
          };
          modifyUser(copyParam).then(res => {
            if (res.status === 200 && res.data.respResult === '1') {
              this.$message.success('信息修改成功！');
              this.$emit('update:visible', false);
              let xuser = JSON.parse(window.sessionStorage.getItem('X-NG-UserInfo'));
              try {
                let NGUserInfo = (JSON.parse(window.sessionStorage.getItem('X-NG-UserInfo')) || {}).userInfo || {};
                NGUserInfo = {
                  ...NGUserInfo,
                  nickName: param.nickName,
                  mobilePhone: param.mobilePhone,
                  mailAddr: param.mailAddr,
                  icNo: param.icNo || '',
                  icType: param.icType,
                  sex: param.sex
                };
                xuser.userInfo = NGUserInfo;
                window.sessionStorage.setItem('X-NG-UserInfo', JSON.stringify(xuser));
              } catch (e) {}
            } else {
              this.$message.error(res.data.respErrorDesc);
            }
          }).catch(() => {}).finally(() => {
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
.dialog-wrap {
  overflow: hidden;
  /deep/.el-dialog__body {
    overflow: hidden;
  }
  .el-cascader.el-cascader--mini,
  .el-select.el-select--mini,
  .el-input.el-input--mini {
    width: 163px;
    /deep/.el-input__inner {
      padding-right: 45px;
    }
  }
  .el-form-item--mini.el-form-item {
    width: 300px;
    &.textarea-wrap {
      width: 630px;
      margin-bottom: 0;
      /deep/.el-form-item__content {
        width: calc(100% - 145px);
      }
    }
    &.hidden {
      height: 0;
      width: 0;
      overflow: hidden;
      margin-right: 0;
    }
  }
  .el-date-editor.el-input {
    width: 163px;
  }
  /deep/ .el-collapse-item:last-child .el-collapse-item__content {
    padding-bottom: 0px;
  }
  /deep/ .el-collapse-item__header {
    height: 33px;
    line-height: 33px;
    padding-left: 20px;
    position: relative;
    display: table;
  }

  /deep/ .el-collapse-item__header .el-collapse-item__arrow {
    position: absolute;
    left: 0;
    line-height: 33px;
  }

  /deep/ .el-collapse-item__header,
  /deep/ .el-collapse-item__wrap {
    border-bottom: 0px;
  }

  /deep/ .el-collapse {
    border: 0px;
  }
  /deep/.el-input .el-input__count .el-input__count-inner {
    background: none;
  }
  /deep/.el-scrollbar__wrap {
    margin-right: -17px;
    margin-bottom: -17px;
    overflow-x: hidden;
  }
}
// .dialog-wrap {
//   /deep/.el-dialog__body {
//     padding: 20px;
//   }
//   /deep/ .el-input {
//     width: 163px;
//   }
//   .el-form--inline .el-form-item {
//     width: 49%;
//     margin:  0 0 18px 0;
//     &:nth-child(2n) {
//       // margin-left: 50px;
//       // margin-right: 0;
//       text-align: right;
//     }
//     &.radio-wrap {
//       /deep/ .el-form-item__content {
//         width: 163px;
//         text-align: left;
//       }
//     }
//     &.textarea-wrap {
//       width: 100%;
//       margin-bottom: 0;
//       /deep/ .el-form-item__content {
//         width: calc(98% - 100px);
//       }
//     }
//   }
//   /deep/.el-input .el-input__count .el-input__count-inner {
//     line-height: initial;
//   }
// }
</style>
