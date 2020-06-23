export default class Sec8 {
  constructor() {
    /**
     * section1---------------------------------------------
     */
    var input = new Vue({
      el: '#sec8Input',
      data: {

      },
      methods: {
        readRefs: function () {
          var inputTxt = this.$refs.input.value;
          /**
           * After pushing the button, check console in dev tool.
           * You can trace what is included in the element and check how to call its value.
           */
          console.log(inputTxt);
          result.txt = "" + inputTxt;
        }
      }
    })
    var result = new Vue({
      el: '#sec8Result',
      data: {
        txt: "　　　　"
      }
    })
  }
};
