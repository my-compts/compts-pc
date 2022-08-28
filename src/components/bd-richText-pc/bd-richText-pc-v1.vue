<template>
  <div :class="['rich-text-editor', editorMode]">
    <editor
      :ref="`richText${uuid}`"
      :id="uuid"
      :key="editorKey"
      :disabled="richTextStatus"
      v-model="value"
      @onChange="doChange"
      @onClick="doClick"
      @onExecCommand="execCommand"
      :toolbar="toolbarOptions + itemToolbar"
      :init="{
        height: 500,
        menubar: false,
        statusbar: false,
        skin_url: '/tinymce/skins/ui/oxide',
        content_css: '/tinymce/skins/content/default/content.css',
        setup(editor) {
          toSetIndicator(editor);
        },
        font_formats: fontFormats,
        fontsize_formats: fontSizeFormats,
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
import Editor from '@tinymce/tinymce-vue';

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
    elementsInContent: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      editorKey: '',
      blockValueStyle: '',
      mainColor: '#409eff',
      activeColor: '#F56C6C',
      blockStyle: 'outline: none; cursor: pointer; border: 1px solid #409eff; margin: 0 5px; padding: 0 5px;',
      editorMode: 'edit',
      richTextStatus: false,
      fontFormats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
      fontSizeFormats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
      toolbarOptions: `undo redo | fontselect fontsizeselect bold forecolor backcolor |
           alignment |
           bullist numlist | removeformat | `
    };
  },
  mounted() {
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
    itemList: {
      get () {
        return this.elementsInContent;
      },
      set (data) {
        this.$emit('setElementsInContent', data);
      }
    },
    itemToolbar () {
      return this.editorMode === 'preview' ? 'editItem' : 'insertItem previewItem';
    }
  },
  methods: {
    toEditMode (editor) {
      this.editorKey = Math.random();
      this.editorMode = 'edit';
      let content = editor.getContent();
      let domContent = new DOMParser().parseFromString(content, 'text/html');
      let domItem = domContent.querySelectorAll('.item-key');
      this.itemList.forEach(item => {
        domItem.forEach(di => {
          if (item.keyIndex === di.dataset['itemindex']) {
            di.innerText = item.keyId;
            di.style.border = `1px solid ${this.mainColor}`;
          }
        });
      });
      editor.setContent(domContent.body.innerHTML);
    },
    doChange(val) {
      console.log(val);
      if (!val.lastLevel) {
        return;
      }
      let level = new DOMParser().parseFromString(val.level.content, 'text/html');
      let lastLevel = new DOMParser().parseFromString(val.lastLevel.content, 'text/html');
      let domItem = level.querySelectorAll('.item-key');
      let lastDomItem = lastLevel.querySelectorAll('.item-key');
      if (domItem.length < lastDomItem.length) {
        // 找出编辑器中被删除的item，并从itemlist中删除
        // nodelist需要先转换成数组
        let domList = [];
        let lastDomList = [];
        for (let i = 0; i < domItem.length; i++) {
          domList.push(domItem[i].dataset['itemindex']);
        }
        for (let j = 0; j < lastDomItem.length; j++) {
          lastDomList.push(lastDomItem[j].dataset['itemindex']);
        }
        let removedDom = domList.concat(lastDomList).filter(function(v, i, arr) {
          return arr.indexOf(v) === arr.lastIndexOf(v);
        });
        removedDom.forEach(remove => {
          this.itemList.splice(this.itemList.findIndex(item => item.keyIndex === remove), 1);
        });
      }
    },
    doClick(val) {
      if (this.editorMode === 'preview') {
        this.toEditMode(this.$refs['richText' + this.uuid].editor);
        return;
      }
      // 先清除原来的
      let oriTarget = document.querySelector(`#${this.uuid}_ifr`).contentDocument.querySelector('.item-key.actived');
      if (oriTarget) {
        oriTarget.style.border = `1px solid ${this.mainColor}`;
        oriTarget.classList.remove('actived');
      }
      if (val.target.className === 'item-key') {
        val.target.classList.add('actived');
        val.target.style.border = `1px solid ${this.activeColor}`;
      }
    },
    execCommand (val) {
      console.log(val);
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
          }
          if (val.command === 'FontName') {
            viewStyle = 'fontFamily';
          }
          if (val.command === 'FontSize') {
            viewStyle = 'fontSize';
          }
        }
        execTarget.style[viewStyle] = val.value;
        let curIndex = execTarget.dataset['itemindex'];
        this.itemList.forEach(item => {
          if (curIndex === item.keyIndex) {
            let style = { type: viewStyle, value: val.value };
            item.style.push(style);
          }
        });
      }
    },
    onSelectItem (editor, val) {
      console.log(val);
      let item = { keyIndex: Math.random() * 10 + val.element_id + '', keyId: val.element_name, keyValue: val.value, style: [] };
      this.itemList.push(item);
      editor.insertContent(`<a class="item-key" data-itemindex="${item.keyIndex}" style="${this.blockStyle}" contenteditable="false">${val.element_name}</a>`);
    },
    toSetIndicator (editor) {
      let _this = this;
      editor.ui.registry.addMenuButton('insertItem', {
        text: '指标选择',
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
          _this.toEditMode(editor);
        }
      });
      editor.ui.registry.addButton('previewItem', {
        text: '预览',
        onAction() {
          _this.editorKey = Math.random();
          _this.editorMode = 'preview';
          let content = editor.getContent();
          let domContent = new DOMParser().parseFromString(content, 'text/html');
          let domItem = domContent.querySelectorAll('.item-key');
          _this.itemList.forEach(item => {
            domItem.forEach(di => {
              if (item.keyIndex === di.dataset['itemindex']) {
                if (item.style) {
                  item.style.forEach(st => {
                    di.style[st.type] = st.value;
                  });
                }
                di.style.border = '0';
                di.innerText = item.keyValue;
              }
            });
          });
          editor.setContent(domContent.body.innerHTML);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.rich-text-editor.preview /deep/ {
  .tox-editor-header {
    display: none;
  }
}
</style>
<style lang="scss">
.tox-notifications-container {
  display: none;
}
</style>
