export default class Sec3 {
  constructor() {
    /**
     * section3---------------------------------------------
     */

    new Vue({
      el: '#sec3',
      data: {
        lists: Array.of(), //Array.of(1,2,3)=[1,2,3]
        newList: ''
      },

      methods: {
        submitAction: function () {
          return this.lists.push({
              name: '・' + this.newList
            }),
            this.newList = ''
        }
      }
    })
  }
};
