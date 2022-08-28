/*
 * @Author: your name
 * @Date: 2021-08-18 18:53:44
 * @LastEditTime: 2021-08-18 18:54:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bd-compts-pc/src/components/bd-datePicker/index.js
 */
import BdDatePicker from './bd-datePicker';

BdDatePicker.install = function(Vue) {
  Vue.component(BdDatePicker.name, BdDatePicker);
};

export default BdDatePicker;
