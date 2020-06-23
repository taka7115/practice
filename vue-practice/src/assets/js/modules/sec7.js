export default class Sec7 {
  constructor() {
    this.components();
  }

  components() {
    Vue.component("ttl", {
      template: `
      <h2 class="sec7Ttl">{{name}}</h2>
    `,
      data: function () {
        return {
          name: "Components(inline)"
        }
      }
    });


    Vue.component("btn01", {
      template: `
      <div class="sec7Btn"> {{name}} </div>
    `,
      data: function () {
        return {
          name: "ボタン01"
        }
      }
    });


    Vue.component("btn02", {
      template: `
      <div class="sec7Btn""> {{name}} </div>
    `,
      data: function () {
        return {
          name: "ボタン02"
        }
      }
    });


    Vue.component("cont", {
      template: `
      <div class="sec7Cont" v-if="show"><p>{{text}}</p></div>
    `,
      data: function () {
        return {
          show: true,
          text: "コンテンツ"
        }
      }
    });



    new Vue({
      el: '#sec7'
    });



  }


};
