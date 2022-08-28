<template>
  <div style="height: 100%">
    <bd-div
      style="width: 50%; height: 50%; float: left; border: 1px solid #ccc;"
      type="bd-shapeCircle-pc"
      :canvas-id="'canvas1'"
      :line-width="2"
      :stroke-style="'red'"
      :fill-style="'yellow'"
      :line-style="'dashed'"
    />
    <bd-div
      style="width: 50%; height: 50%; float: left; border: 1px solid #ccc;"
      type="bd-shapeArrow-pc"
      :canvas-id="'canvas2'"
      :line-width="10"
      :direction="'up'"
      :arrow-type="'double'"
    />
    <bd-div
      style="width: 30%; height: 40%; float: left; border: 1px solid #ccc;"
      type="bd-shapeDiamond-pc"
      :canvas-id="'canvas3'"
      :line-width="0"
      :stroke-style="'red'"
      :fill-style="'yellow'"
      :line-style="'dashed'"
    />
    <bd-div
      style="width: 30%; height: 40%; float: left; border: 1px solid #ccc;"
      type="bd-shapeTriangle-pc"
      :canvas-id="'canvas4'"
      :line-width="20"
      :stroke-style="'red'"
      :fill-style="'yellow'"
      :direction="'down'"
      :line-style="'dashed'"
    />
    <bd-div
      style="width: 30%; height: 40%; float: left; border: 1px solid #ccc;"
      type="bd-shapeRectangle-pc"
      :canvas-id="'canvas5'"
      :line-width="12"
      :stroke-style="'red'"
      :fill-style="'yellow'"
      :direction="'right'"
      :line-style="'solid'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
