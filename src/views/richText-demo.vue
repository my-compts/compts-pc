<template>
  <div style="height: 250px;">
    <el-button @click="changeElements" />
    <bd-div
      style="height: 100%; margin-top: 50px;"
      type="bd-richText-pc"
      uuid="uuidtest2"
      :content="value2"
      :elements="elements"
      :disabled="false"
      :inline="false"
      :cur-theme="curTheme"
      @setContent="setContent2"
    />
    <bd-div
      style="height: 100%; margin-top: 50px;"
      type="bd-richText-pc"
      uuid="uuidtest"
      :content="value"
      :elements="elements"
      :inline="false"
      :cur-theme="curTheme"
      @setContent="setContent"
    />
    <bd-div
      style="height: 100%; margin-top: 50px;"
      type="bd-richText-pc"
      uuid="uuidtest1"
      :content="value1"
      :elements="elements"
      :disabled="false"
      :inline="false"
      :cur-theme="curTheme"
      @setContent="setContent1"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      curTheme: 'dark',
      elements: [
        { element_id: 'id1', element_name: 'gprs', value: '' },
        // { element_id: 'id2', element_name: '用户数', value: '890345' },
        { element_id: 'id3', element_name: '销售总金额', value: '100023166611' }
      ],
      value2: '',
      value1: '<p><span style="color: #4d4d4d; font-family: \'Century Gothic\', \'Microsoft YaHei\', Verdana, 微软雅黑, Arial; font-size: 16px; background-color: #ffffff;"><a class="custom-item" style="outline: none;" contenteditable="false"><span class="item-key" style="outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0px 5px; padding: 0px 5px; background-color: #bfedd2;" contenteditable="false" data-itemid="id1">总流量</span> <span class="item-key-value" style="display: none; background-color: #bfedd2;" data-item="总流量">2300045</span></a><a class="custom-item" style="outline: none;" contenteditable="false"><span class="item-key" style="outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0px 5px; padding: 0px 5px; background-color: #fbeeb8;" contenteditable="false" data-itemindex="1.9156102084411386id2">用户数</span> <span class="item-key-value" style="display: none; background-color: #fbeeb8;" data-item="用户数">890345</span></a><a class="custom-item" style="outline: none;" contenteditable="false"><span class="item-key" style="outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0px 5px; padding: 0px 5px; background-color: #f8cac6;" contenteditable="false" data-itemindex="4.851731334368883id3">销售总金额</span> <span class="item-key-value" style="display: none; background-color: #f8cac6;" data-item="销售总金额">100023111111</span></a></span></p>\n<p><span style="color: #4d4d4d; font-family: \'Century Gothic\', \'Microsoft YaHei\', Verdana, 微软雅黑, Arial; font-size: 16px; background-color: #ffffff;"><span style="color: #2c3e50; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif;">既可以是&nbsp;</span><span style="font-weight: 600; color: #2c3e50; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif;">CSS 选择器<a class="custom-item" style="outline: none;" contenteditable="false"><span class="item-key" style="outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0px 5px; padding: 0px 5px; color: #e67e23;" contenteditable="false" data-itemindex="6.805945150283039id1">总流量</span> <span class="item-key-value" style="display: none; color: #e67e23;" data-item="总流量">2300045</span></a></span><span style="color: #2c3e50; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif;">（也支持比较复杂的关系选择器组合），也可以是&nbsp;</span><span style="font-weight: 600; color: #2c3e50; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif;">Vue 组件<a class="custom-item" style="outline: none;" contenteditable="false"><span class="item-key" style="outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0px 5px; padding: 0px 5px; font-size: 18px; color: #169179;" contenteditable="false" data-itemindex="4.112353992991073id2">用户数</span> <span class="item-key-value" style="display: none; font-size: 18px; color: #169179;" data-item="用户数">890345</span></a></span><span style="color: #2c3e50; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif;">&nbsp;或是一个&nbsp;</span><span style="font-weight: 600; color: #2c3e50; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif;">option 对象<a class="custom-item" style="outline: none;" contenteditable="false"><span class="item-key" style="outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0px 5px; padding: 0px 5px; font-size: 24px; color: #ba372a;" contenteditable="false" data-itemindex="4.144975376547242id3">销售总金额</span> <span class="item-key-value" style="display: none; font-size: 24px; color: #ba372a;" data-item="销售总金额">100023111111</span></a></span><span style="color: #2c3e50; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif;">，以便于在 wrapper 对象中可以轻松地指定想要查找的节点</span></span></p>\n<p><span style="color: #4d4d4d; font-family: \'Century Gothic\', \'Microsoft YaHei\', Verdana, 微软雅黑, Arial; font-size: 16px; background-color: #ffffff;">我最喜欢 WordPress 3.9 的更新是使用了 TinyMCE 4.0 编辑器。新的 TinyMCE 看起来看起来更整洁（真正匹配WP仪表板），它有一些非常不错的附加功能。我的很多老主题和插件必须更新为新 TinyMCE 的工作，所以我花了一些时间研究 API 并找出一些很酷的东西。下面我给你介绍下如何可以拓展 TinyMCE 功能的例子。我不会指导您完成所有步骤，或者是什么的代码意味着（这是为开发者），但会为您提供您的主题或插件可用的代码，你可以复制完全相同的代码，粘贴，然后相应地调整</span></p>\n<ul>\n<li><span style="color: #4d4d4d; font-family: \'Microsoft YaHei\', \'Helvetica Neue\', \'PingFang SC\', sans-serif; font-size: 16px; background-color: #ffffff;">test</span></li>\n<li><span style="color: #4d4d4d; font-family: \'Microsoft YaHei\', \'Helvetica Neue\', \'PingFang SC\', sans-serif; font-size: 16px; background-color: #ffffff;">youxiu</span></li>\n<li><span style="color: #4d4d4d; font-family: \'Microsoft YaHei\', \'Helvetica Neue\', \'PingFang SC\', sans-serif; font-size: 16px; background-color: #ffffff;">优秀</span></li>\n</ul>',
      value: '<p><span style="color: #4d4d4d; font-family: \'Century Gothic\', \'Microsoft YaHei\', Verdana, 微软雅黑, Arial; font-size: 16px; background-color: #ffffff;">.0 编辑器。新的 TinyMCE 看起来看起<a class="custom-item" style="outline: none;" contenteditable="false"><span class="item-key" style="outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0 5px; padding: 0 5px;" contenteditable="false" data-itemid="id1">gprs</span> <span class="item-key-value" style="display: none;" data-item="gprs">2300045</span></a></span></p>\n<p><span style="color: #4d4d4d; font-family: \'Century Gothic\', \'Microsoft YaHei\', Verdana, 微软雅黑, Arial; font-size: 16px; background-color: #ffffff;">.0 编辑器。新的 TinyMCE 看起来看起<a class="custom-item" style="outline: none;" contenteditable="false"><span class="item-key" style="outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0 5px; padding: 0 5px;" contenteditable="false" data-itemid="id2">用户数</span> <span class="item-key-value" style="display: none;" data-item="用户数">890345</span></a></span></p>\n<p><span style="color: #4d4d4d; font-family: \'Century Gothic\', \'Microsoft YaHei\', Verdana, 微软雅黑, Arial; font-size: 16px; background-color: #ffffff;">.0 编辑器。新的 TinyMCE 看起来看起<a class="custom-item" style="outline: none;" contenteditable="false"><span class="item-key" style="outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0 5px; padding: 0 5px;" contenteditable="false" data-itemid="id3">销售总金额</span> <span class="item-key-value" style="display: none;" data-item="销售总金额">100023166611</span></a></span></p>'
    };
  },
  methods: {
    setContent(data) {
      this.value = data;
    },
    setElementsInContent (data) {
      this.elementsInContent = data;
    },
    setContent1(data) {
      this.value1 = data;
    },
    setContent2(data) {
      this.value2 = data;
    },
    setElementsInContent1 (data) {
      this.elementsInContent1 = data;
    },
    changeElements() {
      this.elements = [
        { element_id: 'id2', element_name: 'gprs2', value: '' },
        // { element_id: 'id2', element_name: '用户数', value: '890345' },
        { element_id: 'id4', element_name: '销售总金额2', value: '100023166611' }
      ];
    }
  }
};
</script>

<style lang="scss">
</style>
