<template>
  <div
    ref="wrap"
    :style="`width:100%; height:100%; border-width:${borderWidth}; border-style:${borderStyle};
    borderColor:${borderColor}; background-color:${bgColor};text-align:${textAlign};text-decoration:${textDecoration};
    color:${color};font-size:${fontSize};border-radius:${borderRadius};font-weight:${fontWeight};`"
    @click="textFocus"
  >
    <el-scrollbar
      ref="scroll-bar"
      style="width:100%;height:100%;"
    >
      <div
        :style="`font-family:${fontFamily}`"
        class="text-input"
        ref="textarea"
        :contenteditable="editable"
        @focus="focusEvent"
        @blur="blurEvent"
        @click.stop="clickPrev"
      />
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      value: ''
    };
  },
  name: 'BdTextareaPc',
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: 'transparent'
    },
    borderColor: {
      type: String,
      default: '#ccc'
    },
    borderStyle: {
      type: String,
      default: 'none'
    },
    borderWidth: {
      type: String,
      default: '1px'
    },
    radiusOn: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    textDecoration: {
      type: String,
      default: 'unset'
    },
    color: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: ''
    },
    fontFamily: {
      type: String,
      default: ''
    },
    borderRadius: {
      type: String,
      default: ''
    },
    fontWeight: {
      type: String,
      default: ''
    }
  },
  methods: {
    pasteHandle() {
      if (window.clipboardData) { // ie修改剪贴板内容
        let txt = window.clipboardData.getData('Text');
        window.clipboardData.setData('Text', txt);
      }
    },
    editChange() {
      this.editable = !this.editable;
    },
    show() {
      sessionStorage.setItem('param', this.value);

      this.value2 = sessionStorage.getItem('param');
    },
    focusEvent() {
      // console.log("focus");
      this.pasteHandle();
    },
    blurEvent() {
      this.asynData();
      this.$emit('textisbluring');
    },
    asynData() {
      // emoji表情过滤
      let reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[A9|AE]\u3030|\uA9|\uAE|\u3030/ig;
      let html = this.$refs.textarea.innerHTML;
      if (reg.test(html)) {
        html = html.replace(reg, '');
        this.$refs.textarea.innerHTML = html;
      }
      let text = this.$refs.textarea.innerText;
      this.value = html;
      this.text = text;
    },
    textFocus() {
      let range = {};
      let obj = this.$refs.textarea;
      obj.focus();
      if (window.getSelection) { // ie11 10 9 ff safari
        range = window.getSelection(); // 创建range
        range.selectAllChildren(obj); // range 选择obj下所有子内容
        range.collapseToEnd(); // 光标移至最后
      } else if (document.selection) { // ie10 9 8 7 6 5
        range = document.selection.createRange(); // 创建选择对象
        range.moveToElementText(obj); // range定位到obj
        range.collapse(false); // 光标移至最后
        range.select();
      }
    },
    clickPrev() {

    }
  },
  mounted() {
    // console.log(this.$refs['scroll-bar']);
    // dealImage(this.$refs.lightImage, imageSrc);
  }
};
</script>

<style lang="scss" scoped>
.radius-on {
  border-radius: 10px;
}
.text-input {
  width: 100%;
  height: 100%;
  word-break: break-all;
  outline: none;
  // overflow-y: auto;
  // overflow-x: hidden;
}
// ::-webkit-scrollbar {
//   /*滚动条整体样式*/

//   width: 4px; /*高宽分别对应横竖滚动条的尺寸*/

//   height: 4px;
// }

// ::-webkit-scrollbar-thumb {
//   /*滚动条里面小方块*/

//   border-radius: 5px;

//   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

//   background: rgba(0, 0, 0, 0.3);
// }

// ::-webkit-scrollbar-track {
//   /*滚动条里面轨道*/

//   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

//   border-radius: 0;

//   background: rgba(0, 0, 0, 0.1);
// }
</style>
