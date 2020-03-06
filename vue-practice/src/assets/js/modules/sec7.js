export default class Sec7 {
  constructor() {
    /**
     * section1---------------------------------------------
     */

    Vue.component('explanation', {
      /**
       * component内のdataは関数のみ
       * なのでreturnする必要あり
       */
      data: function () {
        return {
          wrapStyle: {
            display: 'inline-block',
            marginLeft: '240px',
            marginBottom: '20px'
          },
          compoStyle: {
            display: 'flex',
            justifyContent: 'flex-start'
          },
          numStyle: {
            marginRight: '20px'
          },
          productStyle: {
            marginRight: '20px'
          },
          priceStyle: {
            marginRight: '20px'
          },
          textStyle: {
            border: '1px solid grey',
            padding: '0 10px',
            cursor: 'pointer'
          },
        }
      },
      props: ['num', 'product', 'price', 'text'],
      template: '<div :style="wrapStyle"><div :style="compoStyle"><p class="compoNum" :style="numStyle">{{num}}</p><p class = "compoProduct":style = "productStyle">{{product}}</p><p class = "compoPrice":style = "priceStyle">{{price}}</p><p class = "compoText":style="textStyle"">{{text}}</p></div></div>'
    });


    new Vue({
      el: '#sec7'
    })

    this.init();
  }


  init() {
    var maxWidth = 0;
    $("body").find(".compoProduct").each(function () {
      if ($(this).width() > maxWidth) {
        maxWidth = $(this).width()
      };
    });
    console.log(maxWidth);
    $(".compoProduct").css("width", maxWidth + 1 + "px");
  }


};
