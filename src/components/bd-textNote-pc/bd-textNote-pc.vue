<template>
  <el-tooltip
    :disabled="disable"
    popper-class="bd-textnote-pc-tooltip"
    :effect="noteBgStyle"
    :placement="notePosition"
  >
    <div
      slot="content"
      :style="{height: contHeight}"
    >
      <el-scrollbar style="height:100%;">
        <div v-html="newNoteText" />
      </el-scrollbar>
    </div>
    <div
      :class="['tool-btn', {disable: disable}]"
      @click="optClick"
    >
      <span
        v-show="isShowfontIcon"
        :style="{
          'font-size': iconSize + 'px',
          'color': iconColor
        }"
        :class="[titleIconCls, 'tool-btn-icon']"
      />
      <span
        v-show="isShowText"
        :style="{
          'font-size': fontSize + 'px',
          'color': fontColor,
          'font-weight': fontWeight
        }"
        class="tool-btn-text"
      >{{ textLable }}</span>
      <div
        ref="textNoteBak"
        class="text-note-bak"
        v-html="newNoteText"
      />
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'BdTextNotePc',
  props: {
    // 组件名称
    textLable: {
      type: String,
      default: '文字注释'
    },
    // 展示图标
    titleIconCls: {
      type: String,
      default: 'icon-A10407_help'
    },
    // 注释内容
    noteContent: {
      type: String,
      default: '自定义'
    },
    // 注释位置
    notePosition: {
      type: String,
      default: 'top-start'
    },
    // 图标大小
    iconSize: {
      type: Number,
      default: 16
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: '#000'
    },
    // 名称大小
    fontSize: {
      type: Number,
      default: 16
    },
    // 名称颜色
    fontColor: {
      type: String,
      default: '#000'
    },
    // 名称是否加粗
    fontWeight: {
      type: String,
      default: 'normal'
    },
    // 注释主题
    noteBgStyle: {
      type: String,
      default: 'dark'
    },
    // 是否展示图标
    isShowfontIcon: {
      type: Boolean,
      default: true
    },
    // 是否展示名称
    isShowText: {
      type: Boolean,
      default: true
    },
    // 是否禁用
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contHeight: ''
    };
  },
  methods: {
    optClick() {}
  },
  computed: {
  	newNoteText() {
  		let _text = this.noteContent.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
      return _text;
    }
  },
  watch: {
    noteContent(nv, ov) {
      if (nv === '') {
        this.contHeight = '0px';
        return;
      }
      let _h = '';
      let _this = this;
      this.$nextTick(() => {
        _h = _this.$refs.textNoteBak.clientHeight;
        _this.contHeight = _h + 'px';
        if (_h >= 300) {
          _this.contHeight = '300px';
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$disable-clr01:#909399; // 禁用颜色
.tool-btn {
  cursor: pointer;
  &.disable {
    cursor: not-allowed;
    .tool-btn-icon {
      color: $disable-clr01!important;
    }
    .tool-btn-text {
      color: $disable-clr01!important;
    }
    &:hover {
      opacity: 1;
      .tool-btn-text {
        color: $disable-clr01!important;
      }
    }
  }
  display: inline-block;
  .tool-btn-icon {
    opacity: 1;
    margin-right: 5px;
  }
  .tool-btn-text {
    position: relative;
    top: -1px;
  }
  &:hover {
    opacity: 0.7;
  }
}
</style>
<style lang="scss">
.bd-textnote-pc-tooltip.el-tooltip__popper {
  max-width: 417px;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.text-note-bak {
  visibility:hidden;
  position: absolute;
  top: -500px;
  left: -500px;
  border-radius: 4px;
  padding: 2px 0;
  font-size: 12px;
  line-height: 1.2;
  min-width: 10px;
  word-wrap: break-word;
  max-width: 417px;
}
</style>
