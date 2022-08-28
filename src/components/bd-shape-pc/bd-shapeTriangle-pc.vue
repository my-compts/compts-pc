<template>
  <div
    :id="`${canvasId}-box`"
    style="width: 100%; height: 100%;"
  >
    <canvas
      :id="canvasId"
    />
  </div>
</template>

<script>
var elementResizeDetectorMaker = require('element-resize-detector');
export default {
  name: 'BdShapeTrianglePc',
  props: {
    canvasId: {
      type: String,
      default: ''
    },
    lineWidth: {
      type: Number,
      default: 1
    },
    strokeStyle: {
      type: String,
      default: 'darkblue'
    },
    fillStyle: {
      type: String,
      default: 'blue'
    },
    direction: {
      type: String,
      default: 'up'
    },
    lineStyle: {
      type: String,
      default: 'solid'
    }
  },
  data() {
    return {
    };
  },
  methods: {
    paint() {
      let cvWidth = document.getElementById(`${this.canvasId}-box`).clientWidth;
      let cvHeight = document.getElementById(`${this.canvasId}-box`).clientHeight;
      let startPosi = this.lineWidth;
      let canvas = document.getElementById(this.canvasId);
      canvas.width = cvWidth;
      canvas.height = cvHeight;
      let context = canvas.getContext('2d');
      context.beginPath();
      if (this.direction === 'up') {
        context.moveTo(cvWidth / 2, startPosi);
        context.lineTo(cvWidth - startPosi, cvHeight - startPosi / 2);
        context.lineTo(startPosi, cvHeight - startPosi / 2);
      } else if (this.direction === 'down') {
        context.moveTo(cvWidth / 2, cvHeight - startPosi);
        context.lineTo(cvWidth - startPosi, startPosi / 2);
        context.lineTo(startPosi, startPosi / 2);
      } else if (this.direction === 'left') {
        context.moveTo(startPosi, cvHeight / 2);
        context.lineTo(cvWidth - startPosi / 2, startPosi);
        context.lineTo(cvWidth - startPosi / 2, cvHeight - startPosi);
      } else if (this.direction === 'right') {
        context.moveTo(cvWidth - startPosi, cvHeight / 2);
        context.lineTo(startPosi / 2, startPosi);
        context.lineTo(startPosi / 2, cvHeight - startPosi);
      }
      context.closePath();
      context.lineWidth = this.lineWidth;
      if (this.lineStyle === 'dashed') {
        context.setLineDash([this.lineWidth * 3]);
        // context.lineCap = 'round';
      }
      context.fillStyle = this.fillStyle;
      context.strokeStyle = this.strokeStyle;
      context.fill();
      if (this.lineWidth > 0) {
        context.stroke();
      }
    },
    listenerResize() {
      var erd = elementResizeDetectorMaker();
      erd.listenTo(document.getElementById(`${this.canvasId}-box`), (element) => {
        this.paint();
      });
      // window.onresize = () => {
      //   this.paint();
      // };
    }
  },
  mounted() {
    this.paint();
    this.listenerResize();
  }
};
</script>
