import shapeTriangle from './bd-shapeTriangle-pc';

shapeTriangle.install = function (Vue) {
  Vue.component(shapeTriangle.name, shapeTriangle);
};

export default shapeTriangle;
