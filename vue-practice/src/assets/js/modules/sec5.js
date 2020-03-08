export default class Sec5 {
  constructor() {
    /**
     * section5---------------------------------------------
     */

    new Vue({
      el: '#sec5',
      data: {
        message: 'message',
        messageShow: false
      },
      methods: {
        messageChange: function () {
          this.messageShow === true ? this.messageShow = false : this.messageShow = true

          /**
           * this.messageShow = !this.messageShowの方が簡単か？
           */

        }
      },
      computed: {
        // 算出 getter 関数
        reversedMessage: function () {
          // `this` は vm インスタンスを指します
          return this.message.split('').reverse().join('');
        }
      }
    })
  }
};
