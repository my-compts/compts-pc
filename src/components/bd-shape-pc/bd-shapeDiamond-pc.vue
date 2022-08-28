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
  name: 'BdShapeDiamondPc',
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
      let canvas = document.getElementById(this.canvasId);
      canvas.width = cvWidth;
      canvas.height = cvHeight;
      let context = canvas.getContext('2d');
      context.beginPath();
      context.moveTo(cvWidth / 2, this.lineWidth / 2);
      context.lineTo(cvWidth - this.lineWidth, cvHeight / 2);
      context.lineTo(cvWidth / 2, cvHeight - this.lineWidth / 2);
      context.lineTo(this.lineWidth, cvHeight / 2);
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
      //   this.paintArrow();
      // };
    }
  },
  mounted() {
    this.paint();
    this.listenerResize();
  }
};
</script>
