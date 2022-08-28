<template>
  <div :class="['rich-text-editor', editorMode]">
    <editor
      :ref="`richText${uuid}`"
      :id="uuid"
      :key="editorKey"
      :disabled="disabled"
      v-model="value"
      @onInit="onInit"
      @onFocus="doFocus"
      @onClick="doClick"
      @onBlur="onInit"
      @onExecCommand="execCommand"
      :inline="inline"
      :toolbar="toolbarOptions + itemToolbar"
      :init="{
        toolbar_mode: 'sliding',//工具栏模式取值：floating / sliding / scrolling / wrap
        language: 'zh_CN',
        height: '100%',
        menubar: false,
        statusbar: false,
        icons: 'custom',
        skin_url: `${publicUrl}/tinymce/skins/ui/${skinType}`,
        content_css: inline ? '' : `${publicUrl}/tinymce/skins/content/${contentType}/content.css`,
        setup(editor) {
          toSetIcons();
          toSetIndicator(editor);
        },
        font_formats: fontFormats,
        fontsize_formats: fontSizeFormats,
        // lineheight_formats: lineHeightFormats,
        toolbar_groups: {
          alignment: {
            icon: 'align-left',
            tooltip: '对齐方式',
            items: 'alignleft aligncenter alignright alignjustify',
          },
        },
        plugins: [
          'lists'
        ]
      }"
    />
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/icons/default/icons';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/lists';
import './zh_CN';

