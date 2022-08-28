<template>
  <div>
    <bd-div
      type="bd-textNote-pc"
      text-label="业务口径"
      :note-content="textarea"
      :font-color="'#409eff'"
      :font-size="24"
      :font-weight="'normal'"
      :title-icon-cls="'icon-A10407_help'"
      :icon-color="'#409eff'"
      :icon-size="24"
      note-position="top"
      note-bg-style="dark"
      :is-showfont-icon="true"
      :is-show-text="true"
      :disable="false"
    />
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea"
    />
    <bd-div
      type="bd-textNote-pc"
      text-label="业务口径"
      :note-content="textarea2"
      :font-color="'#409eff'"
      :font-size="24"
      :font-weight="'normal'"
      :title-icon-cls="'icon-A10407_help'"
      :icon-color="'#409eff'"
      :icon-size="24"
      note-position="top"
      note-bg-style="dark"
      :is-showfont-icon="true"
      :is-show-text="true"
      :disable="false"
    />
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea2"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: '',
      textarea2: ''
    };
  }
};
</script>

<style lang="scss"></style>
