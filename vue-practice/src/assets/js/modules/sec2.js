export default class Sec2 {
  constructor() {
    /**
     * section2---------------------------------------------
     */

    new Vue({
      el: '#sec2',
      data: {
        text1: '1が押されました',
        text2: '2が押されました',
        text3: '3が押されました',
        status1: false,
        status2: false,
        status3: false,
      },
      methods: {
        active1: function () {
          this.status2 = false;
          this.status3 = false;
          this.status1 = true;
        },
        active2: function () {
          this.status1 = false;
          this.status3 = false;
          this.status2 = true;
        },
        active3: function () {
          this.status1 = false;
          this.status2 = false;
          this.status3 = true;
        }
      }
    })
  }
};
