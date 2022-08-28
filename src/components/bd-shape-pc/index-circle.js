import shapeCircle from './bd-shapeCircle-pc';

shapeCircle.install = function (Vue) {
  Vue.component(shapeCircle.name, shapeCircle);
};

export default shapeCircle;
