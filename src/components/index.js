import div from './bd-div/index.js';
import kpiBlock from './bd-kpiBlock-pc/index.js';
import title from './bd-title-pc/index.js';
import textarea from './bd-textarea-pc/index.js';
import modifyUser from './bd-modifyUser-pc/index.js';
import newModifyUser from './bd-newModifyUser-pc/index.js';
import editPwd from './bd-editPwd-pc/index.js';
import newEditPwd from './bd-newEditPwd-pc/index.js';
import SlideCode from './bd-slide-code/index.js';
import FilterMenu from './bd-filterMenu-pc/index.js';
import TextNote from './bd-textNote-pc/index.js';
import IndicatorTrend from './bd-indicatorTrend-pc/index.js';
import richText from './bd-richText-pc/index.js';
import IndicatorCard from './bd-indicatorCard-pc/index';
import ShapeArrow from './bd-shape-pc/index-arrow';
import ShapeDiamond from './bd-shape-pc/index-diamond';
import ShapeTriangle from './bd-shape-pc/index-triangle';
import ShapeCircle from './bd-shape-pc/index-circle';
import ShapeRectangle from './bd-shape-pc/index-rectangle';
import BdNumberInput from './bd-numberInput/index.js';
import BdTextInput from './bd-textInput/index.js';
import BdSelect from './bd-select/index.js';
import BdDatePicker from './bd-datePicker/index.js';
import BdWorkFlow from './bd-workFlow/index.js';

const components = [div, kpiBlock, title, textarea, modifyUser, newModifyUser, editPwd,
  newEditPwd, SlideCode, FilterMenu, TextNote, IndicatorTrend, richText, IndicatorCard,
  ShapeArrow, ShapeDiamond, ShapeTriangle, ShapeCircle, ShapeRectangle, BdNumberInput,
  BdTextInput, BdSelect, BdDatePicker, BdWorkFlow];

const install = function (Vue) {
  // 判断是否可以安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装,全局引用
  install
};

// 按需加载
export { div, kpiBlock, title, textarea, modifyUser, newModifyUser, editPwd, newEditPwd, SlideCode, FilterMenu, TextNote, IndicatorTrend, richText, IndicatorCard };

