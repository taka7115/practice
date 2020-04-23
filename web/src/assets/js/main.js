/*import*/
import $ from 'jquery';
import Common from './modules/common';
import Coding from './modules/coding';
// import Sample from './modules/Sample';

/*create instance*/
const common = new Common();
const coding = new Coding();
// const sample = new Sample({
//     name: 'world'
// });

/*load event*/
document.addEventListener('DOMContentLoaded', () => {
  common.init();
  coding.init();
})


// class Name {
//   constructor() {
//     this.init();
//   }
//   init() {

//   }
// };

// $(window).on('load', () => {
//   new Name();
// })