export default {
  name: 'BdRichTextPc',
  components: {
    Editor
  },
  props: {
    uuid: {
      type: String,
      default: 'uuidtest'
    },
    content: {
      type: String,
      default: ''
    },
    elements: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    publicUrl: {
      type: String,
      default: ''
    },
    curTheme: {
      type: String,
      default: 'default'
    },
    theme: {
      type: Object,
      default() {
        return { mainColor: '#409eff' };
      }
    }
  },
  data() {
    return {
      operateDomClass: '',
      randomValue: 1,
      editorKey: '',
      blockValueStyle: '',
      skinType: 'oxide',
      contentType: 'default',
      mainColor: this.theme.mainColor,
      activeColor: '#F56C6C',
      blockStyle: `outline: none; cursor: pointer; border: 1px solid ${this.theme.mainColor}; margin: 0 5px; padding: 0 5px;`,
      editorMode: 'edit',
      richTextStatus: false,
      fontFormats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
      fontSizeFormats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
      // lineHeightFormats: '1 1.5 2 2.5', // 需要扩展再打开这里
      toolbarOptions: `undo redo | fontselect |
           fontsizeselect | lineheight |
           bold forecolor |
           backcolor |
           alignment |
           bullist numlist | removeformat | `
    };
  },
  mounted() {
    // 初始化content里的指标值要更新为elements里的value
    if (this.content) {
      this.resetContent();
    }
  },
  watch: {
    'curTheme': {
      immediate: true,
      handler(nv, ov) {
        this.skinType = nv === 'default' ? 'oxide' : ('oxide-' + nv);
        this.contentType = nv;
      }
    },
    'elements': {
      deep: true,
      handler(nv, ov) {
        if (this.content) {
          this.resetContent();
        }
      }
    }
  },
  computed: {
    value: {
      get () {
        return this.content;
      },
      set (data) {
        this.$emit('setContent', data);
      }
    },
    itemToolbar () {
      return this.editorMode === 'preview' ? 'editItem' : 'insertItem previewItem';
    }
  },
  methods: {
    resetContent () {
      let content = this.content;
      let domContent = new DOMParser().parseFromString(content, 'text/html');
      let domELement = domContent.querySelectorAll('.item-key');
      domELement.forEach(item => {
        let findItem = this.elements.find(element => {
          return item.dataset['itemid'] === element.element_id;
        });
        if (findItem) {
          item.innerText = findItem.element_name;
        } else {
          item.innerText = '!元素已被删除';
          item.style.color = 'red';
        }
      });
      let domItem = domContent.querySelectorAll('.item-key-value');
      domItem.forEach(item => {
        let findItem = this.elements.find(element => {
          return item.dataset['item'] === element.element_name;
        });
        if (findItem) {
          item.innerText = findItem.value || ' ';
        } else {
          item.innerText = '!元素已被删除';
          item.style.color = 'red';
        }
      });
      this.value = domContent.body.innerHTML;
    },
    changeMode (mode) {
      this.editorMode = mode;
      let editTarget = document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelectorAll('.item-key');
      let previewTarget = document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelectorAll('.item-key-value');
      editTarget.forEach(target => {
        target.style.display = mode === 'edit' ? 'inline-block' : 'none';
      });
      previewTarget.forEach(target => {
        target.style.display = mode === 'edit' ? 'none' : 'inline-block';
      });
    },
    onInit() {
      if (this.disabled) {
        if (this.inline) {
          this.editorMode = 'preview';
        } else {
          this.changeMode('preview');
        }
      } else {
        this.changeMode('preview');
      }
    },
    doFocus() {
      if (this.disabled || this.inline) {
        return;
      }
      if (this.editorMode === 'preview') {
        this.changeMode('edit');
      }
    },
    async doClick(val) {
      if (this.disabled || this.inline) {
        return;
      }
      if (this.editorMode === 'preview') {
        this.changeMode('edit');
        return;
      }
      await this.operateLoad('close');
      // 先把遮罩去掉 -- 点的时候先加上 actice class
      if (val.target.className.indexOf('item-span') !== -1) {
        // 只有当点击指标时才记录当前的指标类型
        this.operateDomClass = val.target.className;
      } else {
        this.operateDomClass = '';
      }
      await this.operateLoad('close');
      // 先清除原来的
      let oriTarget = document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelector('.item-key.actived');
      if (oriTarget) {
        oriTarget.style.border = `1px solid ${this.mainColor}`;
        oriTarget.classList.remove('actived');
      }
      // 选中这个指标元素 -- 如果是初始化的时候要再添加
      if (val.target.className.indexOf('item-span') !== -1 && this.operateDomClass !== '') {
        document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelector('.' + val.target.className).style.cursor = 'pointer';
        // 选中指标元素 -- 并未item-key添加active class
        setTimeout(() => {
          document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelector('.' + val.target.className).parentNode.firstElementChild.classList.add('actived');
          document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelector('.' + val.target.className).parentNode.firstElementChild.style.border = `1px solid ${this.activeColor}`;
        }, 50);
      }
    },
    async execCommand (val) {
      if (val.value && val.value.indexOf('<a') !== -1) {
        await this.operateLoad('close');
      } else {
        await this.operateLoad('open');
      }
      let execTarget = document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelector('.item-key.actived');
      if (execTarget) {
        let viewStyle = '';
        if (val.ui) {
          if (val.ui === 'forecolor') {
            viewStyle = 'color';
          }
          if (val.ui === 'hilitecolor') {
            viewStyle = 'backgroundColor';
          }
        } else {
          if (val.value === 'bold') {
            viewStyle = 'fontWeight';
            if (execTarget.style[viewStyle] === 'bold') {
              val.value = 'normal';
            }
          }
          if (val.command === 'FontName') {
            viewStyle = 'fontFamily';
          }
          if (val.command === 'FontSize') {
            viewStyle = 'fontSize';
          }
          if (val.command === 'RemoveFormat') {
            viewStyle = 'RemoveFormat';
          }
        }
        execTarget.style[viewStyle] = val.value;
        if (execTarget.nextElementSibling) {
          execTarget.nextElementSibling.style[viewStyle] = val.value;
        }
        let content = this.$refs[`richText${this.uuid}`].editor.getContent();
        let domContent = new DOMParser().parseFromString(content, 'text/html');
        let allItem = domContent.querySelectorAll('.item-key');
        allItem.forEach(item => {
          item.style.border = `1px solid ${this.mainColor}`;
          if (val.command === 'FontSize' && item.className === 'item-key actived') {
            item.parentNode.lastElementChild.style['left'] = execTarget.parentNode.firstElementChild.offsetLeft + 'px';
            item.parentNode.lastElementChild.style['top'] = execTarget.parentNode.firstElementChild.offsetTop + 'px';
            item.parentNode.lastElementChild.style['width'] = execTarget.parentNode.firstElementChild.offsetWidth + 'px';
            item.parentNode.lastElementChild.style['height'] = execTarget.parentNode.firstElementChild.offsetHeight + 'px';
          }
        });
        let domItem = domContent.querySelector('.item-key.actived');
        domItem.style[viewStyle] = val.value;
        domItem.style.border = `1px solid ${this.activeColor}`;
        if (domItem.nextElementSibling) {
          domItem.nextElementSibling.style[viewStyle] = val.value;
        }
        if (viewStyle === 'RemoveFormat') {
          domItem.style.fontSize = '16px';
          domItem.style.fontWeight = 'normal';
          domItem.style.color = '#000000';
          domItem.style.background = '#ffffff';
          domItem.style.fontFamily = 'Microsoft YaHei';
        }
        await this.operateLoad('close');
        setTimeout(() => {
          let editor = this.$refs[`richText${this.uuid}`].editor;
          editor.setContent(domContent.body.innerHTML);
          editor.selection.select(editor.dom.select('.item-key.actived')[0]);
        }, 100);
      }
    },
    // 操作遮罩
    operateLoad(operte) {
      // close--如果点击编辑器不管是点击指标还是点击其他地方 --- 如果此时有记录到指标 -- 先把遮罩加起来
      if (this.operateDomClass && this.operateDomClass.indexOf('item-span') !== -1) {
        if (document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelector('.' + this.operateDomClass)) {
          if (operte === 'close') {
            document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelector('.' + this.operateDomClass).style.zIndex = '99';
          } else {
            document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelector('.' + this.operateDomClass).style.zIndex = '-1';
          }
        }
      }
    },
    onSelectItem (editor, val) {
      ++this.randomValue;
      let item = { keyIndex: Math.random() * 10 + val.element_id + '', keyId: val.element_name, keyValue: val.value || ' ', style: [], keMark: this.randomValue * 5 + '' };
      editor.insertContent(`<a class="custom-item" style="outline: none; position: relative;" contenteditable="false">
      <span class="item-key" data-itemid="${val.element_id}" style="${this.blockStyle}" contenteditable="false">${val.element_name}</span>
      <span class="item-key-value" style="display: none;" data-item="${item.keyId}">${item.keyValue}</span>
      <span class="item-span${item.keMark}" style="position:absolute; cursor：pointer; display: inline-block; width: 100%; height: 100%; left: 0; top: 0;" z-index="99">&nbsp;</span></a>`);
    },
    toSetIcons () {
      tinymce.IconManager.add('custom', {
        icons: {
          'preview': `
            <svg width="24px" height="24px" viewBox="0 -2 19 19">
              <path d="M8,3C4.51,3,1.486,5.031,0,7.998C1.486,10.967,4.51,13,8,13s6.514-2.033,8-5.002C14.514,5.031,11.49,3,8,3   M11.945,5.652c0.939,0.599,1.736,1.402,2.334,2.346c-0.598,0.947-1.395,1.751-2.334,2.35C10.764,11.102,9.4,11.5,8,11.5  s-2.762-0.398-3.943-1.152c-0.941-0.599-1.738-1.402-2.336-2.35c0.598-0.943,1.395-1.747,2.336-2.346  c0.061-0.041,0.121-0.078,0.186-0.116C4.086,5.965,4,6.425,4,6.906c0,2.209,1.793,3.998,4,3.998c2.209,0,4-1.789,4-3.998  c0-0.481-0.086-0.941-0.24-1.368C11.822,5.574,11.883,5.613,11.945,5.652 M8,6.405c0,0.829-0.672,1.5-1.5,1.5S5,7.234,5,6.405  c0-0.827,0.672-1.499,1.5-1.499S8,5.578,8,6.405"/>
            </svg>
          `,
          'indicators': `<svg width="24px" height="24px" viewBox="0 -2 19 19">
                            <g>
                              <g>
                                <path d="M8.032,9.739v5.265c0,0.062,0.024,0.126,0.074,0.174c0.05,0.048,0.116,0.072,0.181,0.072h1.876    c0.065,0,0.131-0.024,0.181-0.072c0.051-0.048,0.075-1.802,0.075-1.865V8.55l-1.908,1.583L8.032,9.739z" />
                                <path d="M0.014,14.994c0,0.064,0.024,0.131,0.074,0.181c0.05,0.05,0.115,0.075,0.181,0.075h1.876c0.065,0,0.131-0.025,0.181-0.075    c0.05-0.05,0.074-0.114,0.074-0.181V9.71l-2.387,1.97L0.014,14.994L0.014,14.994z" />
                                <path d="M4.022,8.371v6.623c0,0.064,0.024,0.131,0.074,0.181c0.05,0.05,0.116,0.075,0.181,0.075h1.877    c0.065,0,0.131-0.025,0.181-0.075s0.074-0.114,0.074-0.181V8.402L5.217,7.388L4.022,8.371z" />
                                <path d="M12.041,15.001c0,0.063,0.025,0.127,0.075,0.176s0.114,0.073,0.18,0.073h1.878c0.065,0,0.131-0.024,0.18-0.073    c0.051-0.049,0.076-0.111,0.076-0.176V5.598l-2.389,2.003V15.001z" />
                              </g>
                              <path d="M15.975,0.774c-0.017-0.016-0.037-0.024-0.061-0.024h-4.285c-0.033,0-0.064,0.02-0.078,0.053   c-0.014,0.033-0.005,0.069,0.02,0.093l1.794,1.764L8.511,6.838L5.217,4.032L0,8.335v1.858L5.217,5.89l3.294,2.805l5.862-5.045   l1.48,1.458c0.024,0.023,0.062,0.031,0.094,0.018C15.979,5.113,16,5.081,16,5.048V0.835C16,0.813,15.991,0.792,15.975,0.774z" />
                            </g>
                          </svg>`
        }
      });
    },
    toSetIndicator (editor) {
      let _this = this;
      editor.ui.registry.addMenuButton('insertItem', {
        tooltip: '指标选择',
        icon: 'indicators',
        fetch(callback) {
          let items = [];
          _this.elements.forEach(element => {
            let item = {
              type: 'menuitem',
              text: element.element_name,
              onAction() {
                _this.onSelectItem(editor, element);
              }
            };
            items.push(item);
          });
          callback(items);
        }
      });
      editor.ui.registry.addButton('editItem', {
        text: '编辑',
        onAction() {
          _this.changeMode('edit');
        }
      });
      editor.ui.registry.addButton('previewItem', {
        tooltip: '预览',
        icon: 'preview',
        onAction() {
          _this.changeMode('preview');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.rich-text-editor /deep/ {
  .tox-tinymce {
    overflow: unset;
  }
	.tox-editor-header {
		position: fixed;
		width: 775px;
		margin-top: -40px;
	}
	// .tox .tox-editor-container {
	// 	padding-top: 80px;
	// }
	.tox:not(.tox-tinymce-inline) .tox-editor-header {
		box-shadow: 0px 0px 4px 1px #ccc;
	}
}
.rich-text-editor.preview /deep/ {
  .tox-editor-header {
    /*display: none;*/
		visibility: hidden;
  }
  .tox-tinymce {
    border: 0;
  }
}
.rich-text-editor /deep/ {
  .tox .tox-edit-area__iframe {
    background-color: transparent;
  }
}
</style>
<style lang="scss">
.tox-notifications-container {
  display: none;
}
.mce-content-body .mce-offscreen-selection{left:-2000000px;max-width:1000000px;position:absolute}
</style>
