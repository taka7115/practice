
<template>
  <section class="code">
    <div class="lang">
      <div class="lang__tab" :class="{'js-current':isActive1}" v-on:click="slideActivate1()">
        <img src="/assets/img/coding/page/html.svg" alt="html" />
      </div>
      <div class="lang__tab" :class="{'js-current':isActive2}" v-on:click="slideActivate2()">
        <img src="/assets/img/coding/page/css.svg" alt="css" />
      </div>
      <div class="lang__tab" :class="{'js-current':isActive3}" v-on:click="slideActivate3()">
        <img src="/assets/img/coding/page/js.svg" alt="javascript" />
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 58" class="arrow arrow--right u-sp">
        <g transform="translate(-1579 -1549)">
          <path
            d="M31.974,20.5,24.724,8H2.974l29,50,29-50H39.224Z"
            transform="translate(1621 1609.974) rotate(-90)"
            fill="#41b883"
          />
          <path
            d="M36.147,8,28.889,20.4,21.631,8H11.146L28.889,38.306,46.632,8Z"
            transform="translate(1621 1606.889) rotate(-90)"
            fill="#36495e"
          />
          <rect width="100" height="58" transform="translate(1579 1549)" fill="none" />
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 58" class="arrow arrow--left u-sp">
        <g transform="translate(1679 1607) rotate(180)">
          <path
            d="M31.974,20.5,24.724,8H2.974l29,50,29-50H39.224Z"
            transform="translate(1621 1609.974) rotate(-90)"
            fill="#41b883"
          />
          <path
            d="M36.147,8,28.889,20.4,21.631,8H11.146L28.889,38.306,46.632,8Z"
            transform="translate(1621 1606.889) rotate(-90)"
            fill="#36495e"
          />
          <rect width="100" height="58" transform="translate(1579 1549)" fill="none" />
        </g>
      </svg>
    </div>
    <div class="slide">
      <div class="slide__cont" v-show="slide1">
        <pre class="line-numbers">
      <code class="language-markup" data-language="html">
        <slot name="html"></slot>
      </code> </pre>
      </div>
      <div class="slide__cont" v-show="slide2">
        <pre class="line-numbers">
      <code class="language-css" data-language="css">
        <slot name="css"></slot>
      </code> </pre>
      </div>
      <div class="slide__cont" v-show="slide3">
        <pre class="line-numbers">
      <code class="language-javascript" data-language="javascript">
        <slot name="javascript"></slot>
      </code> </pre>
      </div>
    </div>
  </section>
</template>



<script>
import work1 from "../../../data/work1.js";
export default {
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      arrays: {
        work1
      },
      slide1: true,
      slide2: false,
      slide3: false,
      isActive1: true,
      isActive2: false,
      isActive3: false
    };
  },
  new_array_tags() {
    //nameがマッチする配列を取得
    const array_a = this.arrays[this.name].map(value => {
      return value;
    });

    return array_a;
  },
  methods: {
    slideActivate1: function() {
      this.slide1 = true;
      this.slide2 = false;
      this.slide3 = false;
      this.isActive1 = true;
      this.isActive2 = false;
      this.isActive3 = false;
    },
    slideActivate2: function() {
      this.slide1 = false;
      this.slide2 = true;
      this.slide3 = false;
      this.isActive1 = false;
      this.isActive2 = true;
      this.isActive3 = false;
    },
    slideActivate3: function() {
      this.slide1 = false;
      this.slide2 = false;
      this.slide3 = true;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = true;
    }
  }
};
</script>

