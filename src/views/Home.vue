<template>
  <div class="home">
    <a @click="goPage('kpiBlock')">指标组</a>
    <br>
    <a @click="goPage('title')">标题</a>
    <br>
    <a @click="goPage('textarea')">文本框</a>
    <br>
    <a @click="goPage('modifyUser')">用户信息修改</a>
    <br>
    <a @click="goPage('editPwd')">密码修改</a>
    <br>
    <a @click="goPage('slideCode')">滑动验证</a>
    <br>
    <a @click="goPage('filterMenu')">筛选菜单</a>
    <br>
    <a @click="goPage('textNote')">文本注释</a>
    <br>
    <a @click="goPage('newModifyUser')">用户信息修改(新)</a>
    <br>
    <a @click="goPage('newEditPwd')">密码修改(新)</a>
    <br>
    <a @click="goPage('indicatorTrend')">指标趋势图</a>
    <br>
    <a @click="goPage('richText')">富文本</a>
    <br>
    <a @click="goPage('indicatorCard')">指标卡</a>
    <br>
    <a @click="goPage('shape')">形状</a>
    <br>
    <a @click="goPage('form')">表单</a>
    <br>
    <a @click="goPage('workFlow')">流程组件</a>
  </div>
</template>

<script>
export default {
  methods: {
    goPage(page) {
      let routeData = this.$router.resolve({ name: page });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  a {
    font-size: 14px;
    color: #409eff;
    cursor: pointer;
    &:hover {
      color: #ff6000;
    }
  }
}
</style>
