/*import*/
import $ from 'jquery';
import Common from './modules/common';
// import Sample from './modules/Sample';

/*create instance*/
const common = new Common();
// const sample = new Sample({
//     name: 'world'
// });

/*load event*/
document.addEventListener('DOMContentLoaded', () => {
  common.init();
})


// flash-----------------------------------------
new Vue({
  el: '#app',
  data: {
    questionText: 'これが質問です',
    answerText: 'これが答えです',
    questionCont: true,
    answerCont: false
  },
  methods: {
    answerOpen: function () {
      this.answerCont = !this.answerCont;
      this.questionCont = !this.questionCont;
    },
    answerClose: function () {
      this.answerCont = false;
    }
  }
})
// ----------------------------------------flash-
