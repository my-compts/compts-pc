<template>
  <div
    :style="paintStyle()"
  />
</template>

<script>
export default {
  name: 'BdShapeRectanglePc',
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
    paintStyle() {
      return {
        width: '100%',
        height: '100%',
        'border-width': this.lineWidth + 'px',
        'border-style': this.lineStyle,
        'border-color': this.strokeStyle,
        'background-color': this.fillStyle
      };
    }
  },
  mounted() {
  }
};
</script>
