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
  name: 'BdShapeArrowPc',
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
      default: 'left'
    },
    lineStyle: {
      type: String,
      default: 'solid'
    },
    arrowType: {
      type: String,
      default: 'single'
    }
  },
  data() {
    return {
    };
  },
  methods: {
    paintArrow() {
      let cvWidth = document.getElementById(`${this.canvasId}-box`).clientWidth;
      let cvHeight = document.getElementById(`${this.canvasId}-box`).clientHeight;
      let midPosi = cvWidth < cvHeight ? cvWidth / 2 : (cvWidth - cvHeight / 2);
      // 上下方向箭头的midposi不同
      if (this.direction === 'down' || this.direction === 'up') {
        midPosi = cvHeight < cvWidth ? cvHeight / 2 : (cvHeight - cvWidth / 2);
      }
      let startPosi = this.lineWidth;
      if (this.direction === 'left') {
        startPosi = cvWidth - this.lineWidth;
        midPosi = cvWidth - midPosi;
      }
      if (this.direction === 'up') {
        startPosi = cvHeight - this.lineWidth;
        midPosi = cvHeight - midPosi;
      }
      let canvas = document.getElementById(this.canvasId);
      canvas.width = cvWidth;
      canvas.height = cvHeight;
      let context = canvas.getContext('2d');
      context.beginPath();
      if (this.direction === 'up' || this.direction === 'down') {
        if (this.arrowType === 'double') {
          // 双箭头
          context.moveTo(cvWidth / 2, startPosi);
          context.lineTo(this.lineWidth, cvHeight - midPosi);
          context.lineTo(cvWidth / 4, cvHeight - midPosi);
          context.lineTo(cvWidth / 4, midPosi);
          context.lineTo(this.lineWidth, midPosi);
          context.lineTo(cvWidth / 2, cvHeight - (startPosi));
          context.lineTo(cvWidth - this.lineWidth, midPosi);
          context.lineTo(cvWidth / 4 * 3, midPosi);
          context.lineTo(cvWidth / 4 * 3, cvHeight - midPosi);
          context.lineTo(cvWidth - this.lineWidth, cvHeight - midPosi);
        } else {
          context.moveTo(cvWidth / 4, startPosi);
          context.lineTo(cvWidth / 4, midPosi);
          context.lineTo(this.lineWidth, midPosi);
          context.lineTo(cvWidth / 2, cvHeight - (startPosi));
          context.lineTo(cvWidth - this.lineWidth, midPosi);
          context.lineTo(cvWidth / 4 * 3, midPosi);
          context.lineTo(cvWidth / 4 * 3, startPosi);
        }
      } else {
        if (this.arrowType === 'double') {
          context.moveTo(startPosi, cvHeight / 2);
          context.lineTo(cvWidth - midPosi, this.lineWidth);
          context.lineTo(cvWidth - midPosi, cvHeight / 4);
          context.lineTo(midPosi, cvHeight / 4);
          context.lineTo(midPosi, this.lineWidth);
          context.lineTo(cvWidth - (startPosi), cvHeight / 2);
          context.lineTo(midPosi, cvHeight - this.lineWidth);
          context.lineTo(midPosi, cvHeight / 4 * 3);
          context.lineTo(cvWidth - midPosi, cvHeight / 4 * 3);
          context.lineTo(cvWidth - midPosi, cvHeight - this.lineWidth);
        } else {
          context.moveTo(startPosi, cvHeight / 4);
          context.lineTo(midPosi, cvHeight / 4);
          context.lineTo(midPosi, this.lineWidth);
          context.lineTo(cvWidth - (startPosi), cvHeight / 2);
          context.lineTo(midPosi, cvHeight - this.lineWidth);
          context.lineTo(midPosi, cvHeight / 4 * 3);
          context.lineTo(startPosi, cvHeight / 4 * 3);
        }
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
        this.paintArrow();
      });
      // window.onresize = () => {
      //   this.paintArrow();
      // };
    }
  },
  mounted() {
    this.paintArrow();
    this.listenerResize();
  }
};
</script>
