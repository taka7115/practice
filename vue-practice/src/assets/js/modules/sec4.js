export default class Sec4 {
  constructor() {
    /**
     * section4---------------------------------------------
     */

    new Vue({
      el: '#sec4',
      data: {
        newList: '',
        textShow: true
      },

      methods: {
        clearEvent: function () {
          this.newList = '';
        }
      },
      filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        },
        quotation: function (value) {
          if (!value) return ''
          return "“" + value + "”"
        }

      }
    })

  }
};
