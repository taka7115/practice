import Vue from 'vue';
import Top from './vue/components/Top.vue';
import Height from './top/height.js';
const height = new Height();
import Scroll from './top/scroll.js';
const scroll = new Scroll();
import Path from './top/path.js';
const path = new Path();
import Canvas from './top/canvas.js';
const canvas = new Canvas();

new Vue({
  el: '#c-top',
  components: {
    'top': Top
  }

})


export default class C_top {
  constructor() {

  }

  init() {

    /* if html loaded */
    document.addEventListener('DOMContentLoaded', () => {
      height.init();
      scroll.init();
    });

    /* if all loaded */
    window.addEventListener('load', () => {
      path.init();
      canvas.init();
    });


  }




};


/**
 * import c-top----------------------------------------
 */



const c_top = new C_top();
c_top.init();
